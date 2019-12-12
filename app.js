new Vue({
    el:"#app",
    data:{
        playerHealth:100,
        monsterHealth:100,
        isGameRunning:false,
        turns:[]
    },
    methods:{
        start:function(){
            this.isGameRunning=true
            this.monsterHealth=100
            this.playerHealth=100
            this.turns=[]
        },
        attack:function(){
            var max=10
            var min=3
            var damage=this.calculateDamage(3,10)
            this.monsterHealth-=damage
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits monster for '+damage
            })
            if(this.checkwinner())
            {
                return
            }
            this.monsterattacks()
            
        },
        specialattack:function(){
            var damage=this.calculateDamage(10,20)
            this.monsterHealth-=damage
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits monster hard for '+damage
            })
            if(this.checkwinner())
            {
                return
            }
            this.monsterattacks()
        },
        heal:function(){
            if(this.playerHealth<=90)
            {
                this.playerHealth+=10
            }
            else
            {
                this.playerHealth=100
            }
            this.turns.unshift({
                isPlayer:true,
                text:'Player heals for 10'
            })
            this.monsterattacks()
        },
        giveup:function(){
            this.isGameRunning=false
        },
        calculateDamage:function(min,max)
        {
            return Math.max(Math.floor(Math.random()*max),min)
        },
        checkwinner:function(){
            if (this.monsterHealth<=0)
            {   
                if (confirm("You won new game?"))
                {
                    this.start()
                }
                else
                {
                    this.isGameRunning=false
                }
               
                return true;
            }
            else if (this.playerHealth<=0)
            {   
                if (confirm("You lost new game?"))
                {
                    this.start()
                }
                else
                {
                    this.isGameRunning=false
                }
               
                return true;
            }
            return false
        },
        monsterattacks:function(){
            var damage=this.calculateDamage(5,12)
            this.playerHealth-=damage
            this.turns.unshift({
                isPlayer:false,
                text:'Moster hits player for '+damage
            })
            this.checkwinner()
        }
    }
})