import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Redux/Actions';
import {Container, Row, Col, Modal,ModalHeader, ModalBody} from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom'
import {appEntireArea, sidebarArea} from './AppStyle.js';
import Sidebar from './Components/Sidebar';
import TopBar from './Components/TopBar';
import Home from './Components/Home';
import Groups from './Components/Groups';
import Preferences from './Components/Preferences';
import MyGroup from './Components/MyGroup';
import CalendarDay from './Components/CalendarDay';

class App extends Component{
  constructor(props){
    super(props);
        
  }

  componentDidMount(){
    this.props.fetchUser();
    this.props.fetchFeedback();
    this.props.applyHistory();
    this.props.getReports();
    this.props.getPreferences();
    this.props.getMyGroup();
  }

  render(){
    return (
        <Container style={appEntireArea}>
          <Row>
            <Col xs='none' sm={3} style={sidebarArea}>
              <Sidebar />
            </Col>
            <Col sm={9} xs={12}>
              <Row>
                <TopBar />
              </Row>
              <Row>
                <Switch>
                  <Route exact path='/' render={()=><Home />}/>
                  <Route path='/groups' render={()=><Groups />}/>
                  <Route path='/preferences' render={()=><Preferences />}/>
                  <Route path='/myGroup' render={()=><MyGroup />}/>
                  <Route path='/calendar' render={()=><CalendarDay/>}/>
                </Switch>
              </Row>
            </Col>
          </Row>
          {this.props.modal==null?null:
            <Modal isOpen={this.props.modal.isOpen} toggle={()=>this.props.openModal(false,'none')}>
              <ModalHeader toggle={()=>this.props.openModal(false,'none')}>{this.props.modal.title}</ModalHeader>
              <ModalBody>{this.props.modal.body}</ModalBody>
            </Modal>
          }
        </Container>
    );
  }
}

function mapStateToProps({modal}){
  return {modal};
}

export default connect(mapStateToProps,actions)(App);
