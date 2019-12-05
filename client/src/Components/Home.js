import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {Row, Carousel, CarouselControl, CarouselIndicators, CarouselItem} from 'reactstrap';
import {homeAboveBar, imageStyle, makeFriendsText, eatFoodText, missionTitle, missionBody, mainContainer} from './CSS/HomeStyle';
import image1 from './Resources/002-portland-food-photographer-11(pp_w768_h512).jpg';
import image2 from './Resources/Food-photographer-London-Mixed-Indian-starter.jpg';
import image3 from './Resources/PbPost_ChristmasCookie2016_WhiteChocolate-2.png';

class Home extends Component{
  constructor(props){
    super(props);
    this.state={
      activeIndex:0,
      animating:false,
      items:[
        {
          src:image1
        },
        {
          src:image2
        },
        {
          src:image3
        }
      ]
    }
  }

  setNext=()=>{
    if(this.state.animating){
      return;
    }
    this.setActiveIndex((this.state.activeIndex==this.state.items.length-1)?0:this.state.activeIndex+1);
  }

  setPrevious=()=>{
    if(this.state.animating){
      return;
    }
    this.setActiveIndex((this.state.activeIndex==0)?this.state.items.length-1:this.state.activeIndex+1);
  }

  goToIndex=(index)=>{
    if(this.state.animating){
      return;
    }
    this.setActiveIndex(index);
  }

  setActiveIndex=(index)=>{
    this.setState({activeIndex:index});
  }

  getCarouselItems=()=>{
    return this.state.items.map(item=>{
      return(
        <CarouselItem
          onExiting={()=>this.setState({animating:true})}
          onExited={()=>this.setState({animating:false})}
          key={item.src}
        >
          <img src={item.src} style={imageStyle}/>
        </CarouselItem>
      )
    })
  }

  render(){
    return(
      <div style={mainContainer}>
        <Row style={homeAboveBar}></Row>
        <Carousel
          activeIndex={this.state.activeIndex}
          next={this.setNext}
          previous={this.setPrevious}
          interval={6000}
        >
          <CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex}/>
          {this.getCarouselItems()}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.setPrevious}/>
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.setNext} />
        </Carousel>
        <h1 style={makeFriendsText}>Make Friends</h1>
        <h1 style={eatFoodText}>Eat Food</h1>
        <div style={missionTitle}>
          Our Mission
        </div>
        <div style={missionBody}>
          <p>
            In college and in early adulthood, dinner is a very lonely and solo affair... We are trying to change this. We believe that dinner is supposed to be a time for getting to know people and having a fun time with friends. We are Friends Eat. Our mission is to create a platform to promote face to face socialization along with helping you to save time preparing meals.
          </p>
          <p>
            Our website is easy to use, once logged in, you will be able to browse all of the currently available and open meal groups. Signing up is as easy as connecting your gmail account. If you find a group you like then you can send a request to join the group. Once you have been accepted then you are able to pick a night to cook and let your group know what you will be preparing for the week. If none of the available groups are a right fit for you, you are welcome to create your own group! 
          </p>
        </div>
        
      </div>
    )
  }
}

function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps, actions)(Home);