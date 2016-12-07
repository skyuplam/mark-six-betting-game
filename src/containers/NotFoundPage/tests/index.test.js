/**
 * Testing the NotFoundPage
 */

import { shallow } from 'enzyme';
import React from 'react';

import { FormattedMessage } from 'react-intl';
import NotFound from '../index';


describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const renderedComponent = shallow(
      <NotFound />
    );
    expect(renderedComponent.contains(
      <h1>Pange Not Found!</h1>)).toEqual(true);
  });
});
