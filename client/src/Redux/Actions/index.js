import React from 'react'
import axios from 'axios';
import { FETCH_USER, FETCH_FEEDBACK, OPEN_MODAL, HISTORY, GET_REPORTS, GET_GROUPS, GET_PREFERENCES, GET_MY_GROUP, CALENDAR_DAY, CALENDAR_INFO, OPEN_DRAWER } from './Types';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import History from '../../History';
import { deleteAccountStyle } from '../../Components/CSS/PreferencesStyle';
import CreateGroup from '../../Components/CreateGroup';

export const fetchUser = () => async dispatch => {
  axios.get('/api/auth/current_user',{withCredentials: true}).then((response)=>{
    dispatch({ type: FETCH_USER, payload: response.data });
  });
};

export const fetchFeedback = () => async dispatch =>{
  axios.get('/api/feedback',{withCredentials: true}).then((response)=>{
    dispatch({type: FETCH_FEEDBACK, payload:response.data});
  })
}

export const openModal = (isOpen, comp) => async dispatch =>{
  let tempModalInfo={};
  if(comp=="addFeedback"){
    axios.get('api/feedback/getUser',{withCredentials:true}).then(response=>{
      tempModalInfo.title="Add feedback";
      tempModalInfo.body=(
        <Form action='/api/feedback' method='POST'>
          <FormGroup>
            <Label for='addFeedbackTitle'>Title</Label>
            <Input id='addFeedbackTitle' name='title' defaultValue={response.data.Title}/>
          </FormGroup>
          <FormGroup>
            <Label for='addFeedbackBody'>Review</Label>
            <Input type='textarea' id='addFeedbackBody' name='body' defaultValue={response.data.Body}/>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen,...tempModalInfo}});
    })
  } else {
    dispatch({type:OPEN_MODAL,payload:{isOpen}});
  }

}

export const getReports=()=>async dispatch =>{
  axios.get('/api/auth/reports',{withCredentials: true}).then(response=>{
    if(response.data.nums>3){
      let tempModalInfo={};
      tempModalInfo.title="Account Removed"
      tempModalInfo.body=(
        <div>
          <p>You have been reported 3 or more times so your account has been removed</p>
          <Button onClick={()=>{
            axios.post('/api/removeAccount').then(()=>{
              window.location.href='/api/auth/logout';
            })
          }}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}})
    }
  })
}

export const applyHistory=() => async dispatch=>{
  dispatch({type:HISTORY, payload:History});
}

export const getGroups=()=> async dispatch=>{
  axios.get('/api/groups',{withCredentials:true}).then(response=>{
    if(response.data.success==false){
      return;
    }
    dispatch({type:GET_GROUPS, payload:response.data})
  })
}

export const getPreferences=()=>async dispatch=>{
  axios.get('/api/preferences',{withCredentials: true}).then(response=>{
    dispatch({type:GET_PREFERENCES, payload:response.data});
  })
}

export const submitPreferences=(obj)=>async dispatch=>{
  let tempObj={}
  tempObj.restrictions=obj.allergy;
  tempObj.location=obj.location;
  tempObj.diet=obj.diet;
  tempObj.nickName=obj.name;
  tempObj.paymentSystems=obj.payment;
  axios.post('/api/preferences',tempObj,{withCredentials: true}).then(response=>{
    if(response.data.success==true){
      let tempModalInfo={};
      tempModalInfo.title='Save Preferences';
      tempModalInfo.body=(
        <div>
          <p>Account Preferences have been succesfully saved</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else {
      let tempModalInfo={};
      tempModalInfo.title='Save Preferences';
      tempModalInfo.body=(
        <div>
          <p>Account Preferences were not saved</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
    
  })
}

export const deleteAccount=()=>async dispatch=>{
  let tempModalInfo={};
  tempModalInfo.title='Delete Account';
  tempModalInfo.body=(
    <div>
      <p>Are you sure you want to delete your account?</p>
      <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>No</Button>
      <Button style={deleteAccountStyle} onClick={exportDeleteAccount} >Yes</Button>
    </div>
  )
  dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
}

const exportDeleteAccount=()=>{
  axios.delete('/api/preferences',{withCredentials: true}).then(response=>{
    window.location.href='/api/auth/logout';
  })
}

export const joinGroup=(group)=> async dispatch=> {
  axios.post('/api/groups/join',{groupName:group},{withCredentials: true}).then(response=>{
    if(response.data.success==true){
      let tempModalInfo={};
      tempModalInfo.title='Request to join';
      tempModalInfo.body=(
        <div>
          <p>Succesfully requested to join</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else {
      let tempModalInfo={};
      tempModalInfo.title='Request to join';
      tempModalInfo.body=(
        <div>
          <p>Failed to request to join</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
  })
}

export const openCreateGroup=()=>async dispatch=>{
  let tempModalInfo={};
  tempModalInfo.title='Create Group';
  tempModalInfo.body=(<CreateGroup />)
  dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
}

export const createGroup=(info)=>async dispatch =>{
  let tempInfo={};
  let modify=0;
  tempInfo.restrictions=[];
  if(info.diet.value!='select'){
    tempInfo.restrictions[0]=info.diet.value;
    modify++;
  }
  for(let i in info.allergy){
    tempInfo.restrictions[parseInt(i)+parseInt(modify)]=info.allergy[i];
  }
  tempInfo.location=info.location[0];
  tempInfo.name=info.name;
  tempInfo.MaxUsers=info.max.value;
  tempInfo.private=info.private;
  
  axios.post('/api/groups',tempInfo).then(response=>{
    if(response.data.success==true){
      let tempModalInfo={};
      tempModalInfo.title='Create Group';
      tempModalInfo.body=(
        <div>
          <p>Succesfully created group</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else {
      let tempModalInfo={};
      tempModalInfo.title='Create Group';
      tempModalInfo.body=(
        <div>
          <p>Failed to create group</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
  })
}

export const getMyGroup=()=> async dispatch =>{
  axios.get('/api/groups/mine',{withCredentials: true}).then(response=>{
    dispatch({type:GET_MY_GROUP, payload:response.data});
  })
}

export const changeUserLevel=(action, targetUid)=> async dispatch=>{
  axios.post(`/api/groups/${action}`,{targetUid},{withCredentials: true}).then(response=>{
    if(response.data.success==true){
      let tempModalInfo={};
      tempModalInfo.title=`${action.substr(0,1).toUpperCase()}${action.substr(1,action.length)} User`;
      tempModalInfo.body=(
        <div>
          <p>Success</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else {
      let tempModalInfo={};
      tempModalInfo.title=`${action.substr(0,1).toUpperCase()}${action.substr(1,action.length)} User`;
      tempModalInfo.body=(
        <div>
          <p>Failed</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
  })
}

export const deleteGroup=()=>async dispatch=>{
  axios.delete(`/api/groups/`,null,{withCredentials: true}).then(response=>{
    if(response.data.success==true){
      let tempModalInfo={};
      tempModalInfo.title=`Delete Group`;
      tempModalInfo.body=(
        <div>
          <p>Success</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else {
      let tempModalInfo={};
      tempModalInfo.title=`Delete Group`;
      tempModalInfo.body=(
        <div>
          <p>Failed</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
  })
}

export const reportPerson=(target)=>async dispatch=>{
  axios.post('/api/auth/reports',{target},{withCredentials: true}).then(response=>{
    if(response.data.success==true){
      let tempModalInfo={};
      tempModalInfo.title=`Report Person`;
      tempModalInfo.body=(
        <div>
          <p>Success</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else {
      let tempModalInfo={};
      tempModalInfo.title=`Report Person`;
      tempModalInfo.body=(
        <div>
          <p>Failed</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
  })
}

export const selectDay=(day)=>async dispatch=>{
  dispatch({type:CALENDAR_DAY, payload:day});
}

export const getDayInfo=(day)=>async dispatch=>{
  axios.post('/api/calendar',{date:day},{withCredentials: true}).then(response=>{
    let temp={};
    if(response.data.success==true||response.data.success==false){
      temp.AttendingUsers=[];
      temp.Name='';
      temp.RecipeName='';
      temp.id='';
      temp.Ingredients='';
      temp.Cost='';
    } else {
      temp=response.data;
    }
    dispatch({type:CALENDAR_INFO, payload:temp});
  })
}

export const saveCalendarDay=(info,id)=>async dispatch=>{
  let tempInfo={};
  tempInfo.info=info.info;
  tempInfo.info.id=id
  tempInfo.day=info.day;
  axios.post('/api/calendar/save',tempInfo,{withCredentials: true}).then(response=>{
    if(response.data.success==true){
      let tempModalInfo={};
      tempModalInfo.title=`Save Day`;
      tempModalInfo.body=(
        <div>
          <p>Success</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else {
      let tempModalInfo={};
      tempModalInfo.title=`Save Day`;
      tempModalInfo.body=(
        <div>
          <p>Failed</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
  })
}

export const savePaid=(id, val, day)=>async dispatch=>{
  axios.post('/api/calendar/saveCheckbox',{id,val,day},{withCredentials: true}).then(response=>{
    if(response.data.success==false){
      let tempModalInfo={};
      tempModalInfo.title=`Change Paid`;
      tempModalInfo.body=(
        <div>
          <p>Failed</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
  })
}

export const changeAttending=(day, val)=>async dispatch=>{
  axios.post('/api/calendar/saveAttending',{day,val},{withCredentials: true}).then(response=>{
    if(response.data.success==false){
      let tempModalInfo={};
      tempModalInfo.title=`Change Attending`;
      tempModalInfo.body=(
        <div>
          <p>Failed</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
  })
}

export const sendInvite=(email)=>async dispatch=>{
  axios.post('/api/invite',{email},{withCredentials: true}).then(response=>{
    if(response.data.success=='accountNotFound'){
      let tempModalInfo={};
      tempModalInfo.title=`Invite to Group`;
      tempModalInfo.body=(
        <div>
          <p>The user you are trying to invite does not currently have an account</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else if(response.data.success==false){
      let tempModalInfo={};
      tempModalInfo.title=`Invite to Group`;
      tempModalInfo.body=(
        <div>
          <p>Failed</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else if(response.data.success=='hasGroup'){
      let tempModalInfo={};
      tempModalInfo.title=`Invite to Group`;
      tempModalInfo.body=(
        <div>
          <p>The user you are trying to invite is already in a group</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else if(response.data.success==true){
      let tempModalInfo={};
      tempModalInfo.title=`Invite to Group`;
      tempModalInfo.body=(
        <div>
          <p>Success</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
    console.log(response.data)
  })
}

export const acceptInvite=(obj)=>async dispatch=>{
  axios.post('/api/groups/join/invite',obj,{withCredentials: true}).then(response=>{
    if(response.data.success==true){
      let tempModalInfo={};
      tempModalInfo.title=`Accept Invite`;
      tempModalInfo.body=(
        <div>
          <p>Successfully accepted the group invite</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    } else if(response.data.success==false){
      let tempModalInfo={};
      tempModalInfo.title=`Accept Invite`;
      tempModalInfo.body=(
        <div>
          <p>Failed to accept invite, please try again later</p>
          <Button onClick={()=>dispatch({type:OPEN_MODAL, payload:{isOpen:false}})}>Ok</Button>
        </div>
      )
      dispatch({type:OPEN_MODAL, payload:{isOpen:true, ...tempModalInfo}});
    }
  })
}

export const openDrawer=(val)=>async dispatch=>{
  dispatch({type:OPEN_DRAWER,payload:val})
}