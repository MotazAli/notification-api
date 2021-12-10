const {Sequelize ,sequelize} = require('../db_config');
const {UserType} = require('./user_type');
const User = sequelize.define('users', {
    id:{
      type: Sequelize.UUID,
      field: 'id',
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    fullname: {
      type: Sequelize.STRING,
      field: 'fullname' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    familyName: {
      type: Sequelize.STRING,
      field: 'family_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    email: {
      type: Sequelize.STRING,
      field: 'email'
    },
    password: {
      type: Sequelize.STRING,
      field: 'password'
    },
    mobile: {
      type: Sequelize.STRING,
      field: 'mobile'
    },
    address: {
      type: Sequelize.STRING,
      field: 'address'
    },
    gender: {
      type: Sequelize.STRING,
      field: 'gender'
    },
    stcPay: {
      type: Sequelize.STRING,
      field: 'stc_pay'
    },
    NationalNumber: {
      type: Sequelize.STRING,
      field: 'national_number'
    },
    image: {
      type: Sequelize.STRING,
      field: 'image'
    },
    countryId: {
      type: Sequelize.INTEGER,
      field: 'country_id'
    },
    cityId: {
      type: Sequelize.INTEGER,
      field: 'city_id'
    },
    coreUserId: { // sender core .net6  user id
      type: Sequelize.STRING,
      field: 'core_user_id'
    },
    supportUserId: { // sender phoenix user id
      type: Sequelize.STRING,
      field: 'support_user_id'
    },
    userTypeId: {
      type: Sequelize.INTEGER,
      field: 'user_type_id'
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      field: 'is_deleted'
    },
    inserted_at: {
        // field: 'inserted_at',
        type: Sequelize.DATE,
    },
    inserted_at: {
        // field: 'updated_at',
        type: Sequelize.DATE,
    }

    
  }
  , {
    freezeTableName: true, // Model tableName will be the same as the model name
    tableName: "users",
}
  )

  UserType.hasOne(User,{foreignKey: 'user_type_id'});
  User.belongsTo(UserType);


  module.exports = User
