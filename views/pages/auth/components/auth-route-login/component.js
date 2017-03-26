/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-25 22:17:51
*/

/* global */

'use strict'

const appAuth = require('~/views/app/auth')

module.exports = {
  onCreate(input) {
    console.log('[auth/auth-route-login] onCreate')

    this.state = {
      'key': input.key,
      'email': appAuth.email,
      'password': appAuth.password
    }
  },
  onMount() {
    console.log('[auth/auth-route-login] onMount')
  },
  onDestroy() {
    console.log('[auth/auth-route-login] onDestroy')
  },
  onSubmitClick(e) {
    console.log('[auth/auth-route-login] onSubmitClick')

    const params = {
      'email': appAuth.email,
      'password': appAuth.password
    }

    alert('Your credentials are: ' + JSON.stringify(params))

    e.preventDefault()
  },
  onRegisterClick(e) {
    console.log('[auth/auth-route-login] handlePage3Click')

    appAuth.goTo('register')

    e.preventDefault()
  },
  onFormChange(e) {
    console.log('[auth/auth-route-login] onFormChange')

    if(e.target.type === 'text' || e.target.type === 'email' || e.target.type === 'password') {
      const newValue = e.target.value
      this.setState(e.target.name, newValue)
      appAuth[e.target.name] = newValue
    }
  }
}
