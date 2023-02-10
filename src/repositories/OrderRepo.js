const OrderModel = require("../models/OrderModel");

class Order {
	async getByUser(userId, filters) {
		const orders = await OrderModel.findAll({ where: { userId: userId } });
		return orders;
	}

	async getAll(filters) {
		const orders = await OrderModel.findAll({ ...filters });
		return orders;
	}

	async getOne(id) {
		const order = await OrderModel.findByPk(id);
		return order;
	}

	async create(order) {
		await OrderModel.create(order);
		return;
	}

	async update(body, orderId) {
		await OrderModel.update(body, {
			where: { id: orderId },
		});
	}

	async delete(id) {
		try {
			if (id) {
				await OrderModel.destroy({ where: { id: id } });
				return [true, "Apagado com sucesso!"];
			} else {
				throw "Id não fornecido";
			}
		} catch (error) {
			return [false, error];
		}
	}
}

module.exports = Order;
