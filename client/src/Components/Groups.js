import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {mainContainer, fixRow, availableTitle, createGroupButton, filterTitle, groupRow, requestJoinButton, cardBodyPosition, cardStyle} from './CSS/GroupsStyle';
import {Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText, Row, Col, Input} from 'reactstrap';
import Chips from 'react-chips';
import {allergies, diets} from './Resources/Filters';
import Select from 'react-select';

class Groups extends Component {
  constructor(props){
    super(props);
    props.getGroups();

    let tempDiets=[];
    tempDiets.push({value:'select', label:'Select Diet'})
    for(let i in diets){
      tempDiets.push({value:diets[i],label:diets[i]})
    }
    this.state={
      allGroups:{},
      filteredGroups:[],
      filter:{
        chips:[],
        diet:''
      },
      dietOptions:tempDiets
    }
  }

  componentDidMount=()=>{
    if(this.props.groups==null){
      return;
    }
    this.setState({allGroups:this.props.groups});
    this.filterGroups(this.props.groups,'');
  }

  changeChips=(ch)=>{
    this.setState({filter:{chips:ch, diet:this.state.filter.diet}},()=>this.filterGroups(this.state.allGroups, this.state.filter));
  }

  changeDiet=(a)=>{
    this.setState({filter:{chips:this.state.filter.chips,diet:a}},()=>this.filterGroups(this.state.allGroups,this.state.filter));
  }

  filterGroups=(source, filter)=>{
    if(filter!=''){
      let tempSource={};
      for(let i in source){
        let curr=source[i];
        let remove=false;
        for(let j in filter.chips){
          let c = filter.chips[j];
          if(!curr.Restrictions.includes(c)){
            remove=true;
            break;
          }
        }
        if(remove){
          continue;
        }
        //filter on diet
        if(filter.diet.value!='select'){
          if(!curr.Restrictions.includes(filter.diet.value)){
            continue;
          }
        }
        tempSource[i]=curr;
      }
      source=tempSource;
    }
    let tempGroup=[];
    for(let i in source){
      let currGroup = source[i];
      let tempRestrictions='';
      for(let j in currGroup.Restrictions){
        tempRestrictions+=currGroup.Restrictions[j]+', ';
      }
      tempGroup.push(
        <Card key={i} style={cardStyle}>
          <CardHeader>{currGroup.Name}</CardHeader>
          <CardBody>
            <div style={cardBodyPosition}>
              {`Members in group: ${Object.keys(currGroup.Users).length}`}
              <br/>
              {`Available Spots: ${currGroup.MaxUsers-Object.keys(currGroup.Users).length}`}
              <br/>
              {`Restrictions: ${tempRestrictions.length==0?'none':tempRestrictions.substr(0,tempRestrictions.length-2)}`}
            </div>
            <Button style={requestJoinButton}>Request to Join</Button>
          </CardBody>
        </Card>
      )
    }
    this.setState({filteredGroups:tempGroup});
  }

  render(){
    if(this.state.allGroups!=this.props.groups){
      this.componentDidMount();
    }
    return(
      <div style={mainContainer}>
        <Row style={fixRow}>
          <h1 style={availableTitle}>Available Groups</h1>
          <Button style={createGroupButton}>Create Group</Button>
        </Row>
        <Row style={groupRow}>
          <Col xs={7}>
            {this.state.filteredGroups}
          </Col>
          <Col xs={5}>
            <h3 style={filterTitle}>Filter</h3>
            <h6 style={filterTitle}>Allergies</h6>
            <Chips 
              value={this.state.filter.chips}
              onChange={this.changeChips}
              suggestions={allergies}
            />
            <br />
            <h6 style={filterTitle}>Diet</h6>
            <Select value={this.state.filter.diet} onChange={this.changeDiet} options={this.state.dietOptions}/>
          </Col>
        </Row>
      </div>
    )
  }


}

function mapStateToProps({auth,groups}){
  return {auth,groups};
}

export default connect(mapStateToProps, actions)(Groups);