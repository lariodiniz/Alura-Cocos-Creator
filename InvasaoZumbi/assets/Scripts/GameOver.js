cc.Class({
    extends: cc.Component,

    properties: {
        _gameOver: cc.Node,
        _jogador: cc.Component,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.resume();
        this._gameOver = cc.find("Interface/GameOver");
        let jogador = cc.find("Personagens/Personagem");
        this._jogador = jogador.getComponent("Jogador");

        let canvas = cc.find("Canvas");
        canvas.on("mousedown", this.jogarNovamente, this);
    },

    jogarNovamente () {
        if (!this._jogador.vivo){
            cc.director.loadScene("Jogo");
        }
    },

    start () {

    },

    update (dt) {
        if (!this._jogador.vivo){
            cc.director.pause();
            this._gameOver.active = true;
        }
    },
});
