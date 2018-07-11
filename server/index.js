const express = require('express');
const app = express();
const router = require('./router.js')
const morgan = require('morgan');
var bodyParser = require('body-parser');
var faker = require('faker');
//const http = require('http')
//var socketIO = require('socket.io');


app.use(morgan('dev'));
var jsonParser = bodyParser.json();

app.use(express.static('./client/dist'));

//app.use(router);

const PORT = process.env.PORT || 3000;
var server = app.listen(3000);
//const server = http.createServer(app)
var io = require('socket.io').listen(server);
//var io = require('socket.io').listen(server);
//const io = socketIO(server).listen(server)

let driverQueue = [];
let currentDriver = 'asdfasdfas';
let nextDriver = 'asdf serwwerwerw ';
console.log(driverQueue)

io.on('connection', socket => {
    console.log('User connected')
    socket.emit('messages', 'Hello from server');

    socket.on('joinLine', function(data) {
        var randomAvatar = faker.image.food(100, 100);
        console.log(data);
        let position = driverQueue.length
        driverQueue.push({username: data.username, userAvatar: randomAvatar})
        
        let body = {
          position: position,
          avatar: randomAvatar,
          driverList: driverQueue
        }
        console.log(driverQueue);
        socket.emit('queueUpdate', body);
    });

    socket.on('add', function(data) {
        client.emit('broad', data);
        client.broadcast.emit('broad',data);
    });
    
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('informDrivers', function(data) {   
        let body = {
          currentDriver: currentDriver,
          nextDriver: nextDriver,
          driverList: driverQueue
        }
        socket.emit('informDrivers', body);
    });



    ///bad pratice? too much in here
    setInterval(intervalFunc, 9500);
    
    function intervalFunc() {
        if(driverQueue.length > 1) {
            console.log('more than 2 in the queue')
            currentDriver = driverQueue.shift();
            nextDriver = driverQueue[0]
    
            let body = {
                currentDriver: currentDriver,
                nextDriver: nextDriver,
                driverList: driverQueue
            }
            
            socket.emit('informDrivers', body);
           return;
        } else if(driverQueue.length === 1){
            console.log('only 1 in queue ')
            currentDriver = driverQueue.shift();
            nextDriver = "asdfasdf werfdsc"
            console.log('current driver', currentDriver)
                let body = {
                    currentDriver: currentDriver,
                    nextDriver: "ertwrqwe23e",
                    driverList: driverQueue
                }   
            socket.emit('informDrivers', body);
            return;
        } else {
            console.log('no one in queue ');
            let body = {
                currentDriver: "asdf 55gfdsdva",
                nextDriver: "asdfkn2iu34weosdnvc",
                driverList: driverQueue
            }
            currentDriver = "asdf 55gfdsdva";
            nextDriver = "asdfkn2iu34weosdnvc";
            socket.emit('informDrivers', body);
        }
    }
})

app.get('/getDriverList', (req, res)=>{
    let body = {
      driverList: driverQueue
    }
    res.send({body: body});
});

let accessCode = 1234
app.get('/api/currentDriver/:userName', (req, res)=>{
    if(req.params.id === driverQueue[0]) {
        accessCode = Math.random()*1000
        res.send({body: accessCode});
    }
    res.send('are you the one??')
});

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`));


//watching the queue


// function intervalFunc() {
//     console.log('called')
//     if(driverQueue.length >= 2) {
//         let currentDriver = driverQueue.shift();
//         let nextDriver = driverQueue[0]

//         socket.on('informDrivers', function(data) {   
//             let body = {
//               currentDriver: currentDriver,
//               nextDriver: nextDriver,
//               driverList: driverQueue
//             }
//             socket.emit('informDrivers', body);
//         });
//     } else {
//         let currentDriver = driverQueue.shift();
//         socket.on('informDrivers', function(data) {   
//             let body = {
//               currentDriver: currentDriver,
//               nextDriver: "",
//               driverList: driverQueue
//             }
//             socket.emit('informDrivers', body);
//         });
//     }
//   }





