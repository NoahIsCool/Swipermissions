import React, { Component } from 'react';
import Table from './Table';
import LoginButton from './LoginButton';
import './App.css';


function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props)
{
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      user: '',
      password: ''
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }




  handleChangeUser(event) {
    this.setState({user: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.user !== '' && this.state.password !== '')
    {
      alert('A name was submitted: ' + this.state.user + '\n'
        +'A pass was submitted: '  + this.state.password);

    }
    else if (this.state.user !== '')
    {
      alert("Please enter a password");
      event.preventDefault();
    }
    else
    {
      alert("Please enter a username");
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className='Login'>
        <div className='Login_inner'>
          <div className='Close_bar'>
            <button className ='closer' onClick={this.props.closePopup}>X</button>
          </div>
          <Greeting isLoggedIn={this.state.password !== ''} />

          <div className ='SignIn'>
          Sign In
            <form className='SignForm' onSubmit={this.handleSubmit}>
            User ID: 
              <label className='UserBar'>
                
                <input type="text" value={this.state.user} onChange={this.handleChangeUser} />
              </label>
            Password: 
              <label className='PasswordBar'>
                
                <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>

        </div>
 
      </div>
    );
  }
}

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      showPopup: false, 
      hasLoggedIn: false
    };
  }
  
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  render() {

    return (
      <div className= "Wrapper">
        <div className="TopContainer">
          <div className="TopLeft">&nbsp;</div>
          <div className="Title">
            {this.props.title}
          </div>
          <div className="TopRight">
            {/*<LoginButton></LoginButton>*/}
            <button variant ='outline-danger' className ='logButton' onClick={this.togglePopup.bind(this)}>LOGIN</button>
            {this.state.showPopup ? 
              <Login
                
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }
          </div>
        </div>
        <div className="BottomContainer">
          <Table></Table>
        </div>
        
      </div>
    );
  }
}

export default App;
