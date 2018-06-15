cc.Class({
    extends: cc.Component,

    properties: {
        _movimentacao :cc.Component,
    },

    // use this for initialization
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        this._movimentacao = this.getComponent("Movimentacao");
    },

    onCollisionStay : function(outro){
        if(outro.node.group == "cenario"){

            this._movimentacao.andarPraTras();
        }
    }


});
