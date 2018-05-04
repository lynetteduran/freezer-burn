import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

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
      </div>
    </div>
  </div>
);

Freezer.propTypes = {
  freezerNum: PropTypes.string.isRequired,
  freezerLoc: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
}

export default Freezer;
