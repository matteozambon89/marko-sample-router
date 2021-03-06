/*
* @Author: Matteo Zambon
* @Date:   2017-03-16 18:44:00
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-21 23:00:37
*/

'use strict'

// Polyfill to support native ES6 promises
const AppRoot = require('./AppRoot')

module.exports = window.appRoot = new AppRoot()
