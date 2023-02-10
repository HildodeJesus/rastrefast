const OrderRepo = require("../repositories/OrderRepo");
const ScrapingTracker = require("../services/ScrapingTracker");

const { createCustomError } = require("../error/custom-error");

class OrderController {
	async createOrder(req, res, next) {
		try {
			const newOrder = {
				...req.body,
				userId: req.session.user.id,
			};

			await new OrderRepo().create(newOrder);

			res.redirect("/orders/salvos");
		} catch (err) {
			next(err);
		}
	}

	async historyPage(req, res, next) {
		try {
			const userId = req.session.user.id;
			const history = await new OrderRepo().getByUser(userId);

			res.render("history", { history });
		} catch (err) {
			next(err);
		}
	}

	// async index(req, res, next) {
	// 	try {
	// 		const orders = await new OrderRepo().getAll({ raw: true });
	// 		if (orders.length < 1) throw createCustomError("Não há ordens registradas", 400);
	//
	// 		res.render("");
	// 	} catch (err) {
	// 		next(err);
	// 	}
	// }

	async showOrder(req, res) {
		let code = req.query.code;

		const history = await new ScrapingTracker(code).findTracker();

		res.render("result", { order: { history, code } });
	}

	async updateOrder(req, res) {}

	async deleteOrder(req, res, next) {
		try {
			const { id } = req.params;

			const order = await new OrderRepo().getOne(id);
			if (!order) throw createCustomError("Essa encomenda não foi encontrada");

			await new OrderRepo().delete(id);

			req.session.save(() => res.redirect("back"));
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new OrderController();
