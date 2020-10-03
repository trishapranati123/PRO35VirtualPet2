const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogImg,foodObj,feed,fedTime, lastFed,addFood;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  
}

function setup() {
  createCanvas(700,400); 
  database = firebase.database();
  foodObj=new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,300,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;



  feed=createButton("Feed the dog");
  feed.position(600,100);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(700,100);
  addFood.mousePressed(addFoods);
}


function draw() {    
  background(46,139,87);  
  foodObj.display();
  //dogImg1.display();
  //if (keyWentDown(UP_ARROW)){
    //writeStock(foodS);
   // dog.addImage(happyDog);
 //}
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed=data.val();
  })
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+lastFed%12+" PM",60,65);
  } else if(lastFed==0){
    text("Last Feed:12 AM",60,65);
  } else{
    text("Last Feed:"+lastFed+" AM",60,65);
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


  function feedDog(){
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }

  function addFoods(){
    //function to read food Stock
    foodS++;
    database.ref('/').update({
      Food : foodS
    })
  }
  