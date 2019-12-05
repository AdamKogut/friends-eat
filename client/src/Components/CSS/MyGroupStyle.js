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

export const groupTitle={
  color:colors.backgroundColorLight,
  marginTop:'40px',
  marginLeft:'60px'
}

export const horizontalLine={
  boxSizing:'border-box',
  width:'80%',
  border:'2px solid '+colors.backgroundColorLight
}

export const leaveButton={
  backgroundColor:colors.backgroundColorLight,
  float:'right'
}

export const myGroupRow={
  ...fixRow,
  boxSizing:'border-box',
  width:'80%',
  margin:'0 auto'
}

export const groupName={
  color:colors.darkColor,
  float:'left'
}

export const venmoPayment={
  color:colors.darkColor,
  position:'relative',
  top:'30px',
  left:'-95px',
  fontSize:'20px'
}

export const paypalPayment={
  color:colors.darkColor,
  position:'relative',
  top:'30px',
  left:'-80px',
  fontSize:'20px'
}

export const cardStyles={
  boxSizing:'border-box',
  width:'80%',
  margin:'0 auto',
  marginBottom:'5px',
  border:'0px'
}

export const paymentStyle={
  float:"left"
}

export const reportButtonStyle={
  float:'right',
  backgroundColor:colors.backgroundColorLight
}

export const cardHeaderStyle={
  backgroundColor:colors.sidebarColor,
  color:'white'
}

export const allowButton={
  marginRight:'10px',
  backgroundColor:colors.backgroundColorLight
}

export const calendarStyle={
  boxSizing:'border-box',
  width:'80%',
  margin:'0 auto'
}