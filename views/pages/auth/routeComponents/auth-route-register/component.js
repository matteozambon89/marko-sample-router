/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-04-01 00:05:05
*/

/* global */

'use strict'

const markoRouter = require('marko-router')
const appAuth = require('~/views/app/auth')

module.exports = {
  onCreate(input) {
    console.log('[auth/auth-route-register] onCreate')

    this.state = {
      'name': appAuth.firstName,
      'surname': appAuth.lastName,
      'email': appAuth.email,
      'password': appAuth.password
    }

    console.log(this.state)
  },
  onMount() {
    console.log('[auth/auth-route-register] onMount')
  },
  onDestroy() {
    console.log('[auth/auth-route-register] onDestroy')
  },
  onLoginClick(e) {
    console.log('[auth/auth-route-register] onLoginClick')

    markoRouter.goTo('login')

    e.preventDefault()
  },
  onSubmitClick(e) {
    console.log('[auth/auth-route-register] handlePage3Click')

    const params = {
      'firstName': appAuth.firstName,
      'lastName': appAuth.lastName,
      'email': appAuth.email,
      'password': appAuth.password
    }

    alert('You are registering: ' + JSON.stringify(params))

    e.preventDefault()
  },
  onFormChange(e) {
    console.log('[auth/auth-route-register] onFormChange')

    if(e.target.type === 'text' || e.target.type === 'email' || e.target.type === 'password') {
      const newValue = e.target.value
      this.setState(e.target.name, newValue)
      appAuth[e.target.name] = newValue
    }
  }
}
