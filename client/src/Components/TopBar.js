import React, {Component} from 'react';
import {Row, Button, Col} from 'reactstrap';
import {topbarArea, buttonStyle, hamburgerStyle} from './CSS/TopbarStyle';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {colors} from '../colors';
import {FaBars} from 'react-icons/fa';

class TopBar extends Component{
  constructor(props){
    super(props);
    this.state={
      previousSize:''
    }
    window.addEventListener('resize', this.checkIfRerender)
  }

  componentDidMount=()=>{
    this.setState({previousSize:window.innerWidth})
  }

  checkIfRerender=()=>{
    if(window.innerWidth<992&&this.state.previousSize>=992){
      this.render();
    } else if(window.innerWidth>=992&&this.state.previousSize<992){
      this.render();
    }
    this.setState({previousSize:window.innerWidth})
  }

  chooseIfFeedback=()=>{
    if(window.location.pathname==='/') {
      return true;
    }
    return false;
  }

  getButtonGroup=()=>{
    let tempButtons=[];
    if(this.props.auth==null || this.props.auth.id==null || this.props.auth.id==false){
      tempButtons.push(<Button style={buttonStyle} key='login' onClick={()=>window.location.href='/api/auth/google'}>Login</Button>);
      tempButtons.push(<Button style={buttonStyle} key='signup' onClick={()=>window.location.href='/api/auth/google'}>Sign Up</Button>);
    } else {
      tempButtons.push(<Button style={buttonStyle} className='float-right' key='logout' onClick={()=>window.location.href='/api/auth/logout'}>Logout</Button>);
    }
    return tempButtons;
  }

  render(){
    return(
      <Row style={topbarArea} className='text-right'>
        <Col>{(window.innerWidth<992)?<Button onClick={()=>this.props.openDrawer(true)} style={hamburgerStyle}><FaBars /></Button>:null}</Col>
        <Col>{this.getButtonGroup()}</Col>
      </Row>
    )
  }
}

function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps, actions)(TopBar);