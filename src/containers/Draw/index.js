import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, FormattedDate, FormattedNumber } from 'react-intl';
import {
  isEmpty,
  toNumber,
} from 'lodash';
import NewBetForm from '../../components/NewBetForm';
import DataGrid from '../../components/DataGrid';
import BetSummary from '../../components/BetSummary';
import {
  updateCurrentDrawID,
  updateNewBet,
  newBet,
  fetchBets,
} from './actions';
import {
  selectCurrentDraw,
  selectBetAmount,
  selectGameType,
  selectBetOn,
  selectBets,
  selectBetsSummary,
} from './selectors';
import msg from './messages';
import {
  gameTypes,
  gameBets
} from './games';


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
      betAmount,
      gameType,
      betOn,
      bets,
      betsStat,
    } = this.props;
    const {
      formatMessage,
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
          betOnNumbers={gameBets(gameType)}
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
});

const mapDispatchToProps = (dispatch) => ({
  onLoadComponent: (props) => {
    dispatch(updateCurrentDrawID(props.params.id));
    dispatch(fetchBets());
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
  onSubmitNewBet: () => dispatch(newBet()),
});

Draw = injectIntl(Draw);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Draw);
