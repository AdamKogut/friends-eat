import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {Form, FormGroup, Input, Label, Button, FormText} from 'reactstrap';
import Chips from 'react-chips';
import Select from 'react-select';
import {allergies, diets, cities} from './Resources/Filters';
import { mainContainer, labelStyle, checkboxStyle, errorMessage } from './CSS/CreateGroupStyle';

class CreateGroup extends Component {
  constructor(props){
    super(props);

    let tempDiets=[];
    tempDiets.push({value:'select', label:'No Diet'})
    for(let i in diets){
      tempDiets.push({value:diets[i],label:diets[i]})
    }

    let tempPeople=[];
    for(let i=2;i<13;i++){
      tempPeople.push({value:i,label:i});
    }
    this.state={
      allergy:[],
      name:'',
      location:[],
      diet:{},
      dietOptions:tempDiets,
      private:false,
      max:{},
      maxPeople:tempPeople,
      errorMessage:''
    }
  }

  submit=()=>{
    let tempError='';
    console.log(this.state)
    if(this.state.name==''){
      tempError+='Group Name, ';
    }
    if(this.state.max.value==null){
      tempError+='Max People, ';
    }
    if(this.state.diet.value==null){
      tempError+='Diet, '
    }
    if(this.state.location.length==0){
      tempError+='Location, ';
    }
    if(tempError==''){
      this.props.createGroup(this.state);
    } else {
      tempError='Please fill out the following parts of the form: '+tempError.substr(0,tempError.length-2);
      this.setState({errorMessage:tempError});
    }
  }

  render(){
    return(
      <div style={mainContainer}>
        <h4 style={errorMessage}>{this.state.errorMessage}</h4>
        <FormGroup>
          <Label style={labelStyle} for='groupName'>Group Name</Label>
          <Input 
            id='groupName' 
            onChange={({target:{name,value}})=>this.setState({name:value})}/>
        </FormGroup>
        <FormGroup>
          <Label for='max' style={labelStyle}>Max People</Label>
          <Select
            value={this.state.max}
            onChange={(a)=>this.setState({max:a})}
            id='max'
            options={this.state.maxPeople}
          />
        </FormGroup>
        <FormGroup>
          <Label for='allergies' style={labelStyle}>Allergies</Label>
          <Chips 
            value={this.state.allergy}
            onChange={(ch)=>this.setState({allergy:ch})}
            suggestions={allergies}
            fromSuggestionsOnly
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
            fromSuggestionsOnly
          />
          <FormText>If multiple are selected, only the first one will be submitted</FormText>
        </FormGroup>
        <FormGroup>
          <Label style={labelStyle}>Private</Label>
          <Input type='checkbox' style={checkboxStyle} id='private' onChange={(a)=>this.setState({private:a.target.checked})} />
        </FormGroup>
        <Button onClick={this.submit}>Create Group</Button>
      </div>
    )
  }
}

function mapStateToProps({auth,groups, preferences}){
  return {auth,groups, preferences};
}

export default connect(mapStateToProps, actions)(CreateGroup);