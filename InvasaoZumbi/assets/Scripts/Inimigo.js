cc.Class({
    extends: cc.Component,

    properties: {
        _alvo: cc.Node,        
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _cronometroAtaque: cc.Float,
        _tempoRestanteParaVagar: cc.Float,
        _vidaAtual: cc.Float,
        _direcaoVagar: cc.Vec2,
        
        vidaMaxima: cc.Float,
        tempoAtaque: cc.Float,        
        dano: cc.Float,
        distanciaPerseguir: cc.Float,
        distanciaDeAtaque : cc.Float,
        tempoVagar: cc.Float,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._alvo = cc.find("Personagens/Personagem");
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this.node.on("SofrerDano", this.sofrerDano, this);
        this.resetCronometroDeAtaque();
        this.resetCronometroDeVagar();
        this._direcaoVagar = cc.Vec2.UP;
        this._vidaAtual = this.vidaMaxima;
    },

    update (deltaTime) {
        let direcaoAlvo = this._alvo.position.sub(this.node.position);
        let distancia = direcaoAlvo.mag();
        this._cronometroAtaque -= deltaTime;       
        this._tempoRestanteParaVagar -= deltaTime;    
        
        if (distancia < this.distanciaDeAtaque && this._cronometroAtaque <= 0){
            this.atacar();
        }else if(distancia < this.distanciaPerseguir){
            this.andar(direcaoAlvo);
        }else {
            this.vagar();
        }
        
    },

    resetCronometroDeAtaque (){
        this._cronometroAtaque = this.tempoAtaque;
    },

    resetCronometroDeVagar (){
        this._tempoRestanteParaVagar = this.tempoVagar;
    },    

    morrer () {
        let eventoMorte = new cc.Event.EventCustom("ZumbiMorreu", true);
        this.node.dispatchEvent(eventoMorte);
        
        this.node.destroy();
    },  

    sofrerDano(evento){
        this._vidaAtual -= evento.detail.dano;
        this.node.emit("atualizaVida", 
            {
                vidaAtual: this._vidaAtual,
                vidaMaxima: this.vidaMaxima
            }
        );

        if (this._vidaAtual <= 0){
            this.morrer();
        }
    },

    atacar(){
        this._alvo.emit("SofreDano", {dano: this.dano});
        this.resetCronometroDeAtaque();
    },

    vagar(){
        if (this._tempoRestanteParaVagar < 0){
            this._direcaoVagar = new cc.Vec2(Math.random()-0.5,Math.random()-0.5);            
            this.resetCronometroDeVagar();
        }
        
        this.andar(this._direcaoVagar);
    },

    andar(direcao){       
        this._movimentacao.setDirecao(direcao);
        this._movimentacao.andarParaFrente();   
        this._controleAnimacao.mudaAnimacao(direcao, "Andar");
    },

});
