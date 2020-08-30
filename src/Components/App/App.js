import React from 'react';
import './App.css';

import UsersList from '../UsersList/UsersList';
import Timer from '../Timer/Timer';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPopup from '../LoginPopup/LoginPopup';

import { Navbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


const userGenerator = (i) => {
  let ranBoolean = Math.random() < 0.7;
  const user = {
    name: "User" + i,
    active: ranBoolean,
    color: ranBoolean ? "" : "white",
    alreadyClicked:false
  }
  return user;
}

let usersList = [];

for(let i = 0; i <= 20; i++){
  const newUser = userGenerator(i);
  usersList.push(newUser)
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      usersList: usersList,
      timer: null,
      showPopup: false,
      registeredUserName: localStorage.getItem("user") || "",
      registeredUserColor:"",
      registeredUserAlreadyClicked:false
    };
    this.changeRegistrationName = this.changeRegistrationName.bind(this);
    this.setRegisteredUserColor = this.setRegisteredUserColor.bind(this);
    this.resetLogIn = this.resetLogIn.bind(this);
  }

  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
  }

  changeRegistrationName(input){
    localStorage.setItem("user", input);
    this.setState({registeredUserName: input})
  }

  setRegisteredUserColor(){
    this.setState({
      registeredUserColor:this.getColor(),
      registeredUserAlreadyClicked:true
    })
  }

  startTimer(){
    this.setState({
      timer: 6000
    });
  }

  componentDidMount() {
    this.startTimer()

    const miFuncion = () => {
      let updatedTime = this.state.timer - 1   
      this.setState({
        timer: updatedTime
      })
      
      if (updatedTime === 0) {
        clearInterval(interval); 
      }

      if (Math.random() < 0.001) {
        this.clickGenerator();
      }
    } 

    let interval = setInterval(miFuncion, 10);
  }

  getColor() {
    const time = this.state.timer / 100;
    if (time < 61 && time > 51) {
      return "purple";
    } else if (time < 52 && time > 41) {
      return "blue";
    } else if (time < 42 && time > 31) {
      return "green";
    } else if (time < 32 && time > 21) {
      return "yellow";
    } else if (time < 22 && time > 11) {
      return "orange";
    } else if (time < 12 && this.state.timer >= 0) {
      return "red";    
    } 
  }

  getRandomUser(){
    let availableUsersArr = this.state.usersList.filter(user =>
      user.alreadyClicked === false && user.active === true);
    
    return availableUsersArr[Math.floor(Math.random() * availableUsersArr.length)]
  }

  clickGenerator(){
    const randomUser = this.getRandomUser();
    if (!randomUser) {
      return
    }
    const updatedRandomUser = {
      ...randomUser,
      color: this.getColor(),
      alreadyClicked: true      
    };

    const updatedUserList = this.state.usersList.filter(user => user.name !== randomUser.name);
    updatedUserList.push(updatedRandomUser);

    this.setState({
      usersList: updatedUserList
    })
    
    this.startTimer();
  }

  resetLogIn(){
    this.setState({
      registeredUserName: ""
    })
  }

  render(){
    const isLoggedIn = this.state.registeredUserName!=="";
    let button;
    if (!isLoggedIn) {
      button = <Button onClick={this.togglePopup.bind(this)}>LOG IN </Button>
    } else {
      button = <Button className="logout-btn" onClick={this.resetLogIn}><span className="welcome">Welcome Admin</span><img className="logout-icon" src="./cerrar-sesion.png"></img></Button>
    }
    
    return (
      <div className="App">
        <Navbar className="bg-light justify-content-between">
          <div className="reddit-div">
            <img className="anchor" alt="" src="anchor.png"></img>
            <h3 className="reddit-title">reddit</h3>
          </div>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="search-bar lg-8" />
          </Form>  
            <div>
            {button}
            {this.state.showPopup ?  
            <LoginPopup changeRegistrationName={this.changeRegistrationName}
            closePopup={this.togglePopup.bind(this)} />  
            : null  
            }
            </div>

        </Navbar>

        <div className="body-wrap">
          <div className="button-timer-border">
              <div className="button-timer-box">
                <div className="timer-content">
                  <Timer className="timer" timer={this.state.timer} />
                </div>
                <div className="button-content">
                  <button className="the-button" disabled={this.state.registeredUserAlreadyClicked===true}
                  onClick={this.setRegisteredUserColor}><i className="fa fa-lock"></i></button>
                </div>
            </div>
          </div>

          <div className="userslist-border">  
            <UsersList className="users-list" users={this.state.usersList} registeredUserName={this.state.registeredUserName}
            registeredUserColor={this.state.registeredUserColor} 
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
