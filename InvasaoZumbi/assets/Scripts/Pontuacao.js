cc.Class({
    extends: cc.Component,

    properties: {
        _mortos: 0,
        textoPontuacao : cc.Label,

    },

    onLoad () {
        this._mortos = 0;
        this.textoPontuacao = this.getComponent(cc.Label);
        this.textoPontuacao.string = this._mortos;
        cc.director.getScene().on("ZumbiMorreu", this.somaPontuacao, this);

    },
    
    somaPontuacao () {
        this._mortos++;
        this.textoPontuacao.string = this._mortos;
    },



    // update (dt) {},
});
