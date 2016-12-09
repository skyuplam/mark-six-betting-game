import React from 'react';
import Checkbox from 'material-ui/Checkbox';


const Result = (props) => (
  <Checkbox
    checked={props.data}
  />
);

export default Result;
