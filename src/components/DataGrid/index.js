import React from 'react';
import Griddel from 'griddle-react';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';
import Subheader from 'material-ui/Subheader';

const Wrapper = styled(Paper)`
  margin: 4px 8px;
`;

const DataGrid = (props) => (
  <Wrapper>
    <Subheader>{props.header}</Subheader>
    <Griddel {...props}/>
  </Wrapper>
);

export default DataGrid;
