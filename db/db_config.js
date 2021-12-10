const Sequelize = require('sequelize')
// local database
const sequelize = new Sequelize('GatewayDB', 'postgres', 'motaz2712', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        schema: "dbo",
        "createdAt": "inserted_at",
        "updatedAt": "updated_at"
        // timestamps: false
    }
})


// remote database
// const sequelize = new Sequelize('bkuglmgz', 'bkuglmgz', 'CwIoBjk0AYBSdwQm6eqpxrNPxNEGWFMf', {
//     host: 'hansken.db.elephantsql.com',
//     dialect: 'postgres',
//     define: {
//         schema: "dbo",
//         "createdAt": "inserted_at",
//         "updatedAt": "updated_at"
//         // timestamps: false
//     }
// })


//local database access from docker
// const sequelize = new Sequelize('GatewayDB', 'postgres', 'motaz2712', {
//     host: 'host.docker.internal',
//     dialect: 'postgres',
//     define: {
//         schema: "dbo",
//         "createdAt": "inserted_at",
//         "updatedAt": "updated_at"
//         // timestamps: false
//     }
// })

module.exports = {Sequelize ,sequelize}


// var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
//var sequelize = new Sequelize('postgres://postgres:motaz2712@localhost:5432/GatewayDB')

// var config = {
//     "define": {
//         "createdAt": "inserted_at",
//         "updatedAt": "updated_at"
//       } /*don't forget to add host, port, dialect, etc.*/
//     }