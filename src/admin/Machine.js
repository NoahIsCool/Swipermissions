import React, { Component } from 'react';
import './Machine.css';
import ChangingButton from "./ChangingButton"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info'

function findTime()
{
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var sign = "P.M.";
  var hour = today.getHours();
  var minute = today.getMinutes();

  if (today.getHours() < 12)
  {
    sign = "A.M.";
  }

  if (hour > 12)
  {
    hour = hour - 12;
  }
  else if (hour == 0)
  {
    hour = 12;
  }

  if (minute < 10)
  {
    minute = "0" + minute;
  }

  return date + " " + hour + ":" + minute + " " + sign;
}

class Machine extends Component {
  constructor(props) {
    super(props);
    //localStorage.clear();

    var oldlog = "";
    var oldCheck = false;
    var oldUser = "";
    var isGreen = true;

    if (!(JSON.parse(localStorage.getItem('log' + this.props.id) == undefined)))
    {
      oldlog = JSON.parse(localStorage.getItem('log' + this.props.id));
    }

    if (!(JSON.parse(localStorage.getItem('checkedOut' + this.props.id) == undefined)))
    {
      oldCheck = JSON.parse(localStorage.getItem('checkedOut' + this.props.id));
    }

    if (!(JSON.parse(localStorage.getItem('user' + this.props.id) == undefined)))
    {
      oldUser = JSON.parse(localStorage.getItem('user' + this.props.id));
    }

    if (!(JSON.parse(localStorage.getItem('green' + this.props.id) == undefined)))
    {
      isGreen = JSON.parse(localStorage.getItem('green' + this.props.id));
    }

    this.state = {
      showPopup: false, 
      showCheckin: false,
      showLogs: false,
      logs: oldlog,
      checkedOut: oldCheck,
      user: oldUser,
      id: this.props.id,
      green: isGreen,
    };

    this.togglePopup = this.togglePopup.bind(this);
    this.showLogs = this.showLogs.bind(this);
    this.closeLogs = this.closeLogs.bind(this);

    this.closePopup = this.closePopup.bind(this);
  }

  

  closePopup()
  {
    this.setState(
      {
        showCheckin: false,
      }
    );
  }
  
  togglePopup() {
    if (!this.state.checkedOut)
    {
      this.setState({
        showPopup: !this.state.showPopup
      });
    }
    else
    {
      this.setState({
        showCheckin: !this.state.showCheckin
      });
    }
  }

  showLogs() {

    this.props.triggerParentUpdate();
  }

  closeLogs()
  {

  }

  render()
  {
      return (  
      <tr className="Machine">
        <td className= "MName">{this.props.name}</td>
        <td className = "KeyBox">
        <ChangingButton green = {this.state.green} id= {this.props.id} triggerParentUpdate= {this.togglePopup.bind(this)}></ChangingButton>
        {this.state.showPopup ? 
          <Checkout 
            id = {this.state.id}
            logs = {this.state.logs}
            checkedOut = {this.state.checkedOut}
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
        {this.state.showCheckin ? 
          <Checkin 
            id = {this.state.id}
            logs = {this.state.logs}
            checkedOut = {this.state.checkedOut}
            closePopup={this.closePopup.bind(this)}
          />
          : null
        }
        </td>
        
        <td className = "InfoBox"  
        onClick={this.showLogs.bind(this)} 
        
        >
        
        <div className = 'Fourth'> 

        {/*
          this.state.showLogs ? 
          <Editor
            logs = {this.state.logs}

            closePopup={this.closeLogs.bind(this)}
          />
          : null
        */}   
          <Fab size="small" color = "primary" className ='Info'>
          
          <InfoIcon className = 'Icon2' />
          </Fab>
        </div>
        </td>
        <td className = "AddBox">
        <div className = 'Third'>        
          <Fab size="small" color = "primary" className ='Add'>
          <AddIcon/>
          </Fab>
        </div>
        </td>
        
      </tr>
      
    )
  }
}

class Checkout extends Machine {
  constructor(props) {
    super(props);
    this.state = 
    {
      user: '',
      id: this.props.id,
    };

    this.handleChangeUser = this.handleChangeUser.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUser(event) {
    this.setState({user: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.user !== '')
    {
      localStorage.setItem("user" + this.state.id, JSON.stringify(this.state.user));
      localStorage.setItem("checkedOut" + this.state.id, JSON.stringify(!this.props.checkedOut));
      
      var timestr = findTime();
      var newLog =  this.props.logs + this.state.user + ": " + timestr + "  --  ";

      var itemName = 'log' + this.props.id;
      localStorage.setItem(itemName, JSON.stringify(newLog));
      localStorage.removeItem("user" + this.props.id);
      
      localStorage.setItem("green" + this.props.id, false);
        this.setState(
          {
            user: ""
          }
        );
    }
    else if (this.state.user == '')
    {
      alert("Please enter a user");
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className='Login'>
        <div className='Login_inner1'>
          <div className='Close_bar'>
            <button className ='closer' onClick={this.props.closePopup}>X</button>
          </div>
          
          <div className ='SignIn'>
            <form className='SignForm' onSubmit={this.handleSubmit}>
            Check out to?
              <label className='UserBar'>              
                <input type="text" value={this.state.user} onChange={this.handleChangeUser} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>

        </div>
 
      </div>
    );
  }
}

class Checkin extends Machine {
  constructor(props) {
    super(props);
    this.state = 
    {
      time: '',
      id: this.props.id,
    };

    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTime(event) {
    this.setState({time: event.target.value});
  }

  handleSubmit(event)
  {
    var realCheck = !this.props.checkedOut;
    localStorage.setItem("checkedOut" + this.props.id, JSON.stringify(realCheck));
    var pastLog = this.props.logs;
    var newLog = pastLog + this.state.time + "\n";
    var itemName = 'log' + this.props.id;

    if (this.state.time == '')
    {    
      var timestr = findTime();  
      newLog = pastLog + timestr + "\n";
    }
    localStorage.setItem(itemName, JSON.stringify(newLog));
    
    localStorage.setItem("green" + this.props.id, true);

  }

  render() {
    return (
      <div className='Login'>
        <div className='Login_inner1'>
          <div className='Close_bar'>
            <button className ='closer' onClick={this.props.closePopup}>X</button>
          </div>
          
          <div className ='SignIn'>
            <form className='SignForm' onSubmit={this.handleSubmit}>
            Check in time?
              <label className='UserBar'>
                
                <input type="text" value={this.state.time} onChange={this.handleChangeTime} />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>

        </div>
 
      </div>
    );
  }
}

export default Machine