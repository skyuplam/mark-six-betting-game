import React from 'react';
import { connect } from 'react-redux';
import Griddel from 'griddle-react';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import {
  isEmpty,
} from 'lodash';
import {
  fetchDraws,
} from '../App/actions';
import {
  selectDraws,
} from '../App/selectors';
import {
  newDraw,
} from './actions';
import {
  updateDrawDate,
  updateNextDrawNumber,
} from './actions';
import NewDrawForm from '../../components/NewDrawForm';
import msg from './messages';
import DateButton from '../../components/DateButtonComponent';
import ResultComponent from '../../components/ResultComponent';


export class HomePage extends React.PureComponent {
  componentDidMount() {
    const {
      onLoadComponent
    } = this.props;
    onLoadComponent();
  }

  render() {
    const {
      onClickNewDraw,
      onChnageDate,
      onChangeNextDrawNumber,
      draws,
    } = this.props;
    const {
      formatMessage,
    } = this.props.intl;

    const columnMetas = [
      {
        columnName: 'drawDate',
        displayName: formatMessage(msg.drawDateLabel),
        customComponent: DateButton,
      },
      {
        columnName: 'nextDrawNumber',
        displayName: formatMessage(msg.nextDrawNumberLabel),
      },
      {
        columnName: 'hasResult',
        displayName: formatMessage(msg.hasDrawResult),
        customComponent: ResultComponent,
      }
    ];

    return (
      <div>
        <h1>Marksix Draw</h1>
        <NewDrawForm
          locale={'en-US'}
          formHeading={formatMessage(msg.formHeading)}
          drawDateChangeHandler={onChnageDate}
          drawDateHintText={formatMessage(msg.drawDateHintText)}
          nextDrawNumberChangeHandler={onChangeNextDrawNumber}
          nextDrawNumberLabel={formatMessage(msg.nextDrawNumberLabel)}
          nextDrawNumberHintText={formatMessage(msg.nextDrawNumberHintText)}
          newDrawLabel={formatMessage(msg.newDrawLabel)}
          newDrawButtonHandler={onClickNewDraw}
        />
        {isEmpty(draws) ? null :
          <Griddel
            results={draws}
            columns={[
              'drawDate',
              'nextDrawNumber',
              'hasResult',
            ]}
            columnMetadata={columnMetas}
          />
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  onLoadComponent: React.PropTypes.func,
  onClickNewDraw: React.PropTypes.func,
  onChnageDate: React.PropTypes.func,
  onChangeNextDrawNumber: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  draws: selectDraws(),
});

export function mapDispatchToProps(dispatch) {
  return ({
    onLoadComponent: () => {
      dispatch(fetchDraws());
    },
    onClickNewDraw: (evt) => {
      if (evt !== undefined && evt.preventDefault)
        evt.preventDefault();
      dispatch(newDraw());
    },
    onChnageDate: (date) => {
      dispatch(updateDrawDate(date));
    },
    onChangeNextDrawNumber: (evt) =>
      dispatch(updateNextDrawNumber(evt.target.value)),
  });
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage));
