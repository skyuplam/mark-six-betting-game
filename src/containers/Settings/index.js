import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DataGrid from '../../components/DataGrid';
import { injectIntl } from 'react-intl';
import {
  selectSettings,
  selectGameSettings,
} from './selectors';
import {
  fetchSettings,
} from './actions';
import {
  map,
  pick,
  mapValues,
  isNumber,
} from 'lodash';
// import msg from './messages';


class Settings extends React.PureComponent {
  componentDidMount() {
    const {
      onLoadComponent,
    } = this.props;
    onLoadComponent(this.props);
  }

  render() {
    const {
      gameSettings,
      intl,
    } = this.props;

    const formattedResults = map(gameSettings,
      (g) => mapValues(pick(g, [
        'game',
        'winningOdds',
        'drawOdds',
        'lossOdds',
        'income',
        'rebatePct',
        'commissionPct',
        'revenue',
        'profitStd',
      ]), (v, k) =>
        isNumber(v) ? intl.formatNumber(v, {
          style: 'percent',
          maximumFractionDigits: 2,
        }) : v
      ),
    );
    return (
      <div>
        <DataGrid
          results={formattedResults}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => createStructuredSelector({
  settings: selectSettings(),
  gameSettings: selectGameSettings(),
});

export const mapDispatchToProps = (dispatch) => ({
  onLoadComponent: (props) => {
    dispatch(fetchSettings());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Settings));
