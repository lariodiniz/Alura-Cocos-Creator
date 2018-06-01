cc.Class({
    extends: cc.Component,

    properties: {
        _alvo: cc.Node,
        distanciaDeAtaque : cc.Float,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._alvo = cc.find("Personagem");
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        

    },

    update (deltaTime) {
        let direcao = this._alvo.position.sub(this.node.position);

        let distancia = direcao.mag();

        this._movimentacao.setDirecao(direcao);
        this._controleAnimacao.mudaAnimacao(direcao, "Andar");

        if (distancia < this.distanciaDeAtaque){
            this._alvo.getComponent("Jogador").vivo = false;
        }

    },
});
