/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-25 11:17:28
*/

/* global */

'use strict'

const appAuth = require('~/views/app/auth')

module.exports = {
  onCreate(input) {
    console.log('[auth/auth-route-loading] onCreate')

    this.state = input

    console.log(this.state)
  },
  onMount() {
    console.log('[auth/auth-route-loading] onMount')
  },
  onDestroy() {
    console.log('[auth/auth-route-loading] onDestroy')
  }
}
