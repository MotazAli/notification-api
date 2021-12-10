const {Sequelize ,sequelize} = require('../db_config')
const UserType = sequelize.define('user_types', {
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
    tableName: "user_types",
    // schema: 'dbo'
}
  )


const getUserTypeName = (user_type_id) => {
    switch (user_type_id){
          case 1: return "admin"
          case 2: return "support"
          case 3: return "captain"
          case 4: return "agent"
    }
}

const getUserTypeId = (user_type_name) => {
  switch (user_type_name.toLower()){
        case "admin": return 1
        case "support": return 2
        case "captain": return 3
        case "agent": return 4
  }
}

const USERTYPES = {
	ADMIN: 1,
	SUPPORT: 2,
	CAPTAIN: 3,
	AGENT: 4,
}


  module.exports = {UserType, getUserTypeName,getUserTypeId,USERTYPES}
