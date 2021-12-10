const whatsapp = require("../services/whatsappService")

module.exports = async function whatsappRoutes(fastify,options,done){
      
      fastify.get("/", async (request , reply ) => {
            // reply.code(200).send({data : "done"})
            try {
                  return await whatsapp.init(reply)
            } catch (error) {
                console.error(error) 
                return reply.code(200).send(error) 
            }
            
      })

      fastify.post("/messages", async (request, reply) =>{
            try {
                  const {mobile,message} = request.body
                  return await whatsapp.sendMessage(mobile,message,reply)
            } catch (error) {
                console.error(error) 
                return reply.code(200).send(error) 
            }
            
      })

      fastify.get("/logout", async (request , reply ) => {
            try {
                  // reply.code(200).send({data : "done"})
                  return await whatsapp.logout(reply)
            } catch (error) {
                console.error(error) 
                return reply.code(200).send(error) 
            }
            
      })


      fastify.get("/state", async (request , reply ) => {
            try {
                  // reply.code(200).send({data : "done"})
                  return await whatsapp.clientState(reply)
            } catch (error) {
                console.error(error) 
                return reply.code(200).send(error) 
            }
            
      })

      done()
}