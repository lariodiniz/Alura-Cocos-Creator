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
        this.node.destroy();
    },

    mudarDirecao () {
        let direcao = this._alvo.position.sub(this.node.position);
        direcao = direcao.normalize();
        this._direcao = direcao;
    },

    start () {

    },

    update (dt) {
        this.mudarDirecao();
        let deslocamento = this._direcao.mul(this.velocidade * dt);
        this.node.position = this.node.position.add(deslocamento);
    },
});
