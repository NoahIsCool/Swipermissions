import React, { Component } from 'react';
import "./ChangingButton.css"
import Button from '@material-ui/core/Button';

class Checkout extends React.Component {
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
      if (this.state.user !== '')
      {
        alert('A name was submitted: ' + this.state.user);
  
      }
      else if (this.state.user === '')
      {
        alert("Please enter a user");
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

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes();
class ChangingButton extends React.Component {
    constructor(){
           super();
  
           this.state = {
                showPopup: false, 

                green: true,
           }
      }
      checkOut() {
        this.setState({green: !this.state.green})
        this.setState({
            showPopup: !this.state.showPopup
            
        });
        alert(date + " " + time);

        /*
        fs.appendFile("testfile.txt", date, function (err) {
            if (err) throw err;
            console.log('Saved!'); });
            */
      }
      togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
          
        });
      }
  
      changeColor(){
          this.setState({green: !this.state.green})
      }
  
      render(){
          let btn_class = this.state.green ? "greenButton" : "redButton";
  
          return (
               <div>
                   <Button variant ='outlined' className={btn_class} onClick={this.checkOut.bind(this)}>&nbsp;</Button>
                        {this.state.showPopup ? 
                        <Checkout
                            
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                        }
                    

               </div>
          )
      }
  }

  export default ChangingButton