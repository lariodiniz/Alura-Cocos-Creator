cc.Class({
    extends: cc.Component,

    properties: {
        _movimentacao: cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        this._movimentacao = this.getComponent("Movimentacao");
    },

    onCollisionStay (outro){     
        if (outro.node.group == "cenario"){
            this._movimentacao.andarParaTras()
        }        
    },

    start () {

    },

    // update (dt) {},
});
