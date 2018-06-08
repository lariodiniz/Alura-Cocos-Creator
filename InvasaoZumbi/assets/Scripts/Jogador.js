let Teclado = require("Teclado");

cc.Class({
    extends: cc.Component,

    properties: {
        tiro: cc.Prefab,                
        vidaMaxima: cc.Float,  

        _direcao: cc.Vec2,
        _movimentacao: cc.Component,
        _controleAnimacao: cc.Component,
        _canvas: cc.Canvas,
        _camera: cc.Node,
        _vidaAtual: cc.Float,        
        _teclado: {
            type: cc.Float,
            default:[]
        },
        _posicaoArma: cc.Node    
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._movimentacao = this.getComponent("Movimentacao");
        this._controleAnimacao = this.getComponent("ControleDeAnimacao");
        this._canvas = cc.find("Canvas");
        this._canvas.on("mousedown", this.atirar, this);
        this._canvas.on("mousemove", this.mudarDirecaoDaAnimacao, this);

        this._camera = cc.find("Camera");
        
        this.node.on("SofreDano", this.sofrerDano, this);
        this._vidaAtual = this.vidaMaxima;
        this._posicaoArma = this.node.children[0];
    },   

    sofrerDano (evento) {
        this._vidaAtual -= evento.detail.dano;
        let eventoPerdeVida = new cc.Event.EventCustom("JogadoraPerdeuVida", true);
        eventoPerdeVida.setUserData({
            vidaAtual : this._vidaAtual,
            vidaMaxima : this.vidaMaxima
        });

        this.node.dispatchEvent(eventoPerdeVida);
        
        if (this._vidaAtual <= 0){
            let jogoAcabou = new cc.Event.EventCustom("JogoAcabou", true);
            this.node.dispatchEvent(jogoAcabou);
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
        disparo.getComponent("Tiro").inicializa(
            this.node.parent,
            this._posicaoArma.position.add(this.node.position),
            direcao
        );
    },

    update (deltaTime) {     
        this._direcao = cc.Vec2.ZERO;           
        if (Teclado.estaPressionada(cc.KEY.a)){
            console.log('a');
            this._direcao.x -= 1;  
        }
        if (Teclado.estaPressionada(cc.KEY.d)){
            this._direcao.x += 1;  
        }
        if (Teclado.estaPressionada(cc.KEY.s)){
            this._direcao.y -= 1;  
        }
        if (Teclado.estaPressionada(cc.KEY.w)){
            this._direcao.y += 1;  
        }

        this._movimentacao.setDirecao(this._direcao);        
        this._movimentacao.andarParaFrente();  
                
    },



});
