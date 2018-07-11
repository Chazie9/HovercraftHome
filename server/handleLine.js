//import router from './router';
function timer () {
    let users = true;
    while(users) {
        setTimeout(myFunc, 5500);
    }
}

function intervalFunc() {
    console.log('Cant stop me now!');
  }
  
  //setInterval(intervalFunc, 5500);


function myFunc() {
    console.log('the time is up');
}




module.exports = timer;