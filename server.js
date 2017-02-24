/*
* @Author: Matteo Zambon
* @Date:   2017-02-14 23:21:33
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-02-23 23:13:54
*/

'use strict'

// Get Config
const config = require('./config')

// Set isProduction flag
const isProduction = process.env.NODE_ENV === 'production'
// Set server port
const port = process.env.PORT || 8080
// Set server host
const host = process.env.HOST || '0.0.0.0'

// Allow ~ usage when requiring local files
require('require-self-ref')

// Install Marko for Node
require('marko/node-require').install()
// Enable res.marko
require('marko/express')

if(!isProduction) {
  // Enable Browser Refresh for Marko
  require('marko/browser-refresh').enable()
  // Enable Browser Refresh for Lasso
  require('lasso/browser-refresh').enable(config.browserRefresh)
}

// Set Lasso Output Directory
config.lasso.outputDir = config.dirs.output

// Configure Lasso
require('lasso').configure(config.lasso)

// Get Express
const express = require('express')
// Initialize Express App
const app = express()

// Lasso Middleware to serve static content
app.use(require('lasso/middleware').serveStatic())

// Routes / Middlewares from config
for(const r in config.routes) {
  // Get current route
  const route = config.routes[r]

  // Ensure method is defaulted to 'use' in case no method is passed
  route.method = route.method || 'use'

  /**
   * Allow method - route - callback
   * @param   {string}           method   HTTP Method or 'use'
   * @param   {string}           route    Route path
   * @param   {function}         callback Callback for Route
   */
  if(route.route && route.callback) {
    app[route.method](route.route, route.callback)
  }
  /**
   * Allow method - route - page
   * @param   {string}           method   HTTP Method or 'use'
   * @param   {string}           route    Route path
   * @param   {string}           page     Page name
   * @param   {object}           params   Parameters object or empty object
   */
  else if(route.route && route.page) {
    app[route.method](route.route, (req, res) => {
      const templatePath = config.dirs.pages + '/' + route.page + '/template.marko'
      const template = require(templatePath)

      route.params = route.params || {}

      route.params.reqParams = req.params

      res.marko(template, route.params)
    })
  }
  /**
   * Allow method - route - page
   * @param   {function}          middleware   Express Middleware
   */
  else if(route.middleware) {
    app.use(route.middleware)
  }
}

// Start listening on http://host:port
app.listen(port, host, () => {
  console.log('Server started! Try it out:\nhttp://' + host + ':' + port + '/')

  if(process.send) {
    process.send('online')
  }
})
