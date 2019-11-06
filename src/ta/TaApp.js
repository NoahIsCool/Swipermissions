import React, { Component } from 'react';
import TaTable from './TaTable';
import LoginButton from '../landing/LoginButton';
import './TaApp.css';
import MaterialTable from 'material-table';
import KeyTable from './KeyTable';

class TaApp extends Component {
  render() {
    return (
    <div>
      <div className = "Title">
      TA View
      </div>
      <div className= "Wrapper">
        <div className="BottomContainer">
        <MaterialTable className = "MatTable"
          columns={[
              { title: 'Name', field: 'name' },
              { title: 'ID', field: 'id', type: "numeric" },
              { title: 'Contact', field: 'email' },
              {
              title: 'Permissions',
              field: 'permissions',
              lookup: { 1: '1', 2: '2', 3: '3' },
              },
          ]}
          data={[
              { name: 'Matthew', id: 113280, email: "Matthew.M.Ramsey-1@ou.edu", permissions: 2 },
              { name: 'Arwin', id: 112450, email: "arwin@ou.edu", permissions: 1 },
              { name: 'Jake', id: 113150, email: "baerj@ou.edu", permissions: 3 },

          ]}
          title="Students"
          actions={[
            
            rowData => ({
              icon: 'edit',
              tooltip: 'Show User Info',
              onClick: (event, rowData) => {
                alert('You clicked user ' + rowData.name)
              },
            }),
           
          ]}
          options={{
            actionsColumnIndex: -1,
          }}
        />
        </div>
        <div className = "Right">
        <KeyTable></KeyTable>
        </div>
        
      </div>
    </div>
    );
  }
}

export default TaApp;
