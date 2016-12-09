import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, FormattedDate } from 'react-intl';
import {
  isEmpty,
} from 'lodash';
import NewBetForm from '../../components/NewBetForm';
import DataGrid from '../../components/DataGrid';
import {
  updateCurrentDrawID,
  updateNewBetAmount,
  updateNewBetGameType,
  newBet,
  fetchBets,
} from './actions';
import {
  selectCurrentDraw,
  selectGameType,
  selectBets,
} from './selectors';
import msg from './messages';
import { gameTypes } from './games';


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
      onSubmitNewBet,
      gameType,
      bets,
    } = this.props;
    const {
      formatMessage,
    } = this.props.intl;
    return (
      <div>
        <h1>Draw</h1>
        <NewBetForm
          formHeading={formatMessage(msg.formHeading)}
          betAmountLabel={formatMessage(msg.betAmountLabel)}
          betAmountHintText={formatMessage(msg.betAmountHintText)}
          betHandler={onChangeNewBetAmount}
          gameTypeLabel={formatMessage(msg.gameTypeLabel)}
          gameTypes={gameTypes}
          gameType={gameType}
          gameTypeHandler={(evt, key, payload) => onChangeNewBetGameType(payload)}
          submitButtonLabel={formatMessage(msg.submitButtonLabel)}
          submitHandler={onSubmitNewBet}
        />
        {isEmpty(bets) ? null :
          <DataGrid
            results={bets}
            columns={[
              'bettedAt',
              'gameType',
              'betAmount',
            ]}
            columnMetadata={[
              {
                columnName: 'bettedAt',
                displayName: formatMessage(msg.bettedAt),
                customComponent: (props) => (
                  <FormattedDate
                    value={props.data}
                  />
                ),
              },
            ]}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  draw: selectCurrentDraw(),
  gameType: selectGameType(),
  bets: selectBets(),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadComponent: (props) => {
    dispatch(updateCurrentDrawID(props.params.id));
    dispatch(fetchBets());
  },
  onChangeNewBetAmount: (evt) => dispatch(updateNewBetAmount(evt.target.value)),
  onChangeNewBetGameType: (gameTypeId) => dispatch(updateNewBetGameType(gameTypeId)),
  onSubmitNewBet: () => dispatch(newBet()),
});

Draw = injectIntl(Draw);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Draw);
