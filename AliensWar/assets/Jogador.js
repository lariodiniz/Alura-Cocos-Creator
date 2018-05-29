let Personagem = require("Personagem");

cc.Class({
    extends: Personagem,

    properties: {
        _acelerando: false,        
        velocidade: 10,
        vidaMaxima: 100,
        _vidaAtual: 0,
        barraVida: cc.ProgressBar,
        pontuacao: 0,
        label : cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        this._vidaAtual = this.vidaMaxima;

        cc.director.getCollisionManager().enabled = true;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        let canvas = cc.find("Canvas");
        canvas.on(
            "mousemove",
            this.mudarDirecao,
            this
        );

        canvas.on(
            "mousedown",
            this.atirar,
            this
        );

        this.barraVida.progress = 1;
    },

    adicionaPonto (pontos){
        this.pontuacao += pontos;
        this.label.string = "Pontos: "+this.pontuacao;
    },

    /*destroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },*/

    mudarDirecao (event) {
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        this._direcao = this.calcularDirecao(posicaoMouse);        
        this.node.rotation = this.olharPara(this._direcao);
    },

    tomarDano(dano){

        this._vidaAtual -= dano;
        let porcentamVida = this._vidaAtual / this.vidaMaxima;

        this.barraVida.progress = porcentamVida;

        if (this._vidaAtual < 0){
            cc.director.loadScene("GameOver")
        }

    },

    onKeyDown (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
                this._acelerando = true;
                break;
        }
    },

    onKeyUp (event) {
        switch(event.keyCode) {
            case cc.KEY.a:
            this._acelerando = false;
                break;
        }
    },

    start () {

    },

    update (dt) {
        if (this._acelerando){

            let deslocamento = this._direcao.mul(this.velocidade * dt);
            this.node.position = this.node.position.add(deslocamento);
        }        

    },
});
