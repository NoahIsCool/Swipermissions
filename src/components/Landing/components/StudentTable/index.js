import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';
import './react-bootstrap-table2.min.css';
import React, {Component} from 'react';
import {ExcelButton} from './excel';
import {compose} from 'recompose';
import {withRouter} from 'react-router-dom';

import {withFirebase} from '../../../Firebase';

//import './bootstrap.css'

const {SearchBar} = Search;

class NStudentTable extends Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                dataField: 'FirstName',
                text: 'First Name'
            }, {
                dataField: 'LastName',
                text: 'Last Name'
            }, {
                dataField: 'Email',
                text: 'Contact'
            }, {
                text: ' Mill ',
                formatter: this.cellFormatter1
            }, {
                text: ' Lathe ',
                formatter: this.cellFormatter2
            }, {
                text: 'CNC\n Mill ',
                formatter: this.cellFormatter3
            }, {
                text: 'CNC\n Router ',
                formatter: this.cellFormatter4
            }, {
                text: 'CNC\n Plasma ',
                formatter: this.cellFormatter5
            }, {
                text: 'Remove',
                formatter: this.cellFormatter6
            }
        ];

        //localStorage.clear();
        var oldData = [];

        if (!(JSON.parse(localStorage.getItem('data')) === undefined)) {
            console.log(oldData)
            oldData = JSON.parse(localStorage.getItem('data'));
        }

        this.state = {
            data: oldData,
            showPopup: false
        };

        this.togglePopup = this
            .togglePopup
            .bind(this);

        this
            .props
            .firebase
            .readStudentsOnce()
            .then((value) => {
                if (value) 
                    this.parseData(value)
            })

    }

    parseData = (data) => {

        console.log(data)

        if(Array.isArray(data)) {
            for(let i=0; i<data.length; i++){
                if (data[i]) {
                    data[i] = {
                        ...data[i],
                        mill: data[i].mill, 
                        lathe: data[i].lathe, 
                        cncmill: data[i].cncmill,
                        cncrouter: data[i].cncrouter,
                        cncplasma: data[i].cncplasma,
                        id: i
                    }
                    for (var att in data[i]) {
                        if (data[i][att] === undefined) {
                          data[i][att] = false
                        }
                    }
                }
            }
            this.setState({data: data})
        }
        else {
            let parsed = []
            for(let key in data) {
                let x = {
                    ...data[key],
                    id: key
                }
                parsed.push(x)
            }
            this.setState({data: parsed})
            console.log(data)
        }
        
    }

    togglePopup()
    {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    handleCheck = (row, machine) => {
      let fbID = this.state.data.indexOf(row)+1
      let updatedUser = { ...row }
      
 
      updatedUser[machine] = !updatedUser[machine]
      console.log(fbID)
      console.log(updatedUser)
      let newData = this.state.data.slice()
      newData[fbID-1] = updatedUser
      this.props.firebase.updateUser(updatedUser, fbID).then(
        this.setState({data: newData})

      )
    }

    cellFormatter1 = (cell, row, rowIndex) => {
      let trueRow = this.state.data.indexOf(row)
      return (<input type="checkbox" checked={this.state.data[trueRow].mill} onClick={() => this.handleCheck(row, "mill")}/>);
    }

    cellFormatter2 = (cell, row, rowIndex) => {
      let trueRow = this.state.data.indexOf(row)
      return (<input type="checkbox" checked={this.state.data[trueRow].lathe} onClick={() => this.handleCheck(row, "lathe")}/>);
    }

    cellFormatter3 = (cell, row, rowIndex) => {
      let trueRow = this.state.data.indexOf(row)
      return (<input type="checkbox" checked={this.state.data[trueRow].cncmill} onClick={() => this.handleCheck(row, "cncmill")}/>);
    }

    cellFormatter4 = (cell, row, rowIndex) => {
      let trueRow = this.state.data.indexOf(row)
      return (<input type="checkbox" checked={this.state.data[trueRow].cncrouter} onClick={() => this.handleCheck(row, "cncrouter")}/>);
    }

    cellFormatter5 = (cell, row, rowIndex) => {
      let trueRow = this.state.data.indexOf(row)
      return (<input type="checkbox" checked={this.state.data[trueRow].cncplasma} onClick={() => this.handleCheck(row, "cncplasma")}/>);
    }

    cellFormatter6 = (cell, row, rowIndex) => {
      return (<button className="Deleter" onClick={() => this.deleteStudent(row)}>Delete</button>);
    }

    deleteStudent = (row) => {
        console.log(this.state.data)
        let fbID = this.state.data.indexOf(row)
        console.log(fbID)
        let newData = this.state.data.slice()
        newData.splice(fbID, 1)
        this.props.firebase.removeUser(row.id).then(
            this.setState({data: newData})
        )
    }

    addStudent = (FirstName, LastName, Email, num) => {
        this.props.firebase.addUser(FirstName, LastName, Email, num)
    }

    render() {
        return (
            <ToolkitProvider
                className="myTable"
                bootstrap4={true}
                keyField="Name"
                data={this.state.data}
                columns={this.columns}
                search>
                {props => (
                    <div className="problem">
                        <div className="options">
                            <SearchBar { ...props.searchProps }/>
                            <button className="hide">&nbsp;</button>
                        </div>

                        <BootstrapTable bootstrap4={true} { ...props.baseProps }/>
                        <button
                            onClick={this
                            .togglePopup
                            .bind(this)}>Add Student</button>
                        {this.state.showPopup
                            ? <AddPrompt
                                    data={this.state.data}
                                    add={this.addStudent}
                                    closePopup={this
                                    .togglePopup
                                    .bind(this)}/>
                            : null
}
                        <ExcelButton/>
                    </div>
                )
}
            </ToolkitProvider>
        )
    }
}

class AddPrompt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            id: '',
            newContact: '',
            //id: this.props.id,
        };

        this.handleChangeFirst = this
            .handleChangeFirst
            .bind(this);
        
        this.handleChangeLast = this
            .handleChangeLast
            .bind(this);
        this.handleChangeID = this
            .handleChangeID
            .bind(this);
        this.handleChangeContact = this
            .handleChangeContact
            .bind(this);

        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleChangeFirst(event) {
        this.setState({firstName: event.target.value});
    }

    handleChangeLast(event) {
        this.setState({lastName: event.target.value});
    }

    handleChangeID(event) {
        this.setState({id: event.target.value});
    }

    handleChangeContact(event) {
        this.setState({newContact: event.target.value});
    }

    handleSubmit(event) {
        this.props.add(this.state.firstName, this.state.lastName, this.state.newContact, this.state.id)
    }

    render() {
        return (
            <div className='Login'>
                <div className='Login_inner'>
                    <div className='Close_bar'>
                        <button className='closer' onClick={this.props.closePopup}>X</button>
                    </div>

                    <div className='SignIn'>
                        Add a User
                        <form className='SignForm' onSubmit={this.handleSubmit}>
                            New User's First Name:
                            <label className='UserBar'>

                                <input type="text" value={this.state.firstName} onChange={this.handleChangeFirst}/>
                            </label>
                            New User's Last Name:
                            <label className='UserBar'>

                                <input type="text" value={this.state.lastName} onChange={this.handleChangeLast}/>
                            </label>
                            New User's Student ID:
                            <label className='UserBar'>

                                <input type="text" value={this.state.id} onChange={this.handleChangeID}/>
                            </label>
                            New User's Email:
                            <label className='PasswordBar'>

                                <input
                                    type="text"
                                    value={this.state.newContact}
                                    onChange={this.handleChangeContact}/>
                            </label>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>

                </div>

            </div>
        );
    }
}

const StudentTable = compose(withRouter, withFirebase,)(NStudentTable);

export {StudentTable};
