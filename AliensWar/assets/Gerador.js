cc.Class({
    extends: cc.Component,

    properties: {
        inimigoPrefab: cc.Prefab,
        area: 10,
        tempo: 2,
        espera: 3
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scheduleOnce(this.iniciarGeracao, this.espera);
    },
    
    iniciarGeracao () {
        this.schedule(this.gerar, this.tempo);
    },

    start () {

    },

    gerar (){
        let inimigo = cc.instantiate(this.inimigoPrefab);
        inimigo.parent = this.node.parent;
        let posicao = new cc.Vec2(Math.random() - .5, Math.random() - .5);
        posicao = posicao.normalize();
        posicao = posicao.mul(this.area);
        posicao = this.node.position.add(posicao);
        inimigo.position = posicao;

    }

    // update (dt) {},
});
