/*
* @Author: Matteo Zambon
* @Date:   2017-03-16 18:44:00
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-18 18:39:17
*/

'use strict'

// Polyfill to support native ES6 promises
const AppPage = require('./AppPage')

module.exports = window.appPage = new AppPage()
