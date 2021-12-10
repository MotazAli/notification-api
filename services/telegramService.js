const languages = require('../utilities/languages')
const QUERIES = require('../utilities/queries')
const userService = require('../services/userService')
const axios = require('axios').default
const TOKEN = "2080116284:AAGo0RkFh5unjis45hli8uFzCDWoP4L_ss8" // Aion8bot
const BOT_TOKEN = `bot${TOKEN}`
const TELEGRAM_API_URL = "https://api.telegram.org"
const BASE_URL = `${TELEGRAM_API_URL}/${BOT_TOKEN}`

const LOCAL_URL="https://9de8-154-134-91-102.ngrok.io"
const UPDEATED_API_URL_PATH = "telegram/update"
const WEBHOOK_URL = `${LOCAL_URL}/${UPDEATED_API_URL_PATH}`




const getCurrentWebhookInfo = async () => {
      const result = await axios.get( BASE_URL+ "/getWebhookInfo")
      if(result != null && result.status == 200){
            console.log("getWebhookInfo ==> " + JSON.stringify(result.data));
            return result.data
      }
      return "No data avaiable"
}





const setWebhook = async () => {
      const result = await axios.post( BASE_URL+ "/setWebhook",{url :WEBHOOK_URL, port:443})
      if(result != null && result.status == 200){
            console.log("setWebhook ==> " + JSON.stringify(result.data));
            return result.data
      }
      return "No data avaiable"
}

const handleUserMessagesRequests = async (userObject) => {
      if(userObject != null)
      {
            const {from,chat,text,contact,reply_to_message} = userObject
            if(text != null && text != ""){
                  await switchCaseMessageText(userObject)
            }
            else if(contact != null && contact !== undefined){
                  await handleMessageContact(userObject)
            }    
      }
}

const handleUserCallBackQueryRequests = async(userCallBackQueryObject) => {
      if(userCallBackQueryObject != null)
      {
            let sentMessageResult = null
            const {from,data,message} = userCallBackQueryObject
            const {id,language_code} = from

            if(data != null && data != ""){

                  switch (data) {
                        case QUERIES.STATUS_CAPTAIN:{
                              const replyMessage =languages[language_code].your_status_as_captain
                              sentMessageResult = await sendMessage(id,replyMessage,null) 
                              break;
                        }
                        case QUERIES.STATUS_AGENT:{
                              const replyMessage =languages[language_code].your_status_as_agent
                              sentMessageResult = await sendMessage(id,replyMessage,null)
                        }
                        default:
                              break;
                  }
            }

            if(sentMessageResult != null && sentMessageResult.status == 200){
                  console.log("handleUserCallBackQueryRequests ==> " + JSON.stringify(sentMessageResult.data));
                  return sentMessageResult.data
            }
            return "No data avaiable"
      }   
}


const switchCaseMessageText = async(userObject) => {
      await onStart(userObject)
      // switch (userObject.text) {
      //       case "/start": {
      //            await onStart(userObject)
      //            break;
      //       }
      //       default:
      //             break;
      // }
}

const handleMessageContact = async (userObject) => {
      await onContact(userObject)
}


const onStart = async(userObject) => {
      //let replyMessage = ""
      //const {id,first_name,last_name}= message.chat
      const {language_code,id,first_name,last_name} = userObject.from
      const telegramUser = await userService.getUserBychatId(id.toString())

      let result = null
      if(telegramUser == null){
            result = await AskForShareContactInfo(id,language_code)
      }
      else{
            result = await AskForWhatYouLookingFor(id,language_code)
      }

      return result

      const welcome = languages[language_code].welcome
      const in_sender = languages[language_code].in_sender
      const share_contact_with_me = languages[language_code].share_contact_with_me



      const replyMessage = `${welcome} ${first_name} ${last_name} ${in_sender} \n${share_contact_with_me}`

      // if(language_code === "en"){
      //       replyMessage = `Welcome ${first_name} ${last_name} in Sender \ncould you please share with me your contact data to varify you `
      // }
      // else //(language_code === "ar")
      // {
      //       replyMessage = `مرحبا  ${last_name} ${first_name}, \n برجاء مشاركة بياناتك حتي اتحقق من هويتك `
      // }

      const keyboard = getNormalKeyboard(language_code)
      const reply_markup = buildReplayMarkup(keyboard)
      const result = await sendMessage(id,replyMessage,reply_markup)
      if(result != null && result.status == 200){
            console.log("onStart Message Event ==> " + JSON.stringify(result.data));
            return result.data
      }
      return "No data avaiable"

}

const onContact= async(userObject)=> {
      //let replyMessage = ""
      //const {id,first_name,last_name}= message.chat
      const {language_code,id,first_name,last_name} = userObject.from
      

      const {phone} = userObject.contact
      const telegramUser  = await userService.addTelegramUser(phone,id)
      if(telegramUser == null || telegramUser.id == null) {
            return "User not registered in sender"
      }

      const result = await AskForWhatYouLookingFor(id,language_code)
      return result

      //const replyMessage = languages[language_code].what_you_asking_for

      // if(language_code === "en"){
      //       replyMessage = `What you asking for?`
      // }
      // else //(language_code === "ar")
      // {
      //       replyMessage = `عن ماذا يكون استفسارك؟`
      // }

      const inlineKeyboard = getInlineKeyboard(language_code)
      const reply_markup = buildInlineKeyboardMarkup(inlineKeyboard)
      const result = await sendMessage(id,replyMessage,reply_markup)
      if(result != null && result.status == 200){
            console.log("onContact Message Event ==> " + JSON.stringify(result.data));
            return result.data
      }
      return "No data avaiable"

}


const AskForShareContactInfo = async(chatId,language_code)=>{
      const welcome = languages[language_code].welcome
      const in_sender = languages[language_code].in_sender
      const share_contact_with_me = languages[language_code].share_contact_with_me



      const replyMessage = `${welcome} ${first_name} ${last_name} ${in_sender} \n${share_contact_with_me}`

      // if(language_code === "en"){
      //       replyMessage = `Welcome ${first_name} ${last_name} in Sender \ncould you please share with me your contact data to varify you `
      // }
      // else //(language_code === "ar")
      // {
      //       replyMessage = `مرحبا  ${last_name} ${first_name}, \n برجاء مشاركة بياناتك حتي اتحقق من هويتك `
      // }

      const keyboard = getNormalKeyboard(language_code)
      const reply_markup = buildReplayMarkup(keyboard)
      const result = await sendMessage(chatId,replyMessage,reply_markup)
      if(result != null && result.status == 200){
            console.log("AskForShareContactInfo Message Event ==> " + JSON.stringify(result.data));
            return result.data
      }
      return "No data avaiable"
}

const AskForWhatYouLookingFor = async (chatId,language_code) => {
      const replyMessage = languages[language_code].what_you_asking_for



      // if(language_code === "en"){
      //       replyMessage = `What you asking for?`
      // }
      // else //(language_code === "ar")
      // {
      //       replyMessage = `عن ماذا يكون استفسارك؟`
      // }

      const inlineKeyboard = getInlineKeyboard(language_code)
      const reply_markup = buildInlineKeyboardMarkup(inlineKeyboard)
      const result = await sendMessage(chatId,replyMessage,reply_markup)
      if(result != null && result.status == 200){
            console.log("AskForWhatYouLookingFor Message Event ==> " + JSON.stringify(result.data));
            return result.data
      }
      return "No data avaiable"
}


const sendMessage = async (chatId,message,reply_markup = null) => {


      let data = {
            chat_id:chatId,
            text:message,
            
      }

      if(reply_markup != null && reply_markup !== undefined)
      {
            data['reply_markup'] = reply_markup
      }

      const result = await axios.post( BASE_URL+ "/sendMessage",data)
      if(result != null && result.status == 200){
            console.log("sendMessage ==> " + JSON.stringify(result.data));
            return result.data
      }
      return "No data avaiable"
}


const getNormalKeyboard = (language_code) => {
      const share_my_contact = languages[language_code].share_my_contact
      const maybe_later = languages[language_code].maybe_later
      let keyboard = []
      let row1 = []
      let row2 = []
      row1.push({text:share_my_contact,request_contact:true})
      row2.push({ text:maybe_later})
      keyboard.push(row1)
      keyboard.push(row2)
      return keyboard
}

const buildReplayMarkup = (keyboard) => {
      return {
            //keyboard: [['Sample text', 'Second sample'], ['Keyboard'], ['I\'m robot']],
            // keyboard: [
            //       [{text:"Send My Contact",request_contact:true}]
            //       , [{ text:'I\'m robot'}]
            // ],
            keyboard: keyboard,
            resize_keyboard: true,
            one_time_keyboard: true,
            //force_reply: true,
        }
}


const getInlineKeyboard = (language_code) => {
      const my_status_as_captain = languages[language_code].my_status_as_captain
      const my_status_as_agent = languages[language_code].my_status_as_agent
      let inlineKeyboard = []
      let row1 = []
      let row2 = []
      row1.push({text:my_status_as_captain,callback_data:QUERIES.STATUS_CAPTAIN})
      row2.push({ text:my_status_as_agent , callback_data:QUERIES.STATUS_AGENT})
      inlineKeyboard.push(row1)
      inlineKeyboard.push(row2)
      return inlineKeyboard
}


const buildInlineKeyboardMarkup = (inline_keyboard) => {
      return {
            //keyboard: [['Sample text', 'Second sample'], ['Keyboard'], ['I\'m robot']],
            // keyboard: [
            //       [{text:"Send My Contact",request_contact:true}]
            //       , [{ text:'I\'m robot'}]
            // ],
            inline_keyboard: inline_keyboard,
            resize_keyboard: true,
            one_time_keyboard: true,
            //force_reply: true,
        }
}




module.exports = {
      getCurrentWebhookInfo,
      setWebhook,
      sendMessage,
      handleUserMessagesRequests,
      handleUserCallBackQueryRequests
}