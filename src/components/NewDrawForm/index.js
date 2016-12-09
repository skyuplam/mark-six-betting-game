import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import Subheader from 'material-ui/Subheader';


const FormWrapper = styled(Paper)`
  padding: 0;
  margin: 0 8px;
`;
const InputWrapper = styled.div`
  padding: 0 16px;
`;

const NewDrawForm = ({
  locale = 'en-US',
  formHeading = 'New Draw',
  drawDateChangeHandler,
  drawDateHintText = 'Draw Date',
  nextDrawNumberChangeHandler,
  nextDrawNumberLabel = 'Next Draw Number',
  nextDrawNumberHintText = 'Next Draw Number',
  newDrawLabel = 'Submit',
  newDrawButtonHandler,
}) => {
  return (
    <FormWrapper>
      <Subheader>{formHeading}</Subheader>
      <InputWrapper>
        <DatePicker
          hintText={drawDateHintText}
          onChange={(evt, date) => drawDateChangeHandler(date)}
          floatingLabelText={drawDateHintText}
          defaultDate={new Date()}
          locale={locale}
          autoOk
        />
        <TextField
          floatingLabelText={nextDrawNumberLabel}
          hintText={nextDrawNumberHintText}
          onChange={nextDrawNumberChangeHandler}
        />
        <FlatButton
          label={newDrawLabel}
          onClick={newDrawButtonHandler}
          primary
        />
      </InputWrapper>
    </FormWrapper>
  );
}

NewDrawForm.propTypes = {
  locale: React.PropTypes.string,
  formHeading: React.PropTypes.string,
  drawDateChangeHandler: React.PropTypes.func.isRequired,
  drawDateHintText: React.PropTypes.string,
  nextDrawNumberChangeHandler: React.PropTypes.func.isRequired,
  nextDrawNumberLabel: React.PropTypes.string,
  nextDrawNumberHintText: React.PropTypes.string,
  newDrawLabel: React.PropTypes.string,
  newDrawButtonHandler: React.PropTypes.func.isRequired,
};

export default NewDrawForm;
