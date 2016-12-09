import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { format } from 'date-fns';

const Button = (props) => (
  <FlatButton
    label={format(props.data, 'MM/DD/YYYY')}
    primary={true}
  />
);

export default Button;
