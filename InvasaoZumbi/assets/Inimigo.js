cc.Class({
    extends: cc.Component,

    properties: {
        alvo: cc.Node,
        _movimentacao: cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._movimentacao = this.getComponent("Movimentacao");

    },

    update (deltaTime) {
        let direcao = this.alvo.position.sub(this.node.position);
        this._movimentacao.setDirecao(direcao);

    },
});
