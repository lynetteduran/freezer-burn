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
    const { freezerNum, freezerLoc, updateId } = this.state;
    if(!freezerNum || !freezerLoc) return;
    if (updateId) {
      this.submitUpdatedFreezer();
    } else {
      this.submitNewFreezer();
    }
  }

  submitNewFreezer = () => {
    const { freezerNum, freezerLoc } = this.state;
    const data = [
      ...this.state.data,
      {
        freezerNum,
        freezerLoc,
        _id: Date.now().toString(),
        updatedAt: new Date(),
        createdAt: new Date()
      },
    ];
    this.setState({ data });
    fetch('/api/freezers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ freezerNum, freezerLoc }),
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error});
      else this.setState({ freezerNum: '', freezerLoc: '', error: null });
    });
  }

  submitUpdatedFreezer = () => {
    const { freezerNum, freezerLoc, updateId } = this.state;
    fetch('/api/freezers/${updateId}', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else this.setState({ freezerNum: '', freezerLoc: '', updateId: null });
    });
  }

  onUpdateFreezer = (id) => {
    const oldFreezer = this.state.data.find(c => c._id === id);
    if (!oldFreezer) return;
    this.setState({
      freezerNum: oldFreezer.freezerNum,
      freezerLoc: oldFreezer.freezerLoc,
      updateId: id
    });
  }

  onDeleteFreezer = (id) => {
    const i = this.state.data.findIndex(c => c._id === id);
    const data = [
      ...this.state.data.slice(0, i),
      ...this.state.data.slice(i + 1),
    ];
    this.setState({ data });
    fetch('api/freezers/${id}', { method: 'DELETE' })
      .then(res => res.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="freezers">
          <h2>Freezers:</h2>
          <FreezerList
            data={this.state.data}
            handleDeleteFreezer={this.onDeleteFreezer}
            handleUpdateFreezer={this.onUpdateFreezer}
          />
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
