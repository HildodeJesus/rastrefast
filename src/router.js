const router = require('express').Router()

const { oCreateOrder, oGetOrders, oSearchTracker, oDeleteOrder, } = require('./controller/ordersController/orderController')
const { oRenderSearchTracker } = require('./controller/ordersController/renderOrders')

const { uRenderHystory, uRenderCreateUser, uRenderLogin } = require('./controller/usersController/renderUsers')
const { uCreateUser, uGetUsers, uLogin, uDeleteUser } = require('./controller/usersController/userController')


/* User Routes */
router.get('/myHistory', uRenderHystory)
router.get('/createAccount', uRenderCreateUser)
router.get('/login', uRenderLogin)

router.post('/api/createAccount', uCreateUser)
router.post('/api/login', uLogin)

/* Orders Routes */
router.get('/tracker', oRenderSearchTracker)

router.get('/api/deleteOrder/:id', oDeleteOrder)
router.post('/api/saveOrder', oCreateOrder)



module.exports = router