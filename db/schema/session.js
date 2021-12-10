const {Sequelize ,sequelize} = require('../db_config');
const User = require('./user');
const Session = sequelize.define('sessions', {
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
    token: {
      type: Sequelize.STRING,
      field: 'token'
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
    tableName: "sessions",
    // schema: 'dbo'
}
  )

  User.hasOne(Session,{foreignKey: 'user_id'});
  Session.belongsTo(User);


  module.exports = Session
