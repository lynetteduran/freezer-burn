import React from 'react';
import PropTypes from 'prop-types';
import Freezer from './Freezer';

const FreezerList = (props) => {
  const freezerNodes = props.data.map(freezer => (
    <Freezer number = {freezer.number} key = {freezer._id} id = {freezer._id}>
      {freezer.text}
    </Freezer>
  ));

  return (
    <div>
      {freezerNodes}
    </div>
  );
}

/*What are propTypes and defaultProps?*/
FreezerList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    number: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
  })),
}

Freezerist.defaultProps = {
  data: [],
};

export default FreezerList;
