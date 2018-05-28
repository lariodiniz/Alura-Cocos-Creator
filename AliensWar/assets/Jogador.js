let Personagem = require("Personagem");

cc.Class({
    extends: Personagem,

    properties: {
        _acelerando: false,        
        velocidade: 10,
        vida: 100
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        
        cc.director.getCollisionManager().enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        let canvas = cc.find("Canvas");
        canvas.on(
            "mousemove",
            this.mudarDirecao,
            this
        );

        canvas.on(
            "mousedown",
            this.atirar,
            this
        );
    },

    /*destroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },*/

    mudarDirecao (event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        let direcao = posicaoMouse.sub(this.node.position);
        
        direcao = direcao.normalize();

        this._direcao = direcao;
    },

    tomarDano(dano){

        this.vida -= dano;

    },

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
                this._acelerando = true;
                break;
        }
    },

    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
            this._acelerando = false;
                break;
        }
    },

    start () {

    },

    update (dt) {
        if (this._acelerando){

            let deslocamento = this._direcao.mul(this.velocidade * dt);
            this.node.position = this.node.position.add(deslocamento);
        }        

    },
});
