import React from 'react';
import Proptypes from 'prop-types';

const FreezerForm = props => (
  <form onSubmit= {prop.submitFreezer}>
    <input type= "text" name= "freezer-num" placeholder= "freezer number" value= {props.freezerNum} onChange= {props.handleChangeText} />

    <input type= "text" name= "freezer-location" placeholder= "freezer location" value= {props.freezerLoc}
    onChange={props.handleTextChange}/>

    <button type= "submit">Submit</button>
  </form>
);

FreezerForm.propTypes = {
  submitFreezer: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  freezerLoc: PropTypes.string,
  freezerNum: PropTypes.string,
}

FreezerForm.defaultProps = {
  freezerLoc: '',
  freezerNum: '',
}

export default FreezerForm;
