const userRepository = require('../repositories/user_repository')
const {USERTYPES} = require('../db/schema/user_type')
const rabbitmq = require('../utilities/rabbitmq')
const whatsapp = require('../services/whatsappService')
const telegramService = require('../services/telegramService')
const emailService = require('../services/emailService')

const getUsers = async () => await userRepository.getUsers()

const getUserById = async (id) => await userRepository.getUserById(id)

const getUserByMobile = async (mobile) => await userRepository.getUserByMobile(mobile)

const getUserBychatId = async (chatId) => await userRepository.getuserByChatId(chatId)

const getUserByAuthUserId = async (authUserId) => await userRepository.getUserByAuthUserId(authUserId)

const updateUserStatus = async (userId,statusTypeId) => await userRepository.updateUserStatus(userId,statusTypeId) 

const addUser = async (user) => await userRepository.insertUser(user)

const updateUser = async(user) => await userRepository.updateUser(user)

const deleteUser = async(id) => await userRepository.deleteUser(id)

const addTelegramUser = async(mobile,chatId) => {
      const user = await getUserByMobile(mobile)
      user.chatId = chatId
      return await updateUser(user)
}
 
 const handleUserNewConsumer = async ()=>{
       const channel = await rabbitmq.consume(rabbitmq.QUEUE_NAMES.MESSAGE_SERVICE_NEW_USER, async (data) => {
            //const id = data.id
            const user = {
                  firstName : data.firstName,
                  familyName : data.familyName,
                  mobile : date.mobile,
                  email: data.email,
                  authUserId : data.id,
                  userTypeId : data.userTypeId,
                  statusTypeId : data.statusTypeId
            }
            

            const insertedUser = await addUser(user)
            const message = "Welcome to Sender, your have registered successfuly and your account is under reviewing" 
            await whatsapp.sendWhatsappMessage(mobile,message)
            
            const telegramUser = await getByUserByMobile(user.mobile)
            if(telegramUser != null && telegramUser.chatId != null && telegramUser.chatId !== "") {
                  await telegramService.sendMessage(telegramUser.chatId,message)
             }
            

            if(user.userTypeId == USERTYPES.AGENT){
                  await emailService.sendEmail(user.email,message)
            }

            //TODO sending sms from sms service 
             
       })
 }


 const handleAcceptedUserConsumer = async () => {
      const channel = await rabbitmq.consume(rabbitmq.QUEUE_NAMES.MESSAGE_SERVICE_ACCEPTED_USER, async (data) => {
            
            const {id,password} = data

            const user = await getUserByAuthUserId(id)
            if(user == null) {return}

            const mobile = user.mobile
            const message = `Welcome to Sender, your account has been aproved and your password is ${password}` 
            await whatsapp.sendWhatsappMessage(mobile,message)

            
            if(user.chatId != null && user.chatId !== "") {
                  await telegramService.sendMessage(user.chatId,message)
             }
            
            user['password'] = password 
            await emailService.sendEmailForAcceptedUser(user)

            //TODO sending sms from sms service
             
       }) 
 }


module.exports = {
      getUsers,
      getUserById,
      getUserBychatId,
      getUserByMobile,
      getUserByAuthUserId,
      addUser,
      updateUser,
      deleteUser,
      updateUserStatus,
      handleUserNewConsumer,
      handleAcceptedUserConsumer,
      addTelegramUser,
 
  }
