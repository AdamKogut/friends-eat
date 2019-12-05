import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {Button, Row, FormGroup, Input, Label, Card, CardBody, CardHeader, FormText} from 'reactstrap';
import {mainContainer, returnToGroup, paymentStyle, cardHeaderStyle, dateTitle, cardStyles, horizontalLine, formStyle, saveButtonStyle, paidStyle, attendingCheckbox, paidCheckbox, paidLabel} from './CSS/CalendarDayStyle';

class CalendarDay extends Component{
  constructor(props){
    super(props);
    this.state={
      day:null,
      info:{},
      props:{},
      attending:false
    }
  }

  componentDidMount=()=>{
    if(this.props.calendar==null){
      return;
    }
    let tempChecked=false;
    if(this.props.calendar.AttendingUsers!=null){
      tempChecked=Object.keys(this.props.calendar.AttendingUsers).includes(this.props.auth.id);
    }
    this.setState({
      day:new Date(this.props.calendar.day),
      info:this.props.calendar.info, 
      props:this.props.calendar.info,
      attending:tempChecked,
    });
  }

  getForm=()=>{
    if(this.state.info==null){
      return null;
    }
    let tempReturn=[];
    if(this.state.info.id==''||this.state.info.id==this.props.auth.id){
      tempReturn.push(<h3 key={-1} style={dateTitle}>Recipe Information</h3>)
      tempReturn.push(<hr key={-2} style={horizontalLine}/>)
      tempReturn.push(
        <FormGroup key={0} style={formStyle}>
          <Label for='recipeName'>Recipe Name</Label>
          <Input
            type='text'
            id='recipeName'
            defaultValue={this.state.info.RecipeName}
            onChange={(a)=>this.setState({info:{...this.state.info,RecipeName:a.target.value}})}
          />
        </FormGroup>
      )
      tempReturn.push(
        <FormGroup key={1} style={formStyle}>
          <Label for='ingredients'>Ingredients</Label>
          <Input
            id='ingredients'
            type='textarea'
            defaultValue={this.state.info.Ingredients}
            onChange={(a)=>this.setState({info:{...this.state.info,Ingredients:a.target.value}})}
          />
        </FormGroup>
      )
      tempReturn.push(
        <FormGroup key={2} style={formStyle}>
          <Label for='cost'>Total Cost</Label>
          <Input
            id='cost'
            type='text'
            defaultValue={this.state.info.Cost}
            onChange={(a)=>this.setState({info:{...this.state.info,Cost:a.target.value}})}
          />
          <FormText>Please only whole numbers</FormText>
        </FormGroup>
      )
      tempReturn.push(<Button key={3} onClick={()=>this.props.saveCalendarDay(this.state,this.props.auth.id)} style={saveButtonStyle}>Save Day</Button>)
    }
    return tempReturn;
  }

  changeChecked=(a,id)=>{
    let tempState=this.state.info;
    tempState.AttendingUsers[id].Paid=a.target.checked;
    this.setState({info:tempState});
    this.props.savePaid(id,a.target.checked,this.state.day);
  }

  attendingPeople=()=>{
    if(this.state.info==null){
      return null;
    }
    let tempReturn=[];
    if(this.state.info.AttendingUsers!=null&&Object.keys(this.state.info.AttendingUsers).length>0){
      tempReturn.push(<h3 key={-1} style={dateTitle}>Attending Users</h3>)
      tempReturn.push(<hr key={-2} style={horizontalLine}/>)
      for(let i in this.state.info.AttendingUsers){
        let curr=this.state.info.AttendingUsers[i];
        tempReturn.push(
          <Card style={cardStyles} key={i}>
            <CardHeader style={cardHeaderStyle}>{`${curr.Name.nickName} ${curr.Name.familyName.substring(0,1)}`}</CardHeader>
            <CardBody>
              <div style={paymentStyle}>
                {(curr.PaymentSystems.venmo!=null)?`Venmo: ${curr.PaymentSystems.venmo}`:null}
                <br/>
                {(curr.PaymentSystems.paypal!=null)?`PayPal: ${curr.PaymentSystems.paypal}`:null}
              </div>  
              {(this.state.info.id==this.props.auth.id&&i!=this.props.auth.id)?
                <div style={paidStyle}>
                  <p style={paidLabel}>Paid?</p>
                  <Input style={paidCheckbox} type='checkbox' checked={curr.Paid} onChange={(a)=>this.changeChecked(a,i)}/>
                </div>
              :null}
            </CardBody>
          </Card>
        )
      }
    }
    return tempReturn;
  }

  changeAttending=(a)=>{
    this.setState({attending:a.target.checked});
    this.props.changeAttending(this.state.day,a.target.checked)
  }

  recipeInformation=()=>{
    if(this.state.info==null||this.state.info=={}||this.state.info.id==this.props.auth.id){
      return null;
    }
    let tempReturn=[];
    tempReturn.push(<h3 key={-1} style={dateTitle}>Recipe Information</h3>)
      tempReturn.push(<hr key={-2} style={horizontalLine}/>)
    tempReturn.push(
      <Card style={cardStyles} key={0}>
        <CardBody>
          <h5>{this.state.info.RecipeName}</h5>
          <h6>Ingredients:</h6>
          <p>{this.state.info.Ingredients}</p>
          <h6>Total Cost: {this.state.info.Cost}</h6>
          <h6>
            Will you be attending? 
            <Input 
              style={attendingCheckbox} 
              type='checkbox'
              checked={this.state.attending} 
              onChange={(a)=>this.changeAttending(a)}
            />
          </h6>
        </CardBody>
      </Card>
    )
    return tempReturn;
  }

  render(){
    if((this.props.calendar!=null&&this.props.calendar.day!=null)&&(this.state.day==null||(new Date(this.props.calendar.day)).getTime()!=this.state.day.getTime()||this.state.props!=this.props.calendar.info)){
      this.componentDidMount();
      return null;
    }
    if(this.state.day==null){
      return(
        <div style={mainContainer}>
          <Button style={returnToGroup} onClick={()=>this.props.history.push('/myGroup')}>Return to Group Page</Button>
          <h1 style={dateTitle}>Please return to the group page and choose a day</h1>
        </div>
      )
    }
    return(
      <div style={mainContainer}>
        <Button style={returnToGroup} onClick={()=>this.props.history.push('/myGroup')}>Return to Group Page</Button>
        <h1 style={dateTitle}>{`${this.state.day.getMonth()+1}/${this.state.day.getDate()}/${this.state.day.getFullYear()}`}</h1>
        <hr style={horizontalLine}/>
        {this.getForm()}
        {this.recipeInformation()}
        {this.attendingPeople()}
      </div>
    )
  }
}

function mapStateToProps({auth, calendar, history}){
  return {auth, calendar, history};
}

export default connect(mapStateToProps, actions)(CalendarDay);