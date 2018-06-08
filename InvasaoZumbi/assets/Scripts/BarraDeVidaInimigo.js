cc.Class({
    extends: cc.Component,

    properties: {
        _barraDeVida : cc.ProgressBar
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._barraDeVida = this.getComponent(cc.ProgressBar);
        this._barraDeVida.progress = 1;
        this.node.parent.on("atualizaVida", this.atualizaIntergace, this);
    },

    start () {

    },

    atualizaIntergace(evento){
        let dados = evento.detail;        
        this._barraDeVida.progress = dados.vidaAtual / dados.vidaMaxima;
    }

    // update (dt) {},
});
