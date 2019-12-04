import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {Button, Row} from 'reactstrap';
import { navigationButtons, mainContainer } from './CSS/NavigationStyle';

class Navigation extends Component{
  render(){
    return(
      <div style={mainContainer}>
        <Row>
          <Button onClick={()=>this.props.history.push('/')} style={navigationButtons}>Home</Button>
        </Row>
        <Row>
          <Button onClick={()=>this.props.history.push('/groups')} style={navigationButtons}>Group Page</Button>
        </Row>
        <Row>
          <Button onClick={()=>this.props.history.push('/mygroup')} style={navigationButtons}>My Group</Button>
        </Row>
        <Row>
          <Button onClick={()=>this.props.history.push('/preferences')} style={navigationButtons}>Account Preferences</Button>
        </Row>
    </div>
    )
  }
}

function mapStateToProps({auth, history}){
  return {auth, history};
}

export default connect(mapStateToProps, actions)(Navigation);