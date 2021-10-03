class Player {
    constructor() {
        this.index = null;
        this.yPos = 0;
        this.name = null;
        this.bulletsRemaining = 100;
        this.lives= 3;
        this.bulletX=-1000;
        this.bulletY=-1000; // number to show that the bullet is on rest
        //write update function like line number 24 for updating yPos, bullet remaining, lives remaining,bullet pos

        }

    getCount() {
        var playerCountRef= database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            yPos: this.yPos,
            bulletX:this.bulletX,
            bulletY:this.bulletY
        });
        
    }
    updateBulletPosition() { 
       var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).update({ 
            bulletX:this.bulletX,
            bulletY:this.bulletY });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    
}
