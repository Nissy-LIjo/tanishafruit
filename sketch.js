// Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

var sword1;
var gameoverS;
var knifeSound;

function preload(){
  swordImage = loadImage ("sword.png");
  bg=loadImage("Wiki-background.jpg");
 fruit1 = loadImage ("fruit1.png");
  fruit2 = loadImage ("fruit2.png");
  fruit3 = loadImage ("fruit3.png");
  fruit4 = loadImage ("fruit4.png");
  gameover = loadImage ("gameover.png");
  monsterImage = loadAnimation ("alien1.png","alien2.png");
  gameoverS = loadSound ("gameover.mp3");
 knifeSound = loadSound("knifeSwooshSound.mp3");

}

function setup(){
  createCanvas(600,600);

  // creating sword
  sword1 = createSprite(40,200,20,20);
  sword1.addImage(swordImage);
  sword1.scale = 0.7
  // set collider for sword
  sword1.setCollider ("rectangle",0,0,40,40);
  
  
  // score variables and groups
  score = 0;
  fruitGroup = new Group();
  enemyGroup = new Group();
}


function draw() {
background (bg);

  if (gameState ===PLAY)
{
    // call fruits and Enemy function 
    fruits();
    Enemy();
  
  // move sword with mouse
  sword1.y = World.mouseY;
  sword1.x = World.mouseX;
 knifeSound.play();
  
  // increase score if sword touching fruit
  if (fruitGroup.isTouching(sword1)){
    fruitGroup.destroyEach();
  score = score + 2;
   if (gameState===PLAY)
     {
       knifeSound.play();
     }
}
 else {
   if (enemyGroup.isTouching(sword1))
     {
       gameState = END
       //gameover Sound
       gameoverS.play();
        fruitGroup.destroyEach();
       enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach (0);
         enemyGroup.setVelocityXEach (0);
       //change animation to gameover
       sword1.addImage(gameover)
       sword1.x = 200;
       sword1.y =200;

     }
 } 
}
   drawSprites();
  textSize(20)
text ("Score="+ score,300,30) ;
}
  
 
     
 

function fruits() {
  

  if (World.frameCount%80===0){
  fruit = createSprite (400,200,20,20);
    position = Math.round(random(1,2));
    if (position===1)
      {
        fruit.x = 400;
        fruit.velocityX = -(7+(score/4));
      }
        else
          
        {
          
             if (position===2) {
               fruit.x = 0;
     //increase the velocity of fruit after score 4 to 10
               fruit.velocityX = (7+(score/4));
       }        
               
      }
  fruit.scale = 0.2;
  // fruit.debug = true;
  r = Math.round(random(1,4));
  if (r == 1)
    fruit.addImage(fruit1);
     else  if (r ==2) 
        fruit.addImage(fruit2); 
    else   if (r == 3)
        fruit.addImage (fruit3)
          else
            fruit.addImage ( fruit4)
          
        
      
        
      
        
fruit.y = Math.round (random(50,340)) ;
      
     // fruit.velocityX =-7;
      fruit.setLifetime = 100;
      
      fruitGroup.add(fruit);
  }}
       
 function Enemy () {
   if (World.frameCount%200===0)
     {
       monster= createSprite ( 400,200,20,20);
       monster.addAnimation ("moving",monsterImage)
       monster.y = Math.round(random(100,300))
       monster.velocityX = -(8+(score/10));
       enemyGroup.add (monster);
       
     }
 }
























