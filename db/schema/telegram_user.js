const {Sequelize ,sequelize} = require('../db_config');
const {UserType} = require('./user_type');
const User = require('./user');
const TelegramUser = sequelize.define('telegram_users', {
    id:{
      type: Sequelize.UUID,
      field: 'id',
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    userId: {
      type: Sequelize.STRING,
      field: 'user_id' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    userTypeId: {
      type: Sequelize.INTEGER,
      field: 'user_type_id'
    },
    chatId: {
      type: Sequelize.STRING,
      field: 'chat_id' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    mobile: {
      type: Sequelize.STRING,
      field: 'mobile' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    inserted_at: {
        type: Sequelize.DATE,
    },
    inserted_at: {
        type: Sequelize.DATE,
    }

  }
  , {
    freezeTableName: true, // Model tableName will be the same as the model name
    tableName: "telegram_users",
}
  )


  User.hasOne(TelegramUser,{foreignKey: 'user_id'});
  TelegramUser.belongsTo(User);


  UserType.hasOne(TelegramUser,{foreignKey: 'user_type_id'});
  TelegramUser.belongsTo(UserType);



  module.exports = TelegramUser
