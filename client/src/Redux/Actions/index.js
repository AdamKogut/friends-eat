import React from 'react'
import axios from 'axios';
import { FETCH_USER, FETCH_FEEDBACK, OPEN_MODAL, HISTORY, GET_REPORTS, GET_GROUPS, GET_PREFERENCES } from './Types';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';
import History from '../../History';
import { deleteAccountStyle } from '../../Components/CSS/PreferencesStyle';

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
  axios.get('/api/auth/reports').then(response=>{
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
  axios.get('/api/preferences').then(response=>{
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
  axios.post('/api/preferences',tempObj).then(response=>{
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
  axios.delete('/api/preferences').then(response=>{
    window.location.href='/api/auth/logout';
  })
}

export const joinGroup=(group)=> async dispatch=> {
  axios.post('/api/groups/join',{groupName:group}).then(response=>{
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