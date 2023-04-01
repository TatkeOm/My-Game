const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;

var bg_img;
var food;
var rabbit;
var star1,star2;
var balloon2;
var starCounter,emptyStar;

var button,button2,button3;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  starImage = loadImage('star.png')
  emptyStars = loadImage("empty.png");
  oneStar = loadImage("one_star.png");
  twoStar = loadImage("stars.png");
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");


  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  //star sprites
  star1 = createSprite(260,70,10,10) 
  star1.addImage(starImage)
  star1.scale = 0.02;
  
  star2 = createSprite(70,340,10,10)
  star2.addImage(starImage)
  star2.scale = 0.02

  balloon2 = createImg('baloon2.png')
  balloon2.size(120,120)
  balloon2.position(195,400);
  balloon2.mouseClicked(verticalForce);

  //star counter
  starCounter = createSprite(50,50,40,20);
  starCounter.addImage("empty",emptyStars);
  starCounter.addImage("one",oneStar);
  starCounter.addImage("two",twoStar);
  starCounter.changeImage("empty");
  starCounter.scale= 0.2;
  
  //btn 1
  button = createImg('cut_btn.png');
  button.position(115,100);
  button.size(50,50);
  button.mouseClicked(drop);

   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(340,100);
   button2.size(50,50);
   button2.mouseClicked(drop2);
 
   rope = new Rope(7,{x:115,y:100});
   rope2 = new Rope(7,{x:370,y:100});


  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  ground = new Ground(250,height,width,20);
  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(150,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny,80)==true)
  {
    Matter.World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
  }

  if(collide(fruit,ground.body,80)==true)
  {
   bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
  }

  //collision between the star and the fruit
  if(collide(fruit,star1,20)) 
  {
    star1.visible = false;
    starCounter.changeImage("one")
  }
  
  if(collide(fruit,star2,20)){
    star2.visible = false;
    starCounter.changeImage("two")
  }
  
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}
/*
JSON - Java Script Object Notation

key-value pair 

syntax:  {key1:value, key:value}

Matter.Body.applyForce(body, {initial Force}, {Direction of Force})
Most of the time, the initial force will be zero. 

*/
function verticalForce() //apply force in upward direction
{
 Matter.Body.applyForce(fruit,{x:0, y:0} , {x:0, y:-0.05} )
 air.play();
}