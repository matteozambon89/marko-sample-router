/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-19 23:23:07
*/

/* global */

'use strict'

const appPage = require('~/views/app/page')
const appRoot = require('~/views/app/root')

module.exports = {
  onCreate(input) {
    console.log('root/components/root-route-page2 - onCreate')
    console.log(input)

    this.state = {
      'name': appRoot.name || 'no-name',
      'surname': appRoot.surname
    }

    console.log(this.state)
    console.log('- - -')
  },
  onMount() {
    console.log('root/components/root-route-page2 - onMount')
    console.log(this)
    console.log(this.el)
    console.log('- - -')
  },
  handlePage1Click(e) {

    console.log('access/components/access-route-page2 - handlePage1Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page1')

    e.preventDefault()
  },
  handlePage3Click(e) {

    console.log('access/components/access-route-page2 - handlePage3Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page3')

    e.preventDefault()
  },
  saveSurname() {
    console.log('access/components/access-route-page2 - saveSurname')
    console.log(this)
    console.log(this.getEl('inputSurname'))
    console.log(this.getEl('inputSurname').value)
    console.log('- - -')

    const newValue = this.getEl('inputSurname').value
    appRoot.surname = newValue
  }
}
