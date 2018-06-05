cc.Class({
    extends: cc.Component,

    properties: {
        _alvo: cc.Node,        
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        
        distanciaDeAtaque : cc.Float
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._alvo = cc.find("Personagens/Personagem");
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this.node.on("SofrerDano", this.morrer, this);
        

    },

    morrer () {
        let eventoMorte = new cc.Event.EventCustom("ZumbiMorreu", true);
        this.node.dispatchEvent(eventoMorte);
        
        this.node.destroy();
    },    

    update (deltaTime) {
        let direcao = this._alvo.position.sub(this.node.position);

        let distancia = direcao.mag();

        this._movimentacao.setDirecao(direcao);
        this._movimentacao.andarParaFrente();   
        this._controleAnimacao.mudaAnimacao(direcao, "Andar");

        if (distancia < this.distanciaDeAtaque){
            this._alvo.emit("SofreDano");
        }

    },
});
