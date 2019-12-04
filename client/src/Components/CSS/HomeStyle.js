var colors = require('../../colors').colors;

export const homeAboveBar = {
  height:'5vh',
}

export const imageStyle = {
  height:'60vh',
  boxSizing:'border-box',
  width:'100%',
  objectFit:'cover'
}

const titleTextBase = {
  zIndex:800,
  color:colors.sidebarColor,
  fontFamily:'Titillium Web',
  fontSize:'80px',
  opacity:'0.65',
  textShadow:'5px 5px #242424'
}

export const makeFriendsText={
  position:'relative',
  top:'-55vh', 
  left:'5vw',
  ...titleTextBase
}

export const eatFoodText={
  position:'relative',
  top:'-25vh',
  left:'50vw',
  ...titleTextBase
}

export const missionTitle={
  textAlign:'center',
  color:colors.backgroundColorLight,
  backgroundColor:colors.darkColor,
  height:'60px',
  border: '2px solid black',
  width:'40vw',
  minWidth:'600px',
  margin:'0 auto',
  marginTop:'-150px',
  fontSize:'40px'
}

export const missionBody={
  textAlign:'center',
  backgroundColor:colors.backgroundColorLight,
  border: '2px solid black',
  width:'40vw',
  minWidth:'600px',
  margin:'0 auto',
  padding:'5px',
  marginBottom:'10px'
}

export const mainContainer={
  boxSizing:'border-box',
  width:'99%',
  overflowY:'auto', 
  overflowX:'hidden', 
  height:'calc(100vh - 60px)'
}