import React from 'react';
import PropTypes from 'prop-types';
import Freezer from './Freezer';

const FreezerList = (props) => {
  const freezerNodes = props.data.map(freezer => (
    <Freezer
      freezerNum = {freezer.freezerNum}
      freezerLoc = {freezer.freezerLoc}
      key = {freezer._id}
      id = {freezer._id}>
      timestamp = {freezer.updatedAt}
      handleUpdateFreezer = {props.handleUpdateFreezer}
      handleDeleteFreezer = {props.handleDeleteFreezer}>
      {freezer.text}
    </Freezer>
  ));

  return (
    <div>
      { freezerNodes }
    </div>
  );
}

/*What are propTypes and defaultProps?*/
/*What does shape() do*/
FreezerList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    freezerNum: PropTypes.number,
    freezerLoc: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    updatedAt: PropTypes.string,
  })),
  handleDeleteFreezer: PropTypes.func.isRequired,
  handleUpdateFreezer: PropTypes.func.isRequired,
}

FreezerList.defaultProps = {
  data: [],
}

export default FreezerList;
