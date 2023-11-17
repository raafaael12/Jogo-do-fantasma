var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadAnimation("ghost-standing.png","ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addAnimation("ghost",ghostImg);

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
  if(gameState === "play"){
  background(0);
  
   if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")){
       ghost.velocityY = -10
    }
    if(keyDown("right_arrow")){
      ghost.x = ghost.x +3
    }
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3
    }
    ghost.velocityY = ghost.velocityY + 0.8

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
      SpawnDoors();
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
        ghost.destroy();
        gameState = "end"
      }
    drawSprites();
  }
  if(gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(40);
    text("Fim de Jogo",250,250)
  }
}
function SpawnDoors(){
  if(frameCount % 200 === 0){
    var door = createSprite(200,-50);
    door.addImage(doorImg);
    var climber = createSprite(200,10)
    climber.addImage(climberImg)
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.visible = true
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 1;
  
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    climber.x = Math.round(random(150, 400));
    door.x = climber.x;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}