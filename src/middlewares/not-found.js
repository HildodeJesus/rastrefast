module.exports = (req, res) => {
	res.render("error", { msg: "Routes does not exists!", statusCode: 404 });
};
