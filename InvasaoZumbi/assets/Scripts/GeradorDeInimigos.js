cc.Class({
    extends: cc.Component,

    properties: {
        tempoParaGerar: cc.Float,
        inimigoPrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {
        this.schedule(this.gerar, this.tempoParaGerar);
    },

    // update (dt) {},

    gerar(){
        let zumbi = cc.instantiate(this.inimigoPrefab);
        zumbi.parent = this.node.parent;
        zumbi.position = this.node.position;

    }
});
