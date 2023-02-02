const Order = require('../../repositories/order')

const oCreateOrder = async (req, res) => {
  if (req.session.user == undefined) {
    return res.redirect('/login')
  }

  const newOrder = {
    ...req.body,
    userId: req.session.user.id
  }

  const order = await new Order().save(newOrder)

  if(order[0]) {
    res.redirect('/')
  } else {
    res.redirect('/')
  }
}

const oGetOrders = async (req, res) => {
  const orders = await new Order().getAll({raw: true})

  if(orders[0]){
    res.json({result: orders[1]})
  } else {
    res.status(500).json({error: orders[1]})
  }
}

const oDeleteOrder = async (req, res) => {
  let id = await req.params.id

  const deletedOrder = await new Order().delete(id)

  if (deletedOrder[0]) {
    return res.redirect('/myHistory')
  } else {
    return res.redirect('/myHistory')
  }
}

module.exports = {
  oGetOrders,
  oCreateOrder,
  oDeleteOrder
}