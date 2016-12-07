import React from 'react';
import { connect } from 'react-redux';

export class HomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
}

export default connect()(HomePage);
