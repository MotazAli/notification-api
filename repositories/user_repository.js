const User = require('../db/mongo_schemas/user')
const Session = require('../db/schema/session')
const {StatusType,STATUSTYPES} = require('../db/schema/status_type')
const User = require('../db/schema/user')
const UserStatus = require('../db/schema/user_status')
const {UserType} = require('../db/schema/user_type')
const TelegramUser = require('../db/schema/telegram_user')
const { getFromCache, setInCache } = require('../utilities/cache')
const { generateToken } = require('../utilities/token')
const { generatedRandumSixDigits } = require('../utilities/utility')


const getUsers = async (id) =>  await User.find().exec()

const getUserById = async (id) =>  await User.findById(id).exec()

const getUserByMobile = async (mobile) =>  await User.findOne({mobile}).exec()

const getUserByChatId = async (chatId) =>  await User.findOne({chatId}).exec()

const getUserByAuthUserId = async (authUserId) =>  await User.findOne({authUserId}).exec()


const insertUser = async (user) => {
    if(user == null || user === undefined){ return null}
    return await User.create(user)
}


const updateUser = async (user) => {
    if(user == null || user === undefined){ return null}

    const oldUser = await getUserById(user.id)
    if(oldUser == null || oldUser === undefined || oldUser.id == null || oldUser.id === undefined){ return null}

    oldUser.id = user.id || oldUser.id
    oldUser.firstName = user.firstName || oldUser.firstName
    oldUser.familyName = user.familyName || oldUser.familyName
    oldUser.authUserId = user.authUserId || oldUser.authUserId
    oldUser.mobile = user.mobile || oldUser.mobile
    oldUser.email = user.email || oldUser.email
    oldUser.chatId = user.chatId || oldUser.chatId
    oldUser.userTypeId = user.userTypeId || oldUser.userTypeId
    oldUser.statusTypeId = user.statusTypeId || oldUser.statusTypeId
    oldUser.isDeleted = user.isDeleted || oldUser.isDeleted   
    return await oldUser.save()
}

const deleteUser = async (id) => {
    if(user == null || user === undefined){ return null}

    const oldUser = await getUserById(id)
    if(oldUser == null || oldUser === undefined || oldUser.id == null || oldUser.id === undefined){ return null}

    oldUser.isDeleted = true
    return await oldUser.save()
}




module.exports = {
    getUsers,
    getUserById,
    getUserByMobile,
    getUserByChatId,
    getUserByAuthUserId,
    insertUser,
    updateUser,
    deleteUser,
   
}
