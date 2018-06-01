cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

    onCollisionEnter (outro){
        if (outro.node.group == "inimigo"){
            outro.node.destroy();
        }
        
        this.node.destroy()
    },

    start () {

    },

    // update (dt) {},
});
