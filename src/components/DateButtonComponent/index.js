import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { format } from 'date-fns';
import { Link } from 'react-router';

const Button = (props) => (
  <Link to={`/draw/${props.rowData._id}`}>
    {({onClick}) => (
      <RaisedButton
        label={format(props.data, 'MM/DD/YYYY')}
        onClick={onClick}
        fullWidth
      />
    )}
  </Link>
);

export default Button;
