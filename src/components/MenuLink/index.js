import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

const MenuLink = (props) => (
  <Link to={props.to}>
    {(param) => (
      <MenuItem
        onClick={(evt) => {
          param.onClick(evt);
          props.clickHandler(evt);
        }}
      >
        <FormattedMessage
          {...props.msg}
        />
      </MenuItem>
    )}
  </Link>
);

export default MenuLink;
