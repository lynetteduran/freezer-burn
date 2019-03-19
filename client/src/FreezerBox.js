import React, { Component } from 'react';
import 'whatwg-fetch';
import FreezerList from './FreezerList';
import FreezerForm from './FreezerForm';
//import DATA from './data';
import './FreezerBox.css';

class FreezerBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      freezerNum: '',
      freezerLoc: ''
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadFreezersFromServer();
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadFreezersFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadFreezersFromServer = () => {
    fetch('/api/freezers/')
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({error: res.error});
        else this.setState({data: res.data});
      });
  }

  onChangeText = (e) => {
    const newState = {...this.state};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  submitFreezer = (e) => {
    e.preventDefault();
    const { freezerNum, freezerLoc } = this.state;
    if(!freezerNum || !freezerLoc) return;
    fetch('/api/freezers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ freezerNum, freezerLoc }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error});
      else this.setState({ freezerNum: '', freezerLoc: '', error: null });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="freezers">
          <h2>Freezers:</h2>
          <FreezerList data={this.state.data} />
        </div>
        <div className="form">
          <FreezerForm
            freezerNum={this.state.freezerNum}
            freezerLoc={this.state.freezerLoc}
            handleChangeText={this.onChangeText}
            handleSubmit={this.submitFreezer}/>
        </div>
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default FreezerBox;
