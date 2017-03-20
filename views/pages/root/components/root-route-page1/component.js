/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-19 23:23:41
*/

/* global */

'use strict'

const appPage = require('~/views/app/page')
const appRoot = require('~/views/app/root')

module.exports = {
  onCreate(input) {
    console.log('root/components/root-route-page1 - onCreate')
    console.log(input)

    this.state = {
      'name': appRoot.name
    }

    console.log(this.state)
    console.log('- - -')
  },
  onMount() {
    console.log('root/components/root-route-page1 - onMount')
    console.log(this)
    console.log(this.el)
    console.log('- - -')
  },
  handlePage2Click(e) {

    console.log('access/components/access-route-page1 - handlePage2Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page2')

    e.preventDefault()
  },
  handlePage3Click(e) {

    console.log('access/components/access-route-page1 - handlePage3Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page3')

    e.preventDefault()
  },
  saveName() {
    console.log('access/components/access-route-page1 - saveName')
    console.log(this)
    console.log(this.getEl('inputName'))
    console.log(this.getEl('inputName').value)
    console.log('- - -')

    const newValue = this.getEl('inputName').value
    appRoot.name = newValue
  }
}
