import React, { Component } from 'react';
import FreezerList from './FreezerList';
import FreezerForm from './FreezerForm';
import DATA from './data';
import './FreezerBox.css';

class FreezerBox extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="container">
        <div className="freezers">
          <h2>Freezers:<h2>
          <FreezerList data={DATA} />
        </div>
        <div className="form">
          <FreezerForm />
        </div>
      </div>
    );
  }
}

export default FreezerBox;
