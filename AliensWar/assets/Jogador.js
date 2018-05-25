// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        _acelerando: false,
        _direcao: cc.Vec2,
        tiroPrefab: cc.Prefab,
        velocidade: 10
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

    atirar: function (event) {
        let tiro = cc.instantiate(this.tiroPrefab);
        tiro.parent = this.node.parent;
        tiro.position = this.node.position;

        let componenteTiro = tiro.getComponent("tiro");
        componenteTiro.direcao = this._direcao;
    },

    mudarDirecao: function (event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        let direcao = posicaoMouse.sub(this.node.position);
        
        direcao = direcao.normalize();

        this._direcao = direcao;
    },

    onKeyDown: function (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
                this._acelerando = true;
                break;
        }
    },

    onKeyUp: function (event) {
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
