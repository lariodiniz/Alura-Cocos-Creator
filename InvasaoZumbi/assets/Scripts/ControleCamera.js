cc.Class({
    extends: cc.Component,

    properties: {
        alvo: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    update (dt) {
        this.node.position = this.alvo.position;
    },
});
