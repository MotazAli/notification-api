const {Client} = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
const fs = require('fs')
const SESSION_FILE_PATH = './session.json';
let client = null
var sessionData = null
var isAuthenticatedBefore = false

const init = async (fastifyReply) => {


      const isSessionFileAvailable = fs.existsSync(SESSION_FILE_PATH)
      if(isSessionFileAvailable) {
            let sessionFile = fs.readFileSync(SESSION_FILE_PATH)
            sessionData = JSON.parse(sessionFile)
            //sessionData = require(SESSION_FILE_PATH);
      }

      if(client != null && sessionData != null && JSON.stringify(sessionData) !== '{}')
      {
            client = new Client({session: sessionData})
            isAuthenticatedBefore = true
      }

      if(client == null  || 
            client == undefined || 
            client === 'undefined') 
            { 
                  if(sessionData != null && JSON.stringify(sessionData) !== '{}') {
                        client = new Client({session: sessionData})
                        isAuthenticatedBefore = true
                  }
                  else {client = new Client()}
                  
            }

      



      // Save session values to the file upon successful auth
      client.on('authenticated', (session) => {
            try
            {
                  sessionData = session
                  console.log("Session =====>  " + JSON.stringify(session))
                  //const result = await fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session))
                  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
                        if (err) {
                              console.error(err)
                        }
                  })
                  if(isAuthenticatedBefore){
                        return fastifyReply.code(200).send({result : 'CONNECTED'})
                  }
            }
            catch(ex)
            {
                  console.error("authenticated Error ==> "+ ex);
            }

           
      })

      client.on('auth_failure', msg => {
            // Fired if session restore was unsuccessfull
            console.error('AUTHENTICATION FAILURE', msg);
      })


      client.on('qr', qr => {
            isAuthenticatedBefore = false
            qrcode.generate(qr,{small:true},(stringQrcode)=>{
                  return fastifyReply.code(200).send(stringQrcode) 
            })
      })
      
      client.on('ready',() => {
            console.log('WhatsApp ready...')
            //fastifyReply.code(200).send({data : "WhatsApp ready..."})
      })

      client.on("message", message => {
            console.log("Your WhatsApp got message ==> "+message.body)
            //fastifyReply.code(200).send({data : "Your WhatsApp got message ==> "+message })
      })

      client.on('disconnected', (reason) => {
            console.log('Client was logged out', reason);
      })

      client.initialize()
}


const sendMessage = async (number , message ,fastifyReply) => {

      if(client == null) {
            return fastifyReply.code(200).send({result : `Sender WhatsApp client not connected ` , isSent: false})
      }

      const numberId = `${number.toString()}@c.us`
      const isRegistered =  await client.isRegisteredUser(numberId)
      if(isRegistered){
            const result = await client.sendMessage(numberId,message)
            let data = {message:message,number: number} 
            if(result != null && result != "")
            {
                  // const data = {
                  //       message:message,
                  //       number: number,
                  //       result : `message sent successfuly to mobile number ${number.toString()}`,
                  //       isSent : true
                  // } 
                  data['result'] = `message sent successfuly to mobile number ${number.toString()}`
                  data['isSent'] = true
                  return fastifyReply.code(200).send(data)
            }
            else
            {
                  // const data = {
                  //       data : `message didn't send to mobile number ${number.toString()}`,
                  //       isSucces : false
                  // } 
                  data['result'] = `message didn't send to mobile number ${number.toString()}`
                  data['isSent'] = false
                  return fastifyReply.code(200).send(data)
            }
      }

      return fastifyReply.code(200).send({result : `mobile number ${number.toString()} not registered ` , isSent: false})
}


const sendWhatsappMessage = async (number , message ) => {

      if(client == null) {return false }

      const numberId = `${number.toString()}@c.us`
      const isRegistered =  await client.isRegisteredUser(numberId)
      if(isRegistered){
            const result = await client.sendMessage(numberId,message)
            let data = {message:message,number: number} 
            if(result != null && result != ""){ return true}
      }

      return false
}


const logout = async (fastifyReply) => {

      try{  
            if(client == null) {
                  return fastifyReply.code(200).send({result : `Sender WhatsApp client not connected ` , isLoggedOut: false})
            }

            const result = await client.logout()
            console.log("log out result ==> "+result)
            client = null
            sessionData = null
            isAuthenticatedBefore = false
            fs.rm(SESSION_FILE_PATH, (err) => {
                  if (err) {
                        console.error(err)
                        return fastifyReply.code(200).send({result :"session file didn't deleted" , isLoggedOut: false })
                  }
                  console.log("file removed...")
                  return fastifyReply.code(200).send({result :result , isLoggedOut: true })
            })
      }
      catch(error){
            console.error(error)
            return fastifyReply.code(200).send({result: error , isLoggedOut: false })
      }

}


const clientState = async (fastifyReply) => {
      //client = new Client();
      let state
      if(client == null)
      { 
            state = "DISCONNECTED"
            console.log("the client state ==> "+ state )
            return fastifyReply.code(200).send({state:state})
      }

      state =  await client.getState()
      console.log("the client state ==> "+ state.toString() )
      return fastifyReply.code(200).send({state:state.toString()})
}

module.exports = { init , sendMessage,sendWhatsappMessage ,logout,clientState}






