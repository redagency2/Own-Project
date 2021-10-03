class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form()
            form.display();
        }
        player1 = createSprite(200,500);
        player1.addImage("player1",player_img);//change image

        player2 = createSprite(800,500);
        player2.addImage("player2", player_img);//change image 
        players=[player1,player2];

        bullet1=createSprite(-1000,-1000,20,20);
        bullet2=createSprite(-1000,-1000,20,20);
        bullets = [bullet1,bullet2];



    }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();
        for(var plr in allPlayers){        
            index = index+1;
            x=initPos[index-1]
            y = allPlayers[plr].yPos;
                      
            players[index -1].x = x;
            players[index - 1].y = y;
            
            bullets[index -1].x = allPlayers[plr].bulletX;
            bullets[index - 1].y = allPlayers[plr].bulletY;
            if (bullets[index-1].y !== -1000 || bullets[index-1].x !==-1000) bullets[index-1].visible = true;
            if(index === player.index){
                textSize(30);
                text(allPlayers[plr].name,x,y+25)        
                if (player.bulletx==-1000 && player.bullety==-1000) {
                     player.bulletx = player.xPos; player.bullety = player.yPos;
                }

                player.updateBulletPosition();
            }
        }
        if (keyIsDown(UP_ARROW) && player.index !== null) {
            player.yPos -= 10
            player.update();
        }
        if (keyIsDown(DOWN_ARROW) && player.index !== null) {
            player.yPos += 10
            player.update();
        }

        if (keyDown(32)&& player.index!==null&& bullets[player.index-1].velocityX===0){
            bullets[player.index-1].x =initPos[player.index-1];
            bullets[player.index-1].y =player.yPos;
            
            bulletsRemaining--;
            if (player.index===1) bullets[player.index-1].velocityX=1;
            if (player.index===2) bullets[player.index-1].velocityX=-1;
            player.updateBulletPosition
            console.log(bullets[player.index-1].x)
        }

        if (frameCount % 20 === 0) {//change fruits to sheild 
            fruits = createSprite(random(100, 1000), 0, 100, 100);
            fruits.velocityY = 6;
            var rand = Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1",fruit2_img);
                break;
                case 3: fruits.addImage("fruit1", fruit3_img);
                break;
                case 4: fruits.addImage("fruit1", fruit4_img);
                break;
                case 5: fruits.addImage("fruit1", fruit5_img);
                break;
            }
            fruitGroup.add(fruits);
            
        }
        





    }

    end(){
       console.log("Game Ended");
    }
}
