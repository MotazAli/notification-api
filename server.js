const fs = require('fs')
const path = require('path')
const fastify = require('fastify')({
      logger: true,
  //http2: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, '.', '', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '.', '', 'cert.pem'))
  }
})

//const fastify = require('fastify')({logger: true})
const PORT= 3000
const userService = require('./services/userService')


fastify.register(require('./routes/whatsappRoutes'),{ prefix: '/whatsapp' })
fastify.register(require('./routes/telegramRoutes'),{ prefix: '/telegram' })



const start = async () => {
      try {
            await fastify.listen(PORT)
            await userService
      } catch (err) {
            fastify.log.error(err)
            process.exit(1)
      }
}
start()


