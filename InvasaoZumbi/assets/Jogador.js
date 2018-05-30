cc.Class({
    extends: cc.Component,

    properties: {
        _direcao: cc.Vec2,
        _movimentacao: cc.Component        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._movimentacao = this.getComponent("Movimentacao");
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);
    },   

    start () {

    },

    update (deltaTime) {
        
        this._movimentacao.setDirecao(this._direcao);
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
