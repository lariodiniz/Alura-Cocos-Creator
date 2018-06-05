cc.Class({
    extends: cc.Component,

    properties: {
        _direcao: cc.Vec2,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _canvas: cc.Canvas,
        _camera: cc.Node,
        _vidaAtual: cc.Float,
        _audioTiro: cc.AudioSource,
        tiro: cc.Prefab,        
        vivo: true,
        vidaMaxima: cc.Float      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._audioTiro = this.getComponent(cc.AudioSource);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);
        
        this._canvas = cc.find("Canvas");
        this._canvas.on("mousedown", this.atirar, this);
        this._canvas.on("mousemove", this.mudarDirecaoDaAnimacao, this);

        this._camera = cc.find("Camera");
        this.vivo = true;

        this.node.on("SofreDano", this.sofrerDano, this);
        this._vidaAtual = this.vidaMaxima;
    },   

    sofrerDano () {
        this._vidaAtual -= 1;
        let eventoPerdeVida = new cc.Event.EventCustom("JogadoraPerdeuVida", true);
        eventoPerdeVida.setUserData({
            vidaAtual : this._vidaAtual,
            vidaMaxima : this.vidaMaxima
        });

        this.node.dispatchEvent(eventoPerdeVida);
        
        if (this._vidaAtual <= 0){
            this.vivo = false;
        }
    },

    mudarDirecaoDaAnimacao(event){
        let direcao = this.calcularDirecaoMause(event);

        let estado = "Andar";
        if (this._direcao.mag() == 0){
            estado = "Parado";
        }

        this._controleAnimacao.mudaAnimacao(direcao, estado);
    },

    calcularDirecaoMause(event){
        let posicaoMouse = event.getLocation();
        posicaoMouse = new cc.Vec2(posicaoMouse.x, posicaoMouse.y);
        posicaoMouse =  this._canvas.convertToNodeSpaceAR(posicaoMouse);

        let posicaoJogador = this._camera.convertToNodeSpaceAR(this.node.position);

        let direcao = posicaoMouse.sub(posicaoJogador);
        return direcao;
    },

    atirar (event) {

        let direcao = this.calcularDirecaoMause(event);

        let disparo = cc.instantiate(this.tiro);
        disparo.parent = this.node.parent;
        disparo.position = this.node.position;
        disparo.getComponent("Movimentacao").setDirecao(direcao);

        this._audioTiro.play();
        
    },

    update (deltaTime) {        
        this._movimentacao.setDirecao(this._direcao);        
        this._movimentacao.andarParaFrente();   
    },

    teclaPressionada(event){        
        if (event.keyCode == cc.KEY.a){
            this._direcao.x = -1;
        }        
        if (event.keyCode == cc.KEY.d){
            this._direcao.x = 1;
        }
        if (event.keyCode == cc.KEY.s){
            this._direcao.y = -1;
        }        
        if (event.keyCode == cc.KEY.w){
            this._direcao.y = 1;
        }

    },

    teclaSolta(event){        
        if (event.keyCode == cc.KEY.a){
            this._direcao.x = 0;
        }        
        if (event.keyCode == cc.KEY.d){
            this._direcao.x = 0;
        }
        if (event.keyCode == cc.KEY.s){
            this._direcao.y = 0;
        }        
        if (event.keyCode == cc.KEY.w){
            this._direcao.y = 0;
        }

    }

});
