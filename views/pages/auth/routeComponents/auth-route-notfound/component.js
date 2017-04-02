/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-04-01 00:05:00
*/

/* global */

'use strict'

const markoRouter = require('marko-router')
const appAuth = require('~/views/app/auth')

module.exports = {
  onCreate(input) {
    console.log('[auth/auth-route-notfound] onCreate')

    this.state = input

    console.log(this.state)
  },
  onMount() {
    console.log('[auth/auth-route-notfound] onMount')
  },
  onDestroy() {
    console.log('[auth/auth-route-notfound] onDestroy')
  },
  onLoginClick(e) {
    console.log('[auth/auth-route-notfound] onLoginClick')

    markoRouter.goTo('login')

    e.preventDefault()
  }
}
