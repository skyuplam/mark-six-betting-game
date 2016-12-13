import React from 'react';
import { connect } from 'react-redux';
import {
  createStructuredSelector,
} from 'reselect';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { BrowserRouter, Match, Miss } from 'react-router';

import {
  toggleMenu,
} from './actions';
import {
  selectShowMenu,
} from './selectors';
import MenuLink from '../../components/MenuLink';
import Home from '../HomePage';
import Draw from '../Draw';
import Settings from '../Settings';
import NotFound from '../NotFoundPage';
import msg from './messages';


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
            <MenuLink
              to="/"
              clickHandler={onClickMenuIcon}
              msg={msg.home}
            />
            <MenuLink
              to="/settings"
              clickHandler={onClickMenuIcon}
              msg={msg.settings}
            />
          </Drawer>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/draw/:id" component={Draw} />
          <Match pattern="/settings" component={Settings} />
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
