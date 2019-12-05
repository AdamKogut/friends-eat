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

export const returnToGroup={
  marginTop:'20px',
  marginLeft:'20px',
  backgroundColor:colors.backgroundColorLight
}

export const dateTitle={
  color:colors.backgroundColorLight,
  marginTop:'40px',
  marginLeft:'10%'
}

export const horizontalLine={
  boxSizing:'border-box',
  width:'80%',
  border:'2px solid '+colors.backgroundColorLight
}

export const formStyle={
  boxSizing:'border-box',
  width:'80%',
  margin:'0 auto',
  marginBottom:'5px',
  color:colors.backgroundColorLight
}

export const saveButtonStyle={
  backgroundColor:colors.backgroundColorLight,
  marginLeft:'10%'
}

export const cardStyles={
  boxSizing:'border-box',
  width:'80%',
  margin:'0 auto',
  marginBottom:'5px',
  border:'0px'
}

export const cardHeaderStyle={
  backgroundColor:colors.sidebarColor,
  color:'white'
}

export const paymentStyle={
  float:"left"
}

export const paidStyle={
  float:'right'
}

export const attendingCheckbox={
  position:'relative',
  left:'25px'
}

export const paidCheckbox={position:'relative',left:'40px',top:'-40px'}

export const paidLabel={position:'relative',left:'-20px'}