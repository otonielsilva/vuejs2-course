new Vue({
    el: "#app",
    data: {
        scorePlayer: 100,
        scoreMonster: 100,
        log: []
    }, 
    computed : {
        winner () {
            if (this.scorePlayer <= 0) {
                return "The Monster"
            } else if (this.scoreMonster <= 0) {
                return "The Player"
            } else {
                return ""
            }
        },
        finished () {
            return this.scoreMonster <= 0 || this.scorePlayer <= 0; 
        }
    },
    watch : {
        scorePlayer (newValue, oldValue) {
            if (newValue == 100) return ;
            
            let diffValue = newValue - oldValue
            if (diffValue > 0) {
                this.log.unshift({"player": "won", message: "Player recovered " + Math.abs(diffValue) } )
            } else {
                this.log.unshift({"player": "lost", message: "Player was demaged by " + Math.abs(diffValue) } )
            }                      
        },
        scoreMonster (newValue, oldValue) {
            if (newValue == 100) return ;

            let diffValue = newValue - oldValue
            if (diffValue > 0) {
                this.log.unshift({"player": "lost", message: "Monster recovered " + Math.abs(diffValue) } )
            } else {
                this.log.unshift({"player": "won", message: "Monster was demaged by " + Math.abs(diffValue) } )
            }                      
        }

    },
    methods : {
        restart () {
            this.scorePlayer = 100
            this.scoreMonster = 100
            this.log = []   
        },

        attack () {
            playerAttackForce = this.getRandomInt(1, 8) * -1;
            monsterAttackForce = this.getRandomInt(1, 10) * -1;

            this.scoreMonster = this.receiveScore(this.scoreMonster, playerAttackForce)
            this.scorePlayer = this.receiveScore(this.scorePlayer,  monsterAttackForce)       
        },
        specialAttack () {
            playerAttackForce = this.getRandomInt(1, 14) * -1;
            monsterAttackForce = this.getRandomInt(1, 10) * -1;

            this.scoreMonster = this.receiveScore(this.scoreMonster, playerAttackForce)
            this.scorePlayer = this.receiveScore(this.scorePlayer,  monsterAttackForce)
        },
        cure () {
            playerAttackForce = this.getRandomInt(1, 8) 
            monsterAttackForce = this.getRandomInt(1, 10) * -1;

            this.scorePlayer = this.receiveScore(this.scorePlayer, playerAttackForce)
            this.scorePlayer = this.receiveScore(this.scorePlayer, monsterAttackForce)        
        },
        receiveScore (currentScore, scoreToAdd) {
            if ((currentScore + scoreToAdd) > 100) {
                return 100;
            } else if ((currentScore + scoreToAdd) < 0) {
                return 0
            } else {
                return currentScore + scoreToAdd
            }
        },
        getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }


    }

})