cc.Class({
    extends: cc.Component,

    properties: {
        _direcao: cc.Vec2,
        velocidade: cc.Float,
        _deltaTime: 0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (deltaTime) {        
        this._deltaTime = deltaTime;
    },

    setDirecao (direcao){
        let di = direcao;
        if (di != cc.Vec2.ZERO){
            di = di.normalize();
        }
        this._direcao = di;
    },

    andarParaFrente(){
        this._andar(1);
    },

    andarParaTras(){
        this._andar(-1);
    },    

    _andar(sentido){
        let descolamento = this._direcao.mul(sentido * this._deltaTime * this.velocidade);
        this.node.position = this.node.position.add(descolamento);
    }
});
