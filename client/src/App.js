import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Redux/Actions';
import {Container, Row, Col, Modal,ModalHeader, ModalBody} from 'reactstrap';
import {appEntireArea, sidebarArea} from './AppStyle.js';
import Sidebar from './Components/Sidebar';
import TopBar from './Components/TopBar';

class App extends Component{
  componentDidMount(){
    this.props.fetchUser();
    this.props.fetchFeedback();
  }

  render(){
    console.log(this.props)
    return (
      <BrowserRouter>
        <Container style={appEntireArea}>
          <Row>
            <Col xs={0} sm={3} style={sidebarArea}>
              <Sidebar />
            </Col>
            <Col sm={9} xs={12}>
              <TopBar />
            </Col>
          </Row>
          {this.props.modal==null?null:
            <Modal isOpen={this.props.modal.isOpen} toggle={()=>this.props.openModal(false,'none')}>
              <ModalHeader toggle={()=>this.props.openModal(false,'none')}>{this.props.modal.title}</ModalHeader>
              <ModalBody>{this.props.modal.body}</ModalBody>
            </Modal>
          }
        </Container>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({modal}){
  return {modal};
}

export default connect(mapStateToProps,actions)(App);
