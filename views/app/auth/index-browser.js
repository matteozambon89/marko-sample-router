/*
* @Author: Matteo Zambon
* @Date:   2017-03-16 18:44:00
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-23 17:46:57
*/

'use strict'

// Polyfill to support native ES6 promises
const AppAuth = require('./AppAuth')

module.exports = window.appAuth = new AppAuth()
