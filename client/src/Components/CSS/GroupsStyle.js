var colors = require('../../colors').colors;

export const mainContainer={
  boxSizing:'border-box',
  width:'99%',
  overflowY:'auto', 
  overflowX:'hidden', 
  height:'calc(100vh - 60px)'
}

export const fixRow={
  margin:'0'
}

export const availableTitle = {
  color:colors.backgroundColorLight,
  position:'relative',
  top:'1vh',
  left:'2vw'
}

export const createGroupButton={
  position:'absolute',
  top:'calc(2vh + 60px)',
  right:'2vw',
  backgroundColor:colors.backgroundColorLight
}

export const groupRow={
  ...fixRow,
  marginTop:'20px'
}

export const requestJoinButton={
  float:'right'
}

export const cardBodyPosition={
  float:'left'
}

export const cardStyle={
  marginTop:'10px'
}

export const filterTitle={
  color:colors.backgroundColorLight
}