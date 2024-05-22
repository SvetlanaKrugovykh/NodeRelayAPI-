const pekaoExchangeController = require('../controllers/pekaoExchangeController')
const isAuthorizedGuard = require('../guards/is-authorized.guard')
const dataExchangeSchema = require('../schemas/pekaoExchange.schema')
module.exports = (fastify, _opts, done) => {

  fastify.route({
    method: 'POST',
    url: '/pekao/get-access-token/',
    handler: pekaoExchangeController.getData,
    preHandler: [
      isAuthorizedGuard
    ],
    schema: dataExchangeSchema
  })

  fastify.route({
    method: 'POST',
    url: '/pekao/get-data/',
    handler: pekaoExchangeController.getData,
    preHandler: [
      isAuthorizedGuard
    ],
    schema: dataExchangeSchema
  })

  done()
}

