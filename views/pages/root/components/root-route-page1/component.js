/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-22 18:29:01
*/

/* global */

'use strict'

const appRoot = require('~/views/app/root')

module.exports = {
  onCreate(input) {
    console.log('[root-route-page1] onCreate')

    this.state = {
      'name': appRoot.name,
      'surname': appRoot.surname,
      'defaultName': input.defaultName || 'Myself',
      'useDefaultName': appRoot.useDefaultName
    }
  },
  onMount() {
    console.log('[root-route-page1] onMount')
  },
  handlePage2Click(e) {
    console.log('[root-route-page1] handlePage2Click')

    const params = {
      'name': this.state.name
    }

    if(this.state.useDefaultName) {
      params.name = this.state.defaultName
    }

    appRoot.goTo('page2Name', params)

    e.preventDefault()
  },
  handlePage3Click(e) {
    console.log('[root-route-page1] handlePage3Click')

    appRoot.goToInternalUrl('/page3')

    e.preventDefault()
  },
  onFormChange(e) {
    console.log('[root-route-page1] onFormChange')

    if(e.target.type === 'text') {
      const newValue = e.target.value
      this.setState(e.target.name, newValue)
      appRoot[e.target.name] = newValue
    }
    else if(e.target.type === 'checkbox') {
      const newValue = e.target.checked
      this.setState(e.target.name, newValue)
      appRoot[e.target.name] = newValue
    }
  }
}
