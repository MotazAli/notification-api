const {Sequelize ,sequelize} = require('../db_config')
const StatusType = sequelize.define('status_types', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        field: 'id'
    },
    type: {
      type: Sequelize.STRING,
      field: 'type' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    arabicType: {
      type: Sequelize.STRING,
      field: 'arabic_type'
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
    tableName: "status_types",
    // schema: 'dbo'
}
  )


const STATUSTYPES = {
  NEW : 1,
  READY:2,
  WORKING:3,
  PROGRESS:4,
  SUSPENDED:5,
  STOPPED:6,
  REVIEWING:7,
  PENALTY:8,
  INCOMPLETE:9,
  COMPLETE:10,
  ACTIVE:11,
  INACTIVE:12
}


  module.exports = {StatusType,STATUSTYPES}