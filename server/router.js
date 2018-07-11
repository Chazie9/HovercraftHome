
const express = require('express');
const router = express.Router();
const axios = require('axios');
var bodyParser = require('body-parser');
var faker = require('faker');
const handleLine = require('./handleLine.js')

require('dotenv').load();

var jsonParser = bodyParser.json()


let userQueue = [];

router.post('/addUser', jsonParser, (req, res)=>{
  var randomAvatar = faker.image.food(100, 100);
  //console.log(randomAvatar);
  let position = userQueue.length
  userQueue.push({username: req.body.username, userAvatar: randomAvatar})
  handleLine(userQueue);
  let body = {
    position: position,
    avatar: randomAvatar,
    driverList: userQueue
  }
  checkQueue();
  res.send({body: body});
});

router.get('/getDriverList', (req, res)=>{
  let body = {
    driverList: userQueue
  }
  res.send({body: body});
});

setInterval(intervalFunc, 1500);

function intervalFunc() {
  if(userQueue.length > 0) {
    let currentDriver = userQueue.shift();
    let nextDriver = userQueue[0]
    
  }
}

// console.log(userQueue.length)
// if(userQueue.length > 0) {
//   setInterval(intervalFunc, 1500);
// }




// app.get('/addToQueue/:userId', function(req, res){
//     console.log('adding user to queue, ')
//     userQueue.push(req.params.id)
//     let position = userQueue.length
//     res.send({body: `added user to queue in position ${position}`});
// });

// app.get('/removeFromQueue', function(req, res){
//     console.log('adding user to queue, ')
//     let newDriver = userQueue.shift();
//     res.send(200)
//     //res.send({body: `added user to queue in position ${position}`});
// });

router.get('/', (req, res)=>{
  //do stuff
});




module.exports = router;

