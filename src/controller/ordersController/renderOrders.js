const ScrapingTracker = require("../../services/scrapingTracker")

const oRenderSearchTracker = async (req, res) => {
  let user = []
  if (req.session.user != undefined) {
    user.push(req.session.user)
  }

  let code = await req.query.code

  const historic = await new ScrapingTracker(code).findTracker()

  res.render('result', {user, tracker: {historic, code}})
}

module.exports = {
  oRenderSearchTracker
}