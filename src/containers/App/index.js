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
import { BrowserRouter, Match, Miss, Link } from 'react-router';
import Home from '../HomePage';
import Draw from '../Draw';
import NotFound from '../NotFoundPage';

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
        title="Mark Six P&L"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        iconElementLeft={
          <IconButton
            onClick={onClickMenuIcon}
          >
            <NavigationMenu />
          </IconButton>
        }
      />
      <BrowserRouter>
        <div>
          <Drawer
            docked={false}
            open={showMenu}
            onRequestChange={onClickMenuIcon}
          >
            <Link to="/">
              {(param) => (
                <MenuItem
                  onClick={(evt) => {
                    param.onClick(evt);
                    onClickMenuIcon(evt);
                  }}
                >
                  Home
                </MenuItem>
              )}
            </Link>
          </Drawer>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/draw/:id" component={Draw} />
          <Miss component={NotFound}/>
        </div>
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
