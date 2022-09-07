const OrderM = require("../models/Orders");

class Order {

  async getByUser(userId) {
    try {
      const orders = await OrderM.findAll({where: {userId: userId}})
      return [true, orders]
    } catch (error) {
      return [false, error]
    }
  }

  async getAll(filters) {
    try {
      const orders = await OrderM.findAll({...filters})
      return [true, orders]
    } catch (error) {
      return [false, error]
    }
  }

  async save(order, id) {
    try{ 
      if(id) {
        await OrderM.update(order, {
          where: {id: id}
        })

        return [true, 'Atualizado com sucesso!']
      } else {
        await OrderM.create(order)
        return [true, 'Criado com sucesso!']
      }
    } catch (error) {
      return [false, error]
    }
  }

  async delete (id) {
    try {
      if(id) {
        await OrderM.destroy({where: {id: id}})
        return [true, 'Apagado com sucesso!']
      } else {
        throw 'Id não fornecido'
      }
    } catch (error) {
      return [false, error]
    }
  }
  
}

module.exports = Order