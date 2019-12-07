import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {Row, Col, Button, Card, CardBody, CardHeader, FormGroup, Input, FormText, Label} from 'reactstrap';
import { mainContainer, fixRow, groupTitle, horizontalLine, leaveButton, groupName, venmoPayment, paypalPayment, cardStyles, paymentStyle, reportButtonStyle2, reportButtonStyle, cardHeaderStyle, myGroupRow, allowButton, calendarStyle, labelStyle, inviteButtonStyle } from './CSS/MyGroupStyle';
import Calendar from 'react-calendar';
import './CSS/CalendarStyle.css';


class MyGroup extends Component{
  componentDidMount(){
    this.props.getMyGroup();
  }

  getGroupmates=()=>{
    let r=[];
    for(let i in this.props.group.Users){
      let curr=this.props.group.Users[i];
      r.push(
        <Card style={cardStyles} key={i}>
          <CardHeader style={cardHeaderStyle}>{`${curr.Name.nickName} ${curr.Name.familyName.substring(0,1)}`}</CardHeader>
          <CardBody>
            <div style={paymentStyle}>
              {`Email: ${curr.Email}`}
              <br/>
              {(curr.PaymentSystems.venmo!=null)?`Venmo: ${curr.PaymentSystems.venmo}`:null}
              <br/>
              {(curr.PaymentSystems.paypal!=null)?`PayPal: ${curr.PaymentSystems.paypal}`:null}
            </div>
            
            {(this.props.auth.id==this.props.group.Creator&&i!=this.props.auth.id)?
              <div>
                <Button style={reportButtonStyle} onClick={()=>this.props.changeUserLevel('remove',i).then(this.props.getMyGroup)}>Remove</Button>
                <Button style={reportButtonStyle2} onClick={()=>this.props.reportPerson(i)}>Report</Button>
              </div>
            :this.props.auth.id!=i?<Button onClick={()=>this.props.reportPerson(i)} style={reportButtonStyle}>Report</Button>:null}
          </CardBody>
        </Card>
      )
    }
    return r;
  }

  getPossibleGroupMates=()=>{
    if(this.props.auth.id!=this.props.group.Creator||this.props.group.WaitingUsers==null){
      return null;
    }
    let r=[];
    r.push(<h1 key={-2} style={groupTitle}>Requested to Join</h1>);
    r.push(<hr key={-1} style={horizontalLine} />)
    for(let i in this.props.group.WaitingUsers){
      let curr=this.props.group.WaitingUsers[i];
      r.push(
        <Card style={cardStyles} key={i}>
          <CardBody>
            <h5>{`${curr.Name.nickName} ${curr.Name.familyName}`}</h5>
            <Button style={allowButton} onClick={()=>this.props.changeUserLevel('accept',i).then(this.props.getMyGroup)}>Allow to Join</Button>
            <Button style={allowButton} onClick={()=>this.props.changeUserLevel('deny',i).then(this.props.getMyGroup)}>Don't Allow</Button>
          </CardBody>
        </Card>
      )
    }
    return r;
  }

  chooseDay=(day)=>{
    this.props.selectDay(day);
    this.props.getDayInfo(day);
    this.props.history.push('/calendar');
  }

  invitePeople=()=>{
    if(this.props.group.Creator==this.props.auth.id){
      let amtLeft=this.props.group.MaxUsers-Object.keys(this.props.group.Users).length;
      let tempHintText='';
      if(amtLeft==0){
        tempHintText='Max amount of people in group, please remove a person to invite another';
      }
      let tempReturn=[];
      tempReturn.push(<h1 key='0' style={groupTitle}>Invite People</h1>);
      tempReturn.push(<hr key='1' style={horizontalLine} />);
      tempReturn.push(
        <FormGroup key='2' style={cardStyles}>
          <Label style={labelStyle} for='email'>Invite by email</Label>
          <Input type='email' onChange={(a)=>this.setState({email:a.target.value})}/>
          {tempHintText.length>0?<Button onClick={()=>this.props.sendInvite(this.state.email)} disabled style={inviteButtonStyle}>Send Invite</Button>
            :<Button onClick={()=>this.props.sendInvite(this.state.email)} style={inviteButtonStyle}>Send Invite</Button>}
          <FormText>{tempHintText}</FormText>
        </FormGroup>
      )
      return tempReturn;
    }
    return null;
  }

  render(){
    if(this.props.group==null||this.props.group.success==false){
      return(
        <div style={mainContainer}>
          <h1 style={groupTitle}>No current group</h1>
          <h4 style={groupTitle}>To get a group, go to the Group Page and either request to join a group or create a group</h4>
        </div>
      )
    }

    return(
      <div style={mainContainer}>
        <Row style={fixRow}>
          <Col xs={12} sm={6}>
            <h1 style={groupTitle}>My Group</h1>
            <hr style={horizontalLine}/>
            <Row style={myGroupRow}>
              <Col md={6} sm={12}>
                <h3 style={groupName}>{this.props.group.Name}</h3>
              </Col>
              <Col md={6} sm={12}>
                {(this.props.auth.id!=this.props.group.Creator)?
                  <Button style={leaveButton} onClick={()=>this.props.changeUserLevel('remove',this.props.auth.id).then(this.props.getMyGroup)}>Leave</Button>
                :<Button style={leaveButton} onClick={()=>this.props.deleteGroup().then(this.props.getMyGroup)}>Delete Group</Button>}
                
              </Col>
            </Row>
            <h1 style={groupTitle}>Group Members</h1>
            <hr style={horizontalLine} />
            {this.getGroupmates()}
            {this.getPossibleGroupMates()}
          </Col>
          <Col xs={12} sm={6}>
            <h1 style={groupTitle}>Calendar</h1>
            <hr style={horizontalLine} />
            <Calendar
              minDetail='month'
              maxDetail='month'
              className='calendar-my-group'
              onClickDay={(a)=>this.chooseDay(a)}
            />
            {this.invitePeople()}
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps({auth, groups, history }){
  return {auth, group:groups.myGroup, history};
}

export default connect(mapStateToProps, actions)(MyGroup);