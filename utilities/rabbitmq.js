const amqp = require('amqplib')
const HOST = "http://localhost:5672" // chnage it to the real hosting server
let connection = null

const connect = async () =>{
      try {
            connection = await amqp.connect(HOST)
            return connection
      } catch (error) {
            console.log(error)
            return null
      }
}


const createChannel = async (queue) => {

      try {
            if( connection == null) {
                  connection = await amqp.connect(HOST)
            }
            const channel = await connection.createChannel()
            await channel.assertQueue(queue)
            return channel
      } catch (error) {
            console.log(error)
            return null
      }  
}


const consume = async(queue, callback,channel = null) => {
      try {

            if( connection == null) {
                  connection = await amqp.connect(HOST)
            }
            if(channel == null){
                  channel = await connection.createChannel()
            }
            await channel.assertQueue(queue)
            channel.consume(queue, data => {
                  console.log(`consumed from queue ${queue}`,Buffer.from( data.content))
                  await callback( Buffer.from( data.content))
                  channel.ack(data)
            })
            return channel
      } catch (error) {
            console.log(error)
            return null
      } 
}


const disconnect = async () =>{
      try {
            if( connection == null ) {return true}
            await connection.close()
            connection = null 
            return true
      } catch (error) {
            console.log(error)
            return false
      }
} 

const send = async (queue,data,channel = null) =>{
      try {
            if( connection == null) {
                  connection = await amqp.connect(HOST)
            }
            if(channel == null){
                  channel = await connection.createChannel()
            }

            await channel.assertQueue(queue)
            const jsonDataStringfy = JSON.stringify(data)
            await channel.sendToQueue(queue,Buffer.from(jsonDataStringfy))
            await channel.close()
            return true
      } catch (error) {
            console.log(error)
            return false
      }
} 



const QUEUE_NAMES = {
      CORE_SERVICE_NEW_USER : "CoreServiceNewUser",
      CORE_SERVICE_UPDATE_USER : "CoreServiceUpdateUser",
      CORE_SERVICE_DELETE_USER : "CoreServiceDeleteUser",
      SUPPORT_SERVICE_NEW_USER : "SupportServiceNewUser",
      SUPPORT_SERVICE_UPDATE_USER : "SupportServiceUpdateUser",
      SUPPORT_SERVICE_DELETE_USER : "SupportServiceDeleteUser",
      MESSAGE_SERVICE_NEW_USER : "MessageServiceNewUser",
      MESSAGE_SERVICE_ACCEPTED_USER : "MessageServiceAcceptedUser"
}



module.exports = {consume,send,createChannel,disconnect,QUEUE_NAMES}




