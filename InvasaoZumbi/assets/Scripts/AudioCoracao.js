cc.Class({
    extends: cc.Component,

    properties: {
        _audio: cc.AudioSource,
        vidaMinima: {
            type: cc.Float,
            default: .5,
            range: [0,1],
            slide : true
        },
    },


    onLoad () {
        this._audio = this.getComponent(cc.AudioSource);
        cc.director.getScene().on("JogadoraPerdeuVida", this.tocarAudio, this);
    },

    tocarAudio (evento) {
        let dados = evento.getUserData();
        let vidaRestante = dados.vidaAtual / dados.vidaMaxima;
        console.log(dados.vidaRestante);
        if ((vidaRestante < this.vidaMinima) && (!this._audio.isPlaying))
        {
            this._audio.loop = true;
            this._audio.play();
        }

    },

    // update (dt) {},
});
