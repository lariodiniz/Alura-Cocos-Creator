cc.Class({
    extends: cc.Component,

    properties: {
        alvo: cc.Node,
        distanciaDeAtaque : cc.Float,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        

    },

    update (deltaTime) {
        let direcao = this.alvo.position.sub(this.node.position);

        let distancia = direcao.mag();

        this._movimentacao.setDirecao(direcao);
        this._controleAnimacao.mudaAnimacao(direcao, "Andar");

        if (distancia < this.distanciaDeAtaque){
            this.alvo.getComponent("Jogador").vivo = false;
        }

    },
});
