/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-22 00:27:59
*/

/* global */

'use strict'

const appRoot = require('~/views/app/root')

module.exports = {
  onCreate(input) {
    console.log('[root-route-notfound] onCreate')

    this.state = input

    console.log(this.state)
  },
  onMount() {
    console.log('[root-route-notfound] onMount')
  },
  handlePage1Click(e) {
    console.log('[root-route-notfound] handlePage1Click')

    appRoot.goTo('page1')

    e.preventDefault()
  },
  handlePage2Click(e) {
    console.log('[root-route-notfound] handlePage2Click')

    appRoot.goTo('page2')

    e.preventDefault()
  },
  handlePage3Click(e) {
    console.log('[root-route-notfound] handlePage3Click')

    appRoot.goTo('page3')

    e.preventDefault()
  }
}
