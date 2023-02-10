const app = require("./app");

const connection = require("./database/index");

const port = process.env.PORT || 8000;

(async function () {
	try {
		await connection.authenticate();
		console.log("Database connect!");
		app.listen(port, () => console.log(`Server listening in the port ${port}`));
		console.log(`Acesse em http://localhost:${port}`);
	} catch (err) {
		console.log(err);
	}
})();
