import React,{Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {mainContainer, fixRow, availableTitle, createGroupButton, filterTitle, groupRow, requestJoinButton, cardBodyPosition, cardStyle} from './CSS/GroupsStyle';
import {Card, Button, CardHeader, CardFooter, CardBody, CardTitle, CardText, Row, Col, Input} from 'reactstrap';
import Chips from 'react-chips';
import {allergies, diets, cities} from './Resources/Filters';
import Select from 'react-select';

class Groups extends Component {
  constructor(props){
    super(props);
    props.getGroups();

    let tempDiets=[];
    tempDiets.push({value:'select', label:'No Diet'})
    for(let i in diets){
      tempDiets.push({value:diets[i],label:diets[i]})
    }
    this.state={
      allGroups:{},
      filteredGroups:[],
      filter:{
        chips:[],
        diet:{},
        location:[]
      },
      dietOptions:tempDiets
    }
  }

  componentDidMount=()=>{
    if(this.props.groups==null||this.props.preferences==null){
      return;
    }
    let tempFilter={
      chips:[],
      diet:{},
      location:[]
    };
    if(this.props.preferences.diet!=null){
      tempFilter.diet=this.props.preferences.diet;
    }
    if(this.props.preferences.restrictions!=null){
      tempFilter.chips=this.props.preferences.restrictions;
    }
    if(this.props.preferences.location!=null){
      tempFilter.location=this.props.preferences.location;
    }
    this.setState({allGroups:this.props.groups, filter:tempFilter});
    this.filterGroups(this.props.groups,tempFilter);
  }

  changeChips=(ch)=>{
    this.setState({filter:{chips:ch, diet:this.state.filter.diet, location:this.state.filter.location}},
      ()=>this.filterGroups(this.state.allGroups, this.state.filter));
  }

  changeDiet=(a)=>{
    this.setState({filter:{chips:this.state.filter.chips,diet:a, location:this.state.filter.location}},
      ()=>this.filterGroups(this.state.allGroups,this.state.filter));
  }

  changeLocation=(ch)=>{
    this.setState({filter:{chips:this.state.filter.chips, diet:this.state.filter.diet, location:ch}},
      ()=>this.filterGroups(this.state.allGroups,this.state.filter));
  }

  filterGroups=(source, filter)=>{
    if(filter!={chips:[],diet:{},location:[]}){
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
        if(filter.diet.value!='select'&&filter.diet.value!=null){
          if(!curr.Restrictions.includes(filter.diet.value)){
            continue;
          }
        }
        //filter on location
        if(filter.location.length>0&&!filter.location.includes(curr.Location)){
          continue;
        }
        tempSource[i]=curr;
      }
      source=tempSource;
    }
    this.convertToJSX(source)
  }

  convertToJSX=(source)=>{
    let tempGroup=[];
    for(let i in source){
      let currGroup = source[i];
      if(Object.keys(currGroup.Users).includes(this.props.auth.id)||
        (currGroup.WaitingUsers!=null && Object.keys(currGroup.WaitingUsers).includes(this.props.auth.id))||
        (currGroup.RejectedUsers!=null && Object.keys(currGroup.RejectedUsers).includes(this.props.auth.id))){
        continue;
      }
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
              <br/>
              {`Location: ${currGroup.Location}`}
            </div>
            <Button style={requestJoinButton} onClick={()=>this.props.joinGroup(i).then(this.props.getGroups)}>Request to Join</Button>
          </CardBody>
        </Card>
      )
    }
    if(tempGroup.length==0){
      tempGroup.push(
        <Card key={0} style={cardStyle}>
          <CardBody>
            <div style={cardBodyPosition}>
              No Groups Found: Please change the filters to find groups
            </div>
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
            <Select 
              value={this.state.filter.diet} 
              onChange={this.changeDiet} 
              options={this.state.dietOptions}
              placeholder='No Diet'/>
            <br />
            <h6 style={filterTitle}>Location</h6>
            <Chips
              value={this.state.filter.location}
              onChange={this.changeLocation}
              suggestions={cities}
            />
          </Col>
        </Row>
      </div>
    )
  }


}

function mapStateToProps({auth,groups, preferences}){
  return {auth,groups, preferences};
}

export default connect(mapStateToProps, actions)(Groups);