import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, FormattedDate, FormattedNumber } from 'react-intl';
import {
  isEmpty,
  toNumber,
  map,
} from 'lodash';
import styled from 'styled-components';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import NewBetForm from '../../components/NewBetForm';
import DataGrid from '../../components/DataGrid';
import BetSummary from '../../components/BetSummary';
import {
  updateCurrentDrawID,
  updateNewBet,
  newBet,
  fetchBets,
  updateCapital,
} from './actions';
import {
  fetchSettings,
} from '../Settings/actions';
import {
  selectCurrentDraw,
  selectBetAmount,
  selectGameType,
  selectBetOn,
  selectBets,
  selectBetsSummary,
  selectProfitLoss,
  selectCapital,
  selectProfitLossPerNumSum,
  selectProfitLossPerGame,
} from './selectors';
import msg from './messages';
import {
  gameTypes,
  gameBets
} from './games';

const Wrapper = styled(Paper)`
  margin: 4px 8px;
  padding: 0 8px 16px 16px;
`;

export class Draw extends React.PureComponent {
  componentDidMount() {
    const {
      onLoadComponent,
    } = this.props;
    onLoadComponent(this.props);
  }

  render() {
    const {
      onChangeNewBetAmount,
      onChangeNewBetGameType,
      onChangeNewBetBetOn,
      onSubmitNewBet,
      onChangeCapital,
      betAmount,
      gameType,
      betOn,
      bets,
      betsStat,
      profitLoss,
      capital,
    } = this.props;
    const {
      formatMessage,
      formatNumber,
    } = this.props.intl;

    const betSummaryColMeta = [{
      columnName: 'sum',
      displayName: formatMessage(msg.sum),
      customComponent: (props) => (
        <FormattedNumber
          value={props.data}
          maximumFractionDigits={2}
        />
      ),
    }, {
      columnName: 'min',
      displayName: formatMessage(msg.min),
      customComponent: (props) => (
        <FormattedNumber
          value={props.data}
          maximumFractionDigits={2}
        />
      ),
    }, {
      columnName: 'max',
      displayName: formatMessage(msg.max),
      customComponent: (props) => (
        <FormattedNumber
          value={props.data}
          maximumFractionDigits={2}
        />
      ),
    }, {
      columnName: 'mean',
      displayName: formatMessage(msg.mean),
      customComponent: (props) => (
        <FormattedNumber
          value={props.data}
          maximumFractionDigits={2}
        />
      ),
    }, {
      columnName: 'count',
      displayName: formatMessage(msg.count),
      customComponent: (props) => (
        <FormattedNumber
          value={props.data}
        />
      ),
    }];

    const betsColMeta = [
      {
        columnName: 'bettedAt',
        displayName: formatMessage(msg.bettedAt),
        customComponent: (props) => (
          <FormattedDate
            value={props.data}
          />
        ),
      },
      {
        columnName: 'gameType',
        displayName: formatMessage(msg.gameTypeLabel),
      },
      {
        columnName: 'betAmount',
        displayName: formatMessage(msg.betAmountLabel),
        customComponent: (props) => (
          <FormattedNumber
            value={props.data}
            maximumFractionDigits={2}
          />
        ),
      },
      {
        columnName: 'betOn',
        displayName: formatMessage(msg.betOnLabel),
      },
    ];


    return (
      <div>
        <h1>Draw</h1>
        <NewBetForm
          formHeading={formatMessage(msg.formHeading)}
          betAmount={betAmount}
          betAmountLabel={formatMessage(msg.betAmountLabel)}
          betAmountHintText={formatMessage(msg.betAmountHintText)}
          betHandler={onChangeNewBetAmount}
          gameTypeLabel={formatMessage(msg.gameTypeLabel)}
          gameTypes={gameTypes}
          gameType={gameType}
          gameTypeHandler={(evt, key, payload) => onChangeNewBetGameType(payload)}
          betOnLabel={formatMessage(msg.betOnLabel)}
          betOn={betOn}
          betOnNumbers={gameBets(gameType, (t) => formatMessage(msg[t]))}
          betOnHandler={(evt, key, payload) => onChangeNewBetBetOn(payload)}
          submitButtonLabel={formatMessage(msg.submitButtonLabel)}
          submitHandler={onSubmitNewBet}
        />
        {isEmpty(bets) ? null :
          <div>
            <BetSummary
              header={'Bet Summary'}
              results={betsStat}
              columnMetadata={betSummaryColMeta}
              bodyHeight={100}
              useFixedHeader
              enableInfiniteScroll
            />
            <DataGrid
              header={'Bet Data'}
              results={bets}
              columns={[
                'bettedAt',
                'gameType',
                'betAmount',
                'betOn',
              ]}
              columnMetadata={betsColMeta}
              bodyHeight={100}
              useFixedHeader
              enableInfiniteScroll
            />
            <DataGrid
              header={'Profit and Loss'}
              results={map(profitLoss, (v, k) => ({
                term: formatMessage(msg[k]),
                value: k.substr(-4, 4) === 'Rate' ? formatNumber(v, {
                  style: 'percent',
                  maximumFractionDigits: 2,
                }) : formatNumber(v),
              }))}
              bodyHeight={260}
              useFixedHeader
              enableInfiniteScroll
            />
            <Wrapper>
              <TextField
                floatingLabelText={'Capital'}
                type="number"
                defaultValue={capital}
                onChange={onChangeCapital}
              /><br />
              <p>Capital: {formatNumber(capital)}</p>
              <p>Pool 1 SD Profit: {
                formatNumber(capital + profitLoss.above1SD, {
                  maximumFractionDigits: 2,
              })}</p>
            <p>Pool 2 SD Profit: {
              formatNumber(capital + profitLoss.above2SD, {
                maximumFractionDigits: 2,
            })}</p>
            </Wrapper>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  draw: selectCurrentDraw(),
  betAmount: selectBetAmount(),
  gameType: selectGameType(),
  betOn: selectBetOn(),
  bets: selectBets(),
  betsStat: selectBetsSummary(),
  profitLoss: selectProfitLoss(),
  capital: selectCapital(),
  perNum: selectProfitLossPerNumSum(),
  perGame: selectProfitLossPerGame(),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadComponent: (props) => {
    dispatch(updateCurrentDrawID(props.params.id));
    dispatch(fetchBets());
    dispatch(fetchSettings());
  },
  onChangeNewBetAmount: (evt) => dispatch(updateNewBet({
    betAmount: toNumber(evt.target.value),
  })),
  onChangeNewBetGameType: (gameType) => dispatch(updateNewBet({
    gameType: gameType,
  })),
  onChangeNewBetBetOn: (betOn) => dispatch(updateNewBet({
    betOn: betOn,
  })),
  onChangeCapital: (evt) => dispatch(updateCapital(toNumber(evt.target.value))),
  onSubmitNewBet: () => dispatch(newBet()),
});

Draw = injectIntl(Draw);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Draw);
