cc.Class({
    extends: cc.Component,

    properties: {
        dano: cc.Float,
        _movimentacao : cc.Component,
        _audioTiro: cc.AudioSource
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;     
        this._audioTiro = this.getComponent(cc.AudioSource);   
        this._movimentacao = this.getComponent("Movimentacao");
    },

    onCollisionEnter (outro){
        outro.node.emit("SofrerDano",{dano: this.dano});
        this.node.destroy()
    },

    inicializa (pai, posicao, direcao) {
        this.node.parent = pai;
        this.node.position = posicao;
        this.getComponent("Movimentacao").setDirecao(direcao);
        this.getComponent(cc.AudioSource).play();
    },

    update (dt) {
        this._movimentacao.andarParaFrente();   
    },
});
