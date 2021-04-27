var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = []

var divisionHeight=300;

var particle
var score = 0;
var turn = 0

var gamestate = "play"

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 65; j <=width; j=j+50) {    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) {    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,375));
    }   
}
 
function draw() {
  Engine.update(engine);
  
  background("black");

  textSize(30)
  text("Score : "+score, 10, 30)
  text("500", 15, 550)
  text("500", 95, 550)
  text("500", 175, 550)
  text("500", 255, 550)
  text("100", 335, 550)
  text("100", 415, 550)
  text("100", 495, 550)
  text("200", 575, 550)
  text("200", 655, 550)
  text("200", 735, 550)

  if(gamestate === "end"){
    textSize(70)
    text("Game Over", 220, 350)
  }
  
   for (var i = 0; i < plinkos.length; i++) {     
     plinkos[i].display();
   }

   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

   if(particle != null){
     particle.display()
     if(particle.body.position.y>760){
       if(particle.body.position.x < 300){
         score+=500
         particle = null
         if(turn>= 5) {
          gamestate = "end"
         }
       }
       
       else if(particle.body.position.x > 301 && particle.body.position.x < 600){
         score += 100
         particle = null
         if(turn>= 5) {
           gamestate = "end"
          }
      }

      else if(particle.body.position.x > 600 && particle.body.position.x < 900){
        score += 200
        particle = null
        if(turn>= 5) {
          gamestate = "end"
         }
     }

     }
   }
}

function mousePressed(){
  if(gamestate !== "end"){
    turn++
    particle = new Particle(mouseX, 10, 10, 10)
  }
}