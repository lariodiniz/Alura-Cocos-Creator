let Personagem = cc.Class({
    extends: cc.Component,

    properties: {
        _direcao: cc.Vec2,
        tiroPrefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    atirar (event) {
        let disparo = cc.instantiate(this.tiroPrefab);
        
        disparo.parent = this.node.parent;
        disparo.position = this.node.position;        
        disparo.group = this.node.group;       

        let componenteTiro = disparo.getComponent("tiro");                
        componenteTiro.direcao = this._direcao;
    },

    tomarDano(){

    },

    start () {

    },

    // update (dt) {},
});

module.exports = Personagem;