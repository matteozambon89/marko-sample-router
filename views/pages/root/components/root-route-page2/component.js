/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-23 10:24:03
*/

/* global */

'use strict'

const appRoot = require('~/views/app/root')

module.exports = {
  onCreate(input) {
    console.log('[root/root-route-page2] onCreate')

    this.state = {
      'name': appRoot.name,
      'surname': appRoot.surname,
      'errorMessage': ''
    }

    console.log(this.state)
  },
  onMount() {
    console.log('[root/root-route-page2] onMount')

    this.setState('name', appRoot.ctx.params.name)

    if(!this.state.name && !this.state.surname) {
      this.setState('errorMessage', 'Name and Surname are both required')
    }
    else if(!this.state.name) {
      this.setState('errorMessage', 'Name is required')
    }
    else if(!this.state.surname) {
      this.setState('errorMessage', 'Surname is required')
    }
    else {
      this.setState('errorMessage', null)
    }
  },
  handlePage1Click(e) {
    console.log('[root/root-route-page2] handlePage1Click')

    appRoot.goTo('page1')

    e.preventDefault()
  },
  handlePage3Click(e) {
    console.log('[root/root-route-page2] handlePage3Click')

    appRoot.goToInternalUrl('/page3')

    e.preventDefault()
  }
}
