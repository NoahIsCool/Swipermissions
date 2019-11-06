import React, { Component } from 'react';
import './KeyTable.css'

class KeyTable extends Component {
    render() {
        return (
        <table className="KeyTable">

        <tbody className = "chart">
          <tr className = "Titles">
            <th className = "MName">Machine</th>
            <th className = "Keys">Key Status</th>
            <th className = "AS">Current Holder</th>
            <th>Checkout Time</th>
          </tr>
          <tr className = "r1">
              <td>Machine 1</td>
              <td>Available</td>
              <td>N/A</td>
              <td>N/A</td>
          </tr>
          <tr className = "r2">
              <td>Machine 2</td>
              <td>Checked out</td>
              <td>Arwin</td>
              <td>2:15 PM</td>
          </tr>
        </tbody>
      </table>
        )
    }
}

export default KeyTable