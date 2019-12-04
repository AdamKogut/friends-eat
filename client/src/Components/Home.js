import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../Redux/Actions';
import {Row, Carousel, CarouselControl, CarouselIndicators, CarouselItem} from 'reactstrap';
import {homeAboveBar, imageStyle, makeFriendsText, eatFoodText, missionTitle, missionBody, mainContainer} from './CSS/HomeStyle';
import image1 from './Resources/002-portland-food-photographer-11(pp_w768_h512).jpg';
import image2 from './Resources/Food-photographer-London-Mixed-Indian-starter.jpg';
import image3 from './Resources/PbPost_ChristmasCookie2016_WhiteChocolate-2.jpg';

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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sagittis lectus nisi, sit amet ultricies neque aliquam nec. Sed quis orci sed ex suscipit semper sed eget velit. Vivamus commodo elit at tincidunt posuere. Mauris quis augue id erat tincidunt maximus a sed ex. Aenean non placerat elit, eu euismod ex. Nullam eu cursus turpis. Sed euismod nunc libero, gravida semper dui hendrerit eu. Proin lobortis fermentum dui, at laoreet ipsum tempor a. Fusce purus nulla, finibus in bibendum sollicitudin, laoreet pellentesque lorem. Donec sit amet lorem vitae nulla iaculis venenatis sed eget tortor.

Vestibulum maximus lacus lacus, et interdum augue vulputate vitae. Curabitur consectetur neque id ex elementum sagittis. Nullam quis orci at nisl tincidunt aliquet. Duis rutrum massa mattis, gravida tellus a, porttitor libero. Nam vel dignissim dolor, in volutpat turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed mollis orci orci, a placerat neque porttitor quis. Suspendisse non posuere mauris. Donec ac lectus nisi. Curabitur bibendum luctus libero quis maximus. Duis bibendum magna vel purus condimentum dictum. Nam a hendrerit orci.

Mauris orci justo, faucibus ac rutrum eget, dapibus at enim. Nulla hendrerit pharetra porta. Nunc efficitur diam ante, quis aliquam ex venenatis sed. Proin consectetur, est sit amet pellentesque efficitur, felis nisl porttitor sapien, vestibulum volutpat erat erat ut magna. Phasellus luctus vitae sapien ut auctor. Donec vel orci hendrerit, aliquam ligula nec, vestibulum tortor. Vivamus semper neque et tortor pulvinar, ut lobortis odio facilisis. Curabitur semper egestas lacus, sed porttitor augue ornare sit amet. In non gravida odio, id semper nisl. Aliquam ullamcorper urna ut nunc consequat faucibus. Integer posuere, ligula a fermentum varius, turpis arcu tristique lacus, id convallis lacus eros non lacus. Nunc nec porttitor magna.

Suspendisse in lacinia lectus. Sed consequat purus vitae arcu efficitur volutpat. Cras in dolor in lorem viverra vestibulum euismod quis nibh. Donec non neque diam. Sed nec volutpat mi, sed egestas justo. Mauris urna orci, varius ac lectus vel, elementum accumsan odio. Ut faucibus lacus non dolor euismod posuere.

Sed feugiat faucibus lectus, ac varius turpis scelerisque vel. Phasellus sodales ut urna id tincidunt. Suspendisse blandit ipsum quis volutpat egestas. Suspendisse molestie scelerisque ullamcorper. Aliquam lacinia neque a suscipit ornare. Maecenas ullamcorper commodo est ac lobortis. Aenean quam felis, egestas sed odio laoreet, semper blandit ex. Nam vel ex eget urna egestas egestas interdum eu felis. Vestibulum porttitor quam sit amet felis dignissim sollicitudin. Nulla egestas placerat lacus nec tempus. Pellentesque non porttitor nisi. Duis id pretium odio, quis euismod neque. Fusce porta scelerisque ante, ac maximus lacus malesuada eu. Ut quis augue id nibh aliquet rhoncus. Nam ullamcorper eget augue ornare mattis. Phasellus ullamcorper augue eu erat ullamcorper, sed pulvinar sapien fringilla.
        </div>
        
      </div>
    )
  }
}

function mapStateToProps({auth}){
  return {auth};
}

export default connect(mapStateToProps, actions)(Home);