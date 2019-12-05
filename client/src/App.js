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
import Drawer from '@material-ui/core/Drawer';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      open:false,
      previousSize:''
    }
    window.addEventListener('resize', this.checkIfRerender)
  }

  checkIfRerender=()=>{
    if(window.innerWidth<992&&this.state.previousSize>=992){
      this.render();
    } else if(window.innerWidth>=992&&this.state.previousSize<992){
      this.render();
    }
    this.setState({previousSize:window.innerWidth})
  }

  componentDidMount(){
    this.props.fetchUser();
    this.props.fetchFeedback();
    this.props.applyHistory();
    this.props.getReports();
    this.props.getPreferences();
    this.props.getMyGroup();
    this.setState({previousSize:window.innerWidth});
  }

  render(){
    return (
        <Container style={appEntireArea}>
          <Row>
            {(window.innerWidth<992)?
              <Drawer open={this.props.drawer} onClose={()=>this.props.openDrawer(false)}>
                <Sidebar />
              </Drawer>
            :
              <Col lg={3} style={sidebarArea}>
                <Sidebar />
              </Col>
            }
            <Col lg={9} md={12}>
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
                  <Route path='/invite' render={()=>{
                    let tempVars=window.location.search.slice(1);
                    let obj={};
                    if (tempVars) {

                      // stuff after # is not part of query string, so get rid of it
                      tempVars = tempVars.split('#')[0];
                  
                      // split our query string into its component parts
                      var arr = tempVars.split('&');
                      for(let i in arr){
                        obj[arr[i].split('=')[0]]=arr[i].split('=')[1];
                      }

                      this.props.acceptInvite(obj).then(()=>window.location.href='/')
                    }
                    // window.location.href='/'
                    
                    return null;
                  }}/>
                  <Route render={()=>window.location.href='/'}/>
                </Switch>
              </Row>
            </Col>
          </Row>
          {this.props.modal==null?null:
            <Modal isOpen={this.props.modal.isOpen} toggle={()=>(this.props.modal.title!="Account Removed")?this.props.openModal(false,'none'):window.location.href='/api/auth/logout'}>
              <ModalHeader toggle={()=>this.props.openModal(false,'none')}>{this.props.modal.title}</ModalHeader>
              <ModalBody>{this.props.modal.body}</ModalBody>
            </Modal>
          }
        </Container>
    );
  }
}

function mapStateToProps({modal}){
  return {modal:modal.modal, drawer:modal.drawer};
}

export default connect(mapStateToProps,actions)(App);
