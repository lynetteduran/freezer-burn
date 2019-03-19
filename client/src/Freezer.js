import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

const Freezer = props => (
  <div className= "singleFreezer">
    <div className= "textContent">
      <div className= "singleFreezerContent">
        <h3>freezer</h3>
        <h3>{props.freezerNum}</h3>
        <h3>{props.freezerLoc}</h3>
        <ReactMarkdown source= {props.children} />
      </div>
      <div className= "singleFreezerButtons">
        <span className="time">{moment(props.timestamp).fromNow()}</span>
        <a onClick={() => { props.handleUpdateFreezer(props.id) }}>update</a>
        <a onClick={() => {props.handleDeleteFreezer(props.id) }}>delete</a>
      </div>
    </div>
  </div>
);

Freezer.propTypes = {
  freezerNum: PropTypes.number.isRequired,
  freezerLoc: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  handleUpdateFreezer: PropTypes.func.isRequired,
}

export default Freezer;
