import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {Row, Card,CardTitle,CardBody,CardSubtitle,CardText, Button} from 'reactstrap';
import { feedbackTitle, feedbackTitleText, feedbackArea, cardStyle, addFeedbackStyle,feedbackContentArea, containingDivArea } from './CSS/FeedbackStyle';

class Feedback extends Component{
  constructor(props){
    super(props);
    this.state={
      prevProps:{},
      feedbackList:[],
    }
  }

  componentDidMount=()=>{
    if(this.props.feedback==null){
      return;
    }
    let tempList=[];
    for(let i in this.props.feedback){
      tempList.push(
        <Card key={i} style={cardStyle}>
          <CardBody>
            <CardTitle>{this.props.feedback[i].Title}</CardTitle>
            <CardSubtitle>{this.props.feedback[i].Name.givenName}</CardSubtitle>
            <CardText>{this.props.feedback[i].Body.substring(0,100)}...</CardText>
          </CardBody>
        </Card>
      )
    }
    if(this.props.auth!=false && this.props.auth!=null){
      tempList.push(
        <Card style={addFeedbackStyle} key='add'>
          <CardBody>
            <Button onClick={()=>this.props.openModal(true,'addFeedback')}>Add Review</Button>
          </CardBody>
        </Card>
      )
    }
    this.setState({prevProps:this.props, feedbackList:tempList});
  }

  render(){
    if(this.props!=this.state.prevProps){
      this.componentDidMount();
    }
    
    return(
      <div style={containingDivArea}>
        <Row style={feedbackTitle}>
          <h2 style={feedbackTitleText}>Feedback</h2>
        </Row>
        <Row style={feedbackArea}>
          <div style={feedbackContentArea}>
            {this.state.feedbackList}
          </div>
        </Row>
      </div>
    )
  }
}

function mapStateToProps({auth, feedback}){
  return {auth, feedback};
}

export default connect(mapStateToProps, actions)(Feedback);