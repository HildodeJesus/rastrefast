const {DEFAULT_INTERCEPT_RESOLUTION_PRIORITY} = require('puppeteer')
const puppeteer = require('puppeteer-extra')
const AdBlockerPlugin = require('puppeteer-extra-plugin-adblocker')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(AdBlockerPlugin({ interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY }))
puppeteer.use(StealthPlugin())

module.exports = puppeteer