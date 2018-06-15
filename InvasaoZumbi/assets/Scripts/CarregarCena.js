cc.Class({
    extends: cc.Component,

    carregarCenaComAnimacao : function(nomeDaCena){
        cc.director.loadScene(nomeDaCena);
    }
});
