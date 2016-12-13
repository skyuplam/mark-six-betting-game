import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DataGrid from '../../components/DataGrid';
import { injectIntl, FormattedNumber } from 'react-intl';
import {
  selectSettings,
} from './selectors';
import msg from './messages';


class Settings extends React.PureComponent {
  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = (state) => createStructuredSelector({
  settings: selectSettings(),
});

export default connect(
  mapStateToProps,
)(injectIntl(Settings));
