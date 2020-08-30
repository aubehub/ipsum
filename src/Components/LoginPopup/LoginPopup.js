import React from 'react'; 
import './LoginPopup.css';

class LoginPopup extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      userName:"",
      password:"",
      incorrectData: false,
    }

  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.changeUserName = this.changeUserName.bind(this);
  this.changePassword = this.changePassword.bind(this);  
  }

  handleSubmit(e){
    e.preventDefault();
    if(this.state.userName === 'Admin' && this.state.password === '123'){
      this.props.changeRegistrationName(this.state.userName)
      this.props.closePopup()
    } else {
      this.setState({
        incorrectData: true
      })
    }
  }

  handleClose(e){
    e.preventDefault();
    this.props.closePopup()
  }

  changeUserName(e){
    this.setState({userName:e.target.value})
  }

  changePassword(e){
    this.setState({password:e.target.value})
  }

  render() {  
    return (  
      <div className='popup'>
        <div className='popup-inner'>
          <button onClick={this.handleClose} className="close-icon"><i className="fa fa-times"></i></button>
          {this.state.incorrectData && <p className="error-message">Incorrect username or password. Try again!</p>
          }

          <form 
          onSubmit={this.handleSubmit} >
            <h3>Log In</h3>
            <div className="form-group">
                <label>Username</label>
                <input onChange={this.changeUserName} type="username" className="form-control" placeholder="Admin" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" onChange={this.changePassword} className="form-control" placeholder="123" />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Log in</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
          </form>
        </div>  
      </div>  
    );  
  }  
}  

export default LoginPopup;
