import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { format } from 'date-fns';
import { Link } from 'react-router';

const Button = (props) => (
  <Link to={`/draw/${props.rowData._id}`}>
    {({onClick}) => (
      <FlatButton
        label={format(props.data, 'MM/DD/YYYY')}
        onClick={onClick}
        primary={true}
      />
    )}
  </Link>
);

export default Button;
