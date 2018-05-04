import React from 'react';
import PropTypes from 'prop-types';
import Freezer from './Freezer';

const FreezerList = (props) => {
  const freezerNodes = props.data.map(freezer => (
    <Freezer number= {freezer.freezerNum} key= {freezer._id} id= {freezer._id}>
      {freezer.freezerNum}
      {freezer.freezerLoc}
    </Freezer>
  ));

  return (
    <div>
      {freezerNodes}
    </div>
  );
}

/*What are propTypes and defaultProps?*/
/*What does shape() do*/
FreezerList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    freezerNum: PropTypes.string,
    id: PropTypes.string,
    freezerLoc: PropTypes.string,
  })),
}

FreezerList.defaultProps = {
  data: [],
};

export default FreezerList;
