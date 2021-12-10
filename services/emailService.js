const sendgrid = require('../utilities/sendgrid')
const {USERTYPES} = require('../db/schema/user_type')

const sendEmail = async (emailTo,emailBody,is_html = false) => {

      try {
            if(user == null) {return false}

            if(is_html){
                  await sendgrid.sendEmail(emailTo,"Sender Account Info","",emailBody)
            }
            else{
                  await sendgrid.sendEmail(emailTo,"Sender Account Info",emailBody)
            }
            return true        
      } catch (error) {
          console.log(error)  
          return false
      }
  
}


const sendEmailForAcceptedUser = async (user) => {

      try {
            if(user == null) {return false}

            let message = "" 
            if(user.userTypeId == USERTYPES.AGENT){
                  message = buildAgentEmailMessage(user.coreUserId,user.fullname,user.email,user.password,user.session.token)
            }
            else if(user.userTypeId == USERTYPES.ADMIN){
                  message = buildAdminEmailMessage(user.fullname,user.email,user.password)
            }
            if(user.userTypeId == USERTYPES.SUPPORT){
                  message = buildSupportEmailMessage(user.fullname,user.email,user.password)
            }

            await sendgrid.sendEmail(user.email,"Sender Account Info","",message)
            return true        
      } catch (error) {
          console.log(error)  
          return false
      }
  
}


const buildAgentEmailMessage = (id,fullname,email,password,token) => {
      return "<h2>Welcome to Sender, Your Profile "+fullname +" has accepted </h2>"
                          + "<br>"
                       + "<p> here is your account information, please keep it secure </p>"
                       + "<p>" + "<strong> your agent Id is: </strong> " + id + "</p>"
                       + "<p>" + "<strong> your username is: </strong> " + email + "</p>"
                       + "<p>" + "<strong> your password is: </strong> " + password + "</p>"
                       + "<p>" + "<strong> your Token Auth is: </strong> " + token + "</p>"
                       + "<br>"
                       + "<p>Now you can manage your resources by Sender API or through Sender website for agents </p>"
                       + "<p><a target='_blank' href='https://agent.sender.world'>visit Sender for agents</a></p>";
}


const buildAdminEmailMessage = (fullname,email,password) => {
      return "<h2>Welcome to Sender, Your Admin Profile  (" +fullname + ")  has accepted </h2>"
      
            + "<br>"
         + "<p> here is your account information, please keep it secure </p>"
         + "<p>" + "<strong> your username is: </strong> " + email + "</p>"
         + "<p>" + "<strong> your password is: </strong> " + password + "</p>"
         + "<br>"
         + "<p>Now you can login to Sender manage website </p>"
         + "<p><a target='_blank' href='https://manage.sender.world/admin'>visit Sender Manage Admin</a></p>"
}


const buildSupportEmailMessage = (fullname,email,password) => {
      return "<h2>Welcome to Sender, Your Profile  (" + fullname + ")  has accepted </h2>"
      
            + "<br>"
         + "<p> here is your account information, please keep it secure </p>"
         + "<p>" + "<strong> your username is: </strong> " + email + "</p>"
         + "<p>" + "<strong> your password is: </strong> " + password + "</p>"
         + "<br>"
         + "<p>Now you can login to Sender manage website </p>"
         + "<p><a target='_blank' href='https://manage.sender.world'>visit Sender Manage </a></p>"
}


module.exports = {sendEmail,sendEmailForAcceptedUser}