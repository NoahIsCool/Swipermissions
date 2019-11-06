import MachineTable from './MachineTable';
import React, { Component } from 'react';
import './AdminApp.css';
import NStudentTable from "./NStudentTable";

function clearStorage()
{
    localStorage.clear();
}

class AdminApp extends Component
{
    render() {
        return (
            <div className = "Wrapper">
                <div className = "Banner">
                Admin View
                <button onClick= {clearStorage}>Clear Storage</button>
                </div>
                <div className = "Top">
                    <div className = "StudentTable">
                        <NStudentTable></NStudentTable>
                        *Do not delete a student while using the search bar, as this will cause errors

                    </div>

                    <div className = "MachineTable">
                    <MachineTable></MachineTable>
                    </div>


                </div>
            </div>

            
        )
    }
}

export default AdminApp