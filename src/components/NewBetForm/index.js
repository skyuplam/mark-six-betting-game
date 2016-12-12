import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {
  range,
  isUndefined,
  isEmpty,
  every,
} from 'lodash';


const FormWrapper = styled(Paper)`
  padding: 0;
  margin: 0 8px;
`;
const InputWrapper = styled.div`
  padding: 0 8px 16px 16px;
`;

const NewBetForm = ({
  formHeading = 'New Bet',
  betAmount,
  betAmountLabel = 'Bet Amount',
  betAmountHintText = '10,000.00',
  betHandler = () => {},
  gameTypeLabel = 'Game Type',
  gameTypes = [{ _id: 1, desc: 'Type' }],
  gameType,
  gameTypeHandler = () => {},
  betOnLabel = 'Bet On',
  betOn,
  betOnNumbers = range(1, 50),
  betOnHandler = () => {},
  submitButtonLabel = 'Submit',
  submitHandler = () => {},
}) => (
  <FormWrapper>
    <Subheader>
      {formHeading}
    </Subheader>
    <InputWrapper>
      <TextField
        floatingLabelText={betAmountLabel}
        hintText={betAmountHintText}
        onChange={betHandler}
        type="number"
      /><br />
      <SelectField
        floatingLabelText={gameTypeLabel}
        value={gameType}
        onChange={gameTypeHandler}
      >
        {gameTypes.map((g) => (
          <MenuItem key={g.type} value={g.type} primaryText={g.type} />
        ))}
      </SelectField>
      <SelectField
        floatingLabelText={betOnLabel}
        value={betOn}
        onChange={betOnHandler}
      >
        {betOnNumbers.map((g) => (
          <MenuItem key={g} value={g} primaryText={g} />
        ))}
      </SelectField>
      <FlatButton
        label={submitButtonLabel}
        onClick={submitHandler}
        disabled={!every([betAmount, betOn, gameType], Boolean)}
        primary
      />
    </InputWrapper>
  </FormWrapper>
);

NewBetForm.propTypes = {
  formHeading: React.PropTypes.string,
  betAmountLabel: React.PropTypes.string,
  betAmountHintText: React.PropTypes.string,
  betHandler: React.PropTypes.func,
  gameTypeLabel: React.PropTypes.string,
  gameTypes: React.PropTypes.array,
  gameType: React.PropTypes.any,
  gameTypeHandler: React.PropTypes.func,
  betOnLabel: React.PropTypes.string,
  betOn: React.PropTypes.any,
  betOnNumbers: React.PropTypes.array,
  betOnHandler: React.PropTypes.func,
  submitButtonLabel: React.PropTypes.string,
  submitHandler: React.PropTypes.func,
};


export default NewBetForm;
