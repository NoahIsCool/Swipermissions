import React, { Component } from 'react';
import Machine from './Machine'
import './MachineTable.css'


class MachineTable extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showEditor1: false,
      showEditor2: false,
      showEditor3: false,
      showEditor4: false,
      showEditor5: false,
      showEditor6: false,
      showEditor7: false,

      log1: '',
      log2: '',
      log3: '',
      log4: '',
      log5: '',
      log6: '',
      log7: '',
    }

    this.showLogs1 = this.showLogs1.bind(this);
    this.showLogs2 = this.showLogs2.bind(this);
    this.showLogs3 = this.showLogs3.bind(this);
    this.showLogs4 = this.showLogs4.bind(this);
    this.showLogs5 = this.showLogs5.bind(this);
    this.showLogs6 = this.showLogs6.bind(this);
    this.showLogs7 = this.showLogs7.bind(this);

    this.closeLogs = this.closeLogs.bind(this);

  }

  showLogs1()
  {
    var log = '';
    if (!(JSON.parse(localStorage.getItem('log1') == undefined)))
    {
      log = JSON.parse(localStorage.getItem('log1'));
    }
    this.setState(
      {
        log1: log,
        showEditor1: true
      }
    )
  }

  showLogs2()
  {
    var log = '';
    if (!(JSON.parse(localStorage.getItem('log2') == undefined)))
    {
      log = JSON.parse(localStorage.getItem('log2'));
    }
    this.setState(
      {
        log2: log,
        showEditor2: true
      }
    )
  }

  showLogs3()
  {
    var log = '';
    if (!(JSON.parse(localStorage.getItem('log3') == undefined)))
    {
      log = JSON.parse(localStorage.getItem('log3'));
    }
    this.setState(
      {
        log3: log,
        showEditor3: true
      }
    )
  }

  showLogs4()
  {
    var log = '';
    if (!(JSON.parse(localStorage.getItem('log4') == undefined)))
    {
      log = JSON.parse(localStorage.getItem('log4'));
    }
    this.setState(
      {
        log4: log,
        showEditor4: true
      }
    )
  }

  showLogs5()
  {
    var log = '';
    if (!(JSON.parse(localStorage.getItem('log5') == undefined)))
    {
      log = JSON.parse(localStorage.getItem('log5'));
    }
    this.setState(
      {
        log5: log,
        showEditor5: true
      }
    )
  }

  showLogs6()
  {
    var log = '';
    if (!(JSON.parse(localStorage.getItem('log6') == undefined)))
    {
      log = JSON.parse(localStorage.getItem('log6'));
    }
    this.setState(
      {
        log6: log,
        showEditor6: true
      }
    )
  }

  showLogs7()
  {
    var log = '';
    if (!(JSON.parse(localStorage.getItem('log7') == undefined)))
    {
      log = JSON.parse(localStorage.getItem('log7'));
    }
    this.setState(
      {
        log7: log,
        showEditor7: true
      }
    )
  }

  closeLogs()
  {
    this.setState(
      {
        showEditor1: false,
        showEditor2: false,
        showEditor3: false,
        showEditor4: false,
        showEditor5: false,
        showEditor6: false,
        showEditor7: false,
      }
    )
  }



  render() {
    return (
    <table className="MachineTable">

      <tbody className = "chart">
        <tr className = "Titles">
          <th className = "MName">Name</th>
          <th className = "Keys">Checkout/in</th>
          <th className = "KeyHistory">History</th>

          <th className = "AS">Add Users</th>
        </tr>
        <Machine name="Mill" id= "1" triggerParentUpdate = {() => this.showLogs1()}></Machine>
        {
          this.state.showEditor1 ? 
          <Editor
            logs = {this.state.log1}
            id = {1}
            name = "Mill"
            closePopup={this.closeLogs.bind(this)}
          />
          : null
        }
        <Machine name="Mill" id= "2" triggerParentUpdate = {() => this.showLogs2()}></Machine>
        {
          this.state.showEditor2 ? 
          <Editor
            logs = {this.state.log2}
            id = {2}
            name = "Mill"
            closePopup={this.closeLogs.bind(this)}
          />
          : null
        }
        <Machine name="Lathe" id = "3" triggerParentUpdate = {() => this.showLogs3()}></Machine>
        {
          this.state.showEditor3 ? 
          <Editor
            logs = {this.state.log3}
            id = {3}
            name = "Lathe"
            closePopup={this.closeLogs.bind(this)}
          />
          : null
        }
        <Machine name="Lathe"  id = "4" triggerParentUpdate = {() => this.showLogs4()}></Machine>
        {
          this.state.showEditor4 ? 
          <Editor
            logs = {this.state.log4}
            id = {4}
            name = "Lathe"
            closePopup={this.closeLogs.bind(this)}
          />
          : null
        }
        <Machine name="CNC Mill" id = "5" triggerParentUpdate = {() => this.showLogs5()}></Machine>
        {
          this.state.showEditor5 ? 
          <Editor
            logs = {this.state.log5}
            id = {5}
            name = "CNC Mill"
            closePopup={this.closeLogs.bind(this)}
          />
          : null
        }
        <Machine name="CNC Router"  id = "6" triggerParentUpdate = {() => this.showLogs6()}></Machine>
        {
          this.state.showEditor6 ? 
          <Editor
            logs = {this.state.log6}
            id = {6}
            name = "CNC Router"
            closePopup={this.closeLogs.bind(this)}
          />
          : null
        }
        <Machine name="CNC Plasma"  id = "7" triggerParentUpdate = {() => this.showLogs7()}></Machine>
        {
          this.state.showEditor7 ? 
          <Editor
            logs = {this.state.log7}
            id = {7}
            name = "CNC Plasma"
            closePopup={this.closeLogs.bind(this)}
          />
          : null
        }
           

      </tbody>
    </table>
    )
  }
}

class Editor extends Machine {
  constructor(props) {
    super(props)
    this.state = {
      textareaValue: this.props.logs,
      logNum: this.props.id,
      name: this.props.name,
    }
  }
  handleOnChange(event) {
    this.setState({
      textareaValue: event.target.value
    })
    event.preventDefault();
  }
  handleOnSubmit(event) {
    event.preventDefault();
    localStorage.setItem('log' + this.state.logNum, JSON.stringify(this.state.textareaValue));
    //this.forceUpdate();
    this.props.closePopup();

    
  }
  render() 
  {
    return (
    
      <div className = "logPop">
        <div className = "logInner">
          <div className='Close_bar'>
          {this.props.name + " Log" }
            <button className ='closer' onClick={this.props.closePopup}>X</button>
          </div>
          <form onSubmit={(event) => this.handleOnSubmit(event)}>
            <textarea rows={10} cols={30} value={this.state.textareaValue} 
              onChange={(event) => this.handleOnChange(event)}></textarea>
            <br/>
            <input type="submit" value="Save"/>
          </form>
        </div>
      </div>
    );
  }
}

export default MachineTable