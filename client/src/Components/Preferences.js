import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import { mainContainer, fixRow, preferencesTitle, preferencesFormStyle, labelStyle, saveButtonStyle } from './CSS/PreferencesStyle';
import {Form, FormGroup, Label, Input, Row, Button} from 'reactstrap';
import Chips from 'react-chips';
import {allergies, diets, cities} from './Resources/Filters';
import Select from 'react-select';

class Preferences extends Component{
  constructor(props){
    super(props);

    let tempDiets=[];
    tempDiets.push({value:'select', label:'No Diet'})
    for(let i in diets){
      tempDiets.push({value:diets[i],label:diets[i]})
    }
    this.state={
      allergy:[],
      prevProps:{},
      name:'',
      location:[],
      diet:{},
      dietOptions:tempDiets,
      payment:{}
    }
  }

  componentDidMount(){
    this.props.getPreferences();
    if(this.props.preferences!=null&&this.state.prevProps!=this.props.preferences){
      this.updateProps();
    }
  }

  updateProps=()=>{
    this.setState({
      allergy:this.props.preferences.restrictions,
      diet:this.props.preferences.diet,
      name:this.props.preferences.name.nickName,
      location:this.props.preferences.location,
      prevProps:this.props.preferences,
      payment:this.props.preferences.paymentSystems,
    })
  }

  onSubmit=()=>{
    this.props.submitPreferences(this.state)
  }

  deleteAccount=()=>{
    this.props.deleteAccount();
  }

  render(){
    if(this.props.preferences!=null&&this.state.prevProps!=this.props.preferences){
      this.updateProps();
    }
    return(
      <div style={mainContainer}>
        <Row style={fixRow}>
          <h1 style={preferencesTitle}>Account Preferences</h1>
        </Row>
        <Row style={fixRow}>
          <Form style={preferencesFormStyle}>
            <FormGroup>
              <Label for='nickname' style={labelStyle}>Nickname</Label>
              <Input 
                type='text' 
                id='nickname' 
                defaultValue={(this.state.name!=null)?this.state.name:''}
                onChange={({target:{name,value}})=>this.setState({name:value})}
              />
            </FormGroup>
            <FormGroup>
              <Label for='allergies' style={labelStyle}>Allergies</Label>
              <Chips 
                value={this.state.allergy}
                onChange={(ch)=>this.setState({allergy:ch})}
                suggestions={allergies}
                id='allergies'
              />
            </FormGroup>
            <FormGroup>
              <Label for='diet' style={labelStyle}>Diet</Label>
              <Select 
                value={this.state.diet} 
                onChange={(a)=>this.setState({diet:a})} 
                options={this.state.dietOptions}
                placeholder='No Diet'/>
            </FormGroup>
            <FormGroup>
              <Label for='location' style={labelStyle}>Location</Label>
              <Chips
                value={this.state.location}
                onChange={(ch)=>this.setState({location:ch})}
                suggestions={cities}
              />
            </FormGroup>
            <FormGroup>
              <Label for='venmo' style={labelStyle}>Venmo Name</Label>
              <Input
                type='text' 
                id='venmo' 
                defaultValue={(this.state.payment!=null&&this.state.payment.venmo!=null)?this.state.payment.venmo:''}
                onChange={({target:{name,value}})=>this.setState({payment:{...this.state.payment,venmo:value}})}
              />
            </FormGroup>
            <FormGroup>
              <Label for='paypal' style={labelStyle}>Paypal Name</Label>
              <Input
                type='text' 
                id='paypal' 
                defaultValue={(this.state.payment!=null&&this.state.payment.paypal!=null)?this.state.payment.paypal:''}
                onChange={({target:{name,value}})=>this.setState({payment:{...this.state.payment,paypal:value}})}
              />
            </FormGroup>
            <Button onClick={this.onSubmit} style={saveButtonStyle}>Save Preferences</Button>
            <br/>
            <Button color='danger' onClick={this.deleteAccount}>Remove Account</Button>
          </Form>
        </Row>
      </div>
    )
  }
}

function mapStateToProps({auth,preferences}){
  return {auth,preferences};
}

export default connect(mapStateToProps, actions)(Preferences);