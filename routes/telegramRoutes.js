const telegramService = require('../services/telegramService')
module.exports = function telegramRoutes(fastifyInstance,options,done){

      fastifyInstance.get("/", async( request,reply ) =>{
            return reply.code(200).send("connected")
      })

      fastifyInstance.get("/webhooks", async( request,reply ) =>{
            var result = await telegramService.getCurrentWebhookInfo()
            return reply.code(200).send(result)
      })

      fastifyInstance.post("/webhooks", async( request,reply ) =>{
            var result = await telegramService.setWebhook()
            return reply.code(200).send(result)
      })

      fastifyInstance.post("/update", async( request,reply ) =>{
            if(request.body != null && request.body !== undefined && request.body.message != null && request.body.message !== undefined){
                  const body = request.body
                  console.log("Update request event ==>"+ JSON.stringify(body))
                  await telegramService.handleUserMessagesRequests(request.body.message)
            }
            else if(request.body != null && request.body !== undefined && request.body.callback_query != null && request.body.callback_query !== undefined ){
                  const body = request.body
                  console.log("Update request event ==>"+ JSON.stringify(body))
                  await telegramService.handleUserCallBackQueryRequests(request.body.callback_query)
            }
            
            return reply.code(200).send("done")
      })

      done()
}