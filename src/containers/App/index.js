import React from 'react';
import { connect } from 'react-redux';
import {
  createStructuredSelector,
} from 'reselect';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import {
  toggleMenu,
} from './actions';
import {
  selectShowMenu,
} from './selectors';
import { BrowserRouter, Match } from 'react-router';
import Home from '../HomePage';

const AppWrapper = styled.div`
  margin: 0;
`;

function App(props) {
  const {
    showMenu,
    onClickMenuIcon,
  } = props;

  return (
    <AppWrapper>
      <Helmet
        title={`Mark Six P&L`}
      />
      <AppBar
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        iconElementLeft={
          <IconButton
            onClick={onClickMenuIcon}
          >
            <NavigationMenu />
          </IconButton>
        }
      />
      <Drawer
        docked={false}
        open={showMenu}
        onRequestChange={onClickMenuIcon}
      >
        <MenuItem>Menu Item</MenuItem>
      </Drawer>
      <BrowserRouter>
        <Match exactly pattern="/" component={Home} />
      </BrowserRouter>
    </AppWrapper>
  )
}

App.propTypes = {
  children: React.PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  showMenu: selectShowMenu(),
});

export function mapDispatchToProps(dispatch) {
  return ({
    onClickMenuIcon: (evt) => {
      if (evt !== undefined && evt.preventDefault)
        evt.preventDefault();
      dispatch(toggleMenu())
    },
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
