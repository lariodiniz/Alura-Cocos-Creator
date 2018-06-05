
cc.Class({
    extends: cc.Component,

    properties: {
        _audio: cc.AudioSource,
        evento: cc.String
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getScene().on(this.evento, this.tocarAudio, this);
        this._audio = this.getComponent(cc.AudioSource);
    },

    tocarAudio () {
        this._audio.play();
    },

    // update (dt) {},
});
