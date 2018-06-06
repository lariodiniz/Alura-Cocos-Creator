let Teclado = cc.Class({
    extends: cc.Component,

    statics: {
        _teclas : [],
        estaPressionada : function(tecla){
            return Teclado._teclas.indexOf(tecla) != -1; 
        } 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.teclaPressionada, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.teclaSolta, this);
        

    },

    start () {

    },

    // update (dt) {},


    teclaPressionada(event){        
        if(Teclado._teclas.indexOf(event.keyCode) == -1){
            Teclado._teclas.push(event.keyCode)
        }
    },

    teclaSolta(event){                
        let index = Teclado._teclas.indexOf(event.keyCode);
        Teclado._teclas.splice(index);        
    }
});

module.exports = Teclado;
