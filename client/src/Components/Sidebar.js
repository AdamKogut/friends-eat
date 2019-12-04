import React, {Component} from 'react';
import {sidebarArea,logoCss,logoHolderCss,contentArea} from './CSS/SidebarStyle';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {Row, Col} from 'reactstrap';
import logo from './Resources/Friends_eat_logo.gif';
import Feedback from './Feedback';
import Navigation from './Navigation';

class Sidebar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div style={sidebarArea}>
        <Row style={logoHolderCss}>
          <Col></Col>
          <Col><img src={logo} style={logoCss}/></Col>
        </Row>
        {(this.props.auth!=null && this.props.auth.id!=null && this.props.auth.id!=false)?
          <Row style={contentArea}>
            <Navigation />
          </Row>
        :null}
        <Row style={contentArea}>
          <Feedback />
        </Row>
      </div>
    )
  }
}

function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps, actions)(Sidebar);