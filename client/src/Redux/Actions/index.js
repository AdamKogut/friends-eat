import React from 'react'
import axios from 'axios';
import { FETCH_USER, FETCH_FEEDBACK, OPEN_MODAL } from './Types';
import {Form, FormGroup, Input, Label, Button} from 'reactstrap';

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
      console.log(response.data)
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
    dispatch({type:OPEN_MODAL,payload:{isOpen}})
  }

}