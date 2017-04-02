/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-04-01 00:01:02
*/

/* global */

'use strict'

const markoRouter = require('marko-router')
const appRoot = require('~/views/app/root')

module.exports = {
  onCreate(input) {
    console.log('[root/root-route-notfound] onCreate')

    this.state = input

    console.log(this.state)
  },
  onMount() {
    console.log('[root/root-route-notfound] onMount')
  },
  handlePage1Click(e) {
    console.log('[root/root-route-notfound] handlePage1Click')

    markoRouter.goTo('page1')

    e.preventDefault()
  },
  handlePage2Click(e) {
    console.log('[root/root-route-notfound] handlePage2Click')

    markoRouter.goTo('page2')

    e.preventDefault()
  },
  handlePage3Click(e) {
    console.log('[root/root-route-notfound] handlePage3Click')

    markoRouter.goTo('page3')

    e.preventDefault()
  }
}
