let Personagem = require("Personagem");

cc.Class({
    extends: Personagem,

    properties: {
        _alvo: cc.Node,        
        velocidade : 50,        
        tempoAtaque: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._alvo = cc.find("hero");
        this.schedule(this.atirar, this.tempoAtaque);

    },

    tomarDano(){
        let jogador = this._alvo.getComponent("Jogador");
        jogador.adicionaPonto(10);
        this.node.destroy();
    },

    mudarDirecao () {             
        this._direcao = this.calcularDirecao(this._alvo.position);        
        this.node.rotation = this.olharPara(this._direcao);
    },

    start () {

    },

    update (dt) {
        this.mudarDirecao();
        let deslocamento = this._direcao.mul(this.velocidade * dt);
        this.node.position = this.node.position.add(deslocamento);
    },
});
