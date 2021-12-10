const {Sequelize ,sequelize} = require('../db_config');
const {StatusType} = require('./status_type');
const User = require('./user');
const UserStatus = sequelize.define('user_status', {
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
    statusTypeId: {
      type: Sequelize.INTEGER,
      field: 'status_type_id'
    },
    isCurrent: {
      type: Sequelize.BOOLEAN,
      field: 'is_current' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    description: {
      type: Sequelize.STRING,
      field: 'description' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    inserted_at: {
        // field: 'inserted_at',
        type: Sequelize.DATE,
    },
    inserted_at: {
        // field: 'updated_at',
        type: Sequelize.DATE,
    }

    // createdAt: {
    //     field: 'inserted_at',
    //     type: Sequelize.DATE,
    // },
    // updatedAt: {
    //     field: 'updated_at',
    //     type: Sequelize.DATE,
    // }
  }
  , {
    freezeTableName: true, // Model tableName will be the same as the model name
    tableName: "user_status",
    // schema: 'dbo'
}
  )


  User.hasMany(UserStatus,{as: 'status' ,foreignKey: 'user_id'});
  UserStatus.belongsTo(User);


  StatusType.hasOne(UserStatus,{foreignKey: 'status_type_id'});
  UserStatus.belongsTo(StatusType);



  module.exports = UserStatus
