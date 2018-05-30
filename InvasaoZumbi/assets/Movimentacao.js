cc.Class({
    extends: cc.Component,

    properties: {
        _direcao: cc.Vec2,
        velocidade: cc.Float
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (deltaTime) {        
        let descolamento = this._direcao.mul(deltaTime * this.velocidade);
        this.node.position = this.node.position.add(descolamento);
    },

    setDirecao (direcao){
        this._direcao = direcao.normalize();
    }
});
