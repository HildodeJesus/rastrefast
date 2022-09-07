const puppeteer = require('../config/puppeteer')

class ScrapingTracker {
  
  constructor (code) {
    this.codeTracker = code
  }

  async findTracker () {
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto(process.env.LINK_SCRAPING_SITE)

    await page.type('#pesquisaPub', this.codeTracker) 

    const submitBtn = await page.$('#submitPesqPub')
    await submitBtn.click()

    await page.waitForNavigation()

    await page.waitForSelector('.milestones li')

    const historyTracker = await page.$$eval('.milestones li', async result => {
      const extraindo = await result.map( li => {
        let hour = li.children[1].innerText
        let info = li.children[2].innerText

        return {
          hour,
          info
        }
      })

      return extraindo
    })
    await browser.close()
    return historyTracker
  }

}

module.exports = ScrapingTracker