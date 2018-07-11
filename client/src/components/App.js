import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import Chatroom from './Chatroom/Chatroom';
import DrivingOrder from './DrivingOrder/DrivingOrder';
import SetName from './SetName/SetName';
import TheNavBar from './TheNavBar/TheNavBar';
import './App.css';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: "",
      avatar: "",
      position: "",
      driverList: [],
      inQueue: false
    }
    this.getUserInfo = this.getUserInfo.bind(this);
    this.socket = socketIOClient('http://localhost:3000')
    this.saveData = this.saveData.bind(this);

    this.socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
    });

  //   socket.on('connect', function(name) {
  //     socket.emit('joinLine', name);
  //  });

    this.socket.on('queueUpdate', (data) => {
     //alert(data);
      let drivers = data
      console.log(data.driverList, 'the driverlist')
      this.saveData(data); 
   });

   this.socket.on('informDrivers', (data) => {
      console.log(data, 'informing Drivers')
      if(data.currentDriver.username === this.state.userName || data.nextDriver.username === this.state.userName) {
        console.log('hey your up!!!')
        alert('hey your up!!!')
       
        fetch(`http://localhost:3000/api/currentDriver/${this.state.userName}`)

        
        this.setState({
          inQueue: false
        })
      }
      this.setState({
        driverList: data.driverList
      }) 
    })

   this.sendMessage = ev => {
     console.log(ev, 'the ev');
      this.socket.emit('joinLine', {
        username: ev
      })
    }

    this.recieveMessage = ev => {
       this.socket.emit('joinLine', {
         username: ev
       })
     }

     this.informDrivers = ev => {

     }

     this.recieveDriverUpdates = ev => {
      this.socket.emit('joinLine', {
        username: ev
      })
    }
  }

  saveData(data) {
    console.log('more data', data)
    this.setState({
      driverList: data.driverList,
      avatar: data.avatar,
      position: data.position
    })
  }

  componentWillMount(){
    var url = 'http://localhost:3000/getDriverList';
    
    fetch(url, {
      method: 'GET', // or 'PUT'
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => this.setState({
      driverList: response.body.driverList
    }));

  }

  getUserInfo(name) {
    this.setState({userName: name});
    console.log('clicks') 
    this.addUserToQueue(name)
  }

  addUserToQueue(name) {
    this.sendMessage(name)
    this.setState({
      inQueue: true
    })
    // var url = 'http://localhost:3000/addUser';
    // var data = {username: name}

    // fetch(url, {
    //   method: 'POST', // or 'PUT'
    //   body: JSON.stringify(data), // data can be `string` or {object}!
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => res.json())
    // .catch(error => console.error('Error:', error))
    // //.then(response => console.log('Success:', response))
    // .then(response => this.setState({
    //   avatar: response.body.avatar,
    //   position: response.body.position,
    //   driverList: response.body.driverList
    // }));
  }



  render () {
    const isInQueue = this.state.inQueue
    return ( 
            <div> 
              <TheNavBar />
              <div className="top-container">
                <div>
                  <VideoPlayer />
                  <DrivingOrder driverList={this.state.driverList} avatar={this.state.avatar} position={this.state.position}/>
                  {isInQueue ? <div></div> : <SetName saveUserInfo={this.getUserInfo}/>}
                </div>
                <Chatroom />
              </div>
            </div>
    );
  }
}

export default App;