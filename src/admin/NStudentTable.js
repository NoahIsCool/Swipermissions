import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import './react-bootstrap-table2.min.css' ;
import React, { Component } from 'react';

//import './bootstrap.css'

var searching = false;
const { SearchBar } = Search;
const columns = [{
  dataField: 'name',
  text: 'Name',
  formatter: nameSetter
}, {
  dataField: 'email',
  text: 'Contact'
}, {
  text: 'Mill',
  formatter: cellFormatter1
},
{
    text: 'Lathe',
    formatter: cellFormatter2
},
{
    text: 'CNC Mill',
    formatter: cellFormatter3
},
{
    text: 'CNC Router',
    formatter: cellFormatter4
},
{
    text: 'CNC Plasma',
    formatter: cellFormatter5
},
{
    text: 'Remove',
    formatter: deleteFormatter
}];

function nameSetter(cell, row, rowIndex)
{
  localStorage.setItem("student" + rowIndex, JSON.stringify(cell));
  //alert(rowIndex + "?" + JSON.parse(localStorage.getItem("student" + rowIndex)));
  return (
    cell
  )
    //alert(cell)
    //return (
      //<div>cell</div>
      
    //)
}

function saveCheck(col, toCheck, name)
{
    //var spot = row + "-" + column;
    //alert(name);

    localStorage.setItem(name + "" + col, JSON.stringify(!toCheck));
    //alert("reached" + spot);
}

function deleter(rowIndex)
{
  var oldData = JSON.parse(localStorage.getItem('data'));
  oldData.splice(rowIndex, 1);
  localStorage.setItem("data", JSON.stringify(oldData));
  var tName = JSON.parse(localStorage.getItem("student" + rowIndex));
  alert(tName);
  for (var i = 1; i < 6; i++)
  {
      localStorage.setItem(tName + "" + i, JSON.stringify(false));
  }
}

function deleteFormatter(cell, row, rowIndex)
{
    return (
      <button className = "Deleter" onClick= {() => deleter(rowIndex)}>Delete</button>
      //<button className = "Deleter" onClick= {props.onClick}>Delete</button>

    )
}

function cellFormatter1(cell,row, rowIndex) {
    //alert(rowIndex + "-" + 1);
    //var spot = rowIndex + "-" + 1;
    
    var toCheck = false;

    var tName = "";
    
    if (!(JSON.parse(localStorage.getItem("student" + rowIndex)) == undefined))
    {
        tName = JSON.parse(localStorage.getItem("student" + rowIndex));
        //alert(tName);
    }

    if (!(JSON.parse(localStorage.getItem(tName + "" + 1)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem(tName + "" + 1));
        //alert(toCheck);
    }

    if (toCheck)
    {
        return (
            <input
                type="checkbox"
                checked
                onClick= {() => saveCheck(1, toCheck, tName)}
                />
        );
    }
    

  return (
    <input type="checkbox" onClick= {() => saveCheck(1, toCheck, tName)}/>
  );
}

function cellFormatter2(cell, row, rowIndex) {
  
    var spot = rowIndex + "-" + 2;
    var toCheck = false;

    var tName = "";
    
    if (!(JSON.parse(localStorage.getItem("student" + rowIndex)) == undefined))
    {
        tName = JSON.parse(localStorage.getItem("student" + rowIndex));
        //alert(tName);
    }

    if (!(JSON.parse(localStorage.getItem(tName + "" + 2)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem(tName + "" + 2));
        //alert(toCheck);
    }

    if (toCheck)
    {
        return (
            <input
                type="checkbox"
                checked
                onClick= {() => saveCheck(2, toCheck, tName)}
                />
        );
    }
    

  return (
    <input type="checkbox" onClick= {() => saveCheck(2, toCheck, tName)}/>
  );
}

function cellFormatter3(cell, row, rowIndex) {
  
    var spot = rowIndex + "-" + 3;
    var toCheck = false;

    var tName = "";
    
    if (!(JSON.parse(localStorage.getItem("student" + rowIndex)) == undefined))
    {
        tName = JSON.parse(localStorage.getItem("student" + rowIndex));
        //alert(tName);
    }

    if (!(JSON.parse(localStorage.getItem(tName + "" + 3)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem(tName + "" + 3));
        //alert(toCheck);
    }

    if (toCheck)
    {
        return (
            <input
                type="checkbox"
                checked
                onClick= {() => saveCheck(3, toCheck, tName)}
                />
        );
    }
    

  return (
    <input type="checkbox" onClick= {() => saveCheck(3, toCheck, tName)}/>
  );
}

function cellFormatter4(cell, row, rowIndex) {
  
    var spot = rowIndex + "-" + 4;
    var toCheck = false;

    var tName = "";
    
    if (!(JSON.parse(localStorage.getItem("student" + rowIndex)) == undefined))
    {
        tName = JSON.parse(localStorage.getItem("student" + rowIndex));
        //alert(tName);
    }

    if (!(JSON.parse(localStorage.getItem(tName + "" + 4)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem(tName + "" + 4));
        //alert(toCheck);
    }

    if (toCheck)
    {
        return (
            <input
                type="checkbox"
                checked
                onClick= {() => saveCheck(4, toCheck, tName)}
                />
        );
    }
    

  return (
    <input type="checkbox" onClick= {() => saveCheck(4, toCheck, tName)}/>
  );
}

function cellFormatter5(cell, row, rowIndex) {
  
    var spot = rowIndex + "-" + 5;
    var toCheck = false;
    var tName = "";
    
    if (!(JSON.parse(localStorage.getItem("student" + rowIndex)) == undefined))
    {
        tName = JSON.parse(localStorage.getItem("student" + rowIndex));
        //alert(tName);
    }

    if (!(JSON.parse(localStorage.getItem(tName + "" + 5)) == undefined))
    {
        toCheck = JSON.parse(localStorage.getItem(tName + "" + 5));
        //alert(toCheck);
    }

    if (toCheck)
    {
        return (
            <input
                type="checkbox"
                checked
                onClick= {() => saveCheck(5, toCheck, tName)}
                />
        );
    }
    

  return (
    <input type="checkbox" onClick= {() => saveCheck(5, toCheck, tName)}/>
  );
}

class NStudentTable extends Component{
    constructor(props){
        super(props);
        //localStorage.clear();
        var oldData = [];

        if (!(JSON.parse(localStorage.getItem('data')) == undefined))
        {
            oldData = JSON.parse(localStorage.getItem('data'));
        }

        this.state = 
        {
            data: oldData,
            showPopup: false,
        };

        this.togglePopup = this.togglePopup.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    togglePopup()
    {
        this.setState(
            {
                showPopup: !this.state.showPopup
            }
        );
    }

    handleSearch()
    {
      searching = true;
      alert('searching');
    }

    render() {
        return(
            <ToolkitProvider className= "myTable"
                bootstrap4 = {true}
                keyField="name"
                data= {this.state.data}
                
                columns={ columns }
                search
                >
                {
                    props => (
                    <div className = "problem">
                        <div className = "options">
                        <SearchBar { ...props.searchProps } onClick= {this.handleSearch.bind(this)} />
                        <button className= "hide">&nbsp;</button>
                        </div>

                        <BootstrapTable 
                         bootstrap4 = {true}
                        { ...props.baseProps }
                        />
                        <button onClick= {this.togglePopup.bind(this)}>Add Student</button>
                        {this.state.showPopup ? 
                            <AddPrompt 
                                data = {this.state.data}
                                closePopup={this.togglePopup.bind(this)}
                            />
                            : null
                        }
                        <button>Read Excel</button>
                        

                    </div>
                        
                    
                        
                    
                    )
                }
            </ToolkitProvider>
        )
    }
}

class AddPrompt extends NStudentTable {
    constructor(props) {
      super(props);
      this.state = 
      {
        data: this.props.data,
        newName: '',
        newContact: '',
        //id: this.props.id,
      };
  
      this.handleChangeUser = this.handleChangeUser.bind(this);
      this.handleChangeContact = this.handleChangeContact.bind(this);

  
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeUser(event) {
      this.setState({newName: event.target.value});
    }

    handleChangeContact(event) {
        this.setState({newContact: event.target.value});
    }
  
    handleSubmit(event) {
      if (this.state.newName !== '')
      {
        var newArray = this.state.data.slice();   
        newArray.push({ name: this.state.newName, email: this.state.newContact,});   
        this.setState({data:newArray});
        localStorage.setItem('data', JSON.stringify(newArray));
        
      }
      else if (this.state.newName == '')
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
            Add a User
              <form className='SignForm' onSubmit={this.handleSubmit}>
                New User's Name:
                <label className='UserBar'>
                  
                  <input type="text" value={this.state.newName} onChange={this.handleChangeUser} />
                </label>
                Contact Info:
                <label className='PasswordBar'>
                    
                    <input type="text" value={this.state.newContact} onChange={this.handleChangeContact} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            </div>
  
          </div>
   
        </div>
      );
    }
  }

export default NStudentTable;

