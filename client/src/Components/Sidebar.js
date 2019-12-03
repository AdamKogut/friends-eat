import React, {Component} from 'react';
import {sidebarArea,logoCss,logoHolderCss,contentArea} from './CSS/SidebarStyle';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {Row, Col} from 'reactstrap';
import logo from './Resources/Friends_eat_logo.gif';
import Feedback from './Feedback';

class Sidebar extends Component{
  constructor(props){
    super(props);
  }

  chooseIfFeedback=()=>{
    if(window.location.pathname==='/') {
      return true;
    }
    return false;
  }

  render(){
    return(
      <div style={sidebarArea}>
        <Row style={logoHolderCss}>
          <Col></Col>
          <Col><img src={logo} style={logoCss}/></Col>
        </Row>
        <Row style={contentArea}>
          {this.chooseIfFeedback()?<Feedback />:null}
        </Row>
      </div>
    )
  }
}

function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps, actions)(Sidebar);