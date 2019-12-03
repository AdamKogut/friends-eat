import React, {Component} from 'react';
import {Row} from 'reactstrap';
import {topbarArea} from './CSS/TopbarStyle';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';

class TopBar extends Component{
  render(){
    return(
      <Row style={topbarArea}>

      </Row>
    )
  }
}

function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps, actions)(TopBar);