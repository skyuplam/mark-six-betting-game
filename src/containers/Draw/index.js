import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import NewBetForm from '../../components/NewBetForm';
import {
  updateCurrentDrawID,
  updateNewBetAmount,
  updateNewBetGameType,
  newBet,
} from './actions';
import {
  selectCurrentDraw,
} from './selectors';
import msg from './messages';


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
          gameTypes={[]}
          gameTypeHandler={(evt, key, payload) => onChangeNewBetGameType(payload)}
          submitButtonLabel={formatMessage(msg.submitButtonLabel)}
          submitHandler={onSubmitNewBet}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  draw: selectCurrentDraw(),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadComponent: (props) => dispatch(updateCurrentDrawID(props.params.id)),
  onChangeNewBetAmount: (evt) => dispatch(updateNewBetAmount(evt.target.value)),
  onChangeNewBetGameType: (gameTypeId) => dispatch(updateNewBetGameType(gameTypeId)),
  onSubmitNewBet: () => dispatch(newBet()),
});

Draw = injectIntl(Draw);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Draw);
