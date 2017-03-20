/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-19 23:21:45
*/

/* global */

'use strict'

const appPage = require('~/views/app/page')

module.exports = {
  onCreate(input) {
    console.log('root/components/root-route-page4 - onCreate')
    console.log(input)

    this.state = {
      'name': '',
      'surname': ''
    }

    console.log(this.state)
    console.log('- - -')
  },
  onMount() {
    console.log('root/components/root-route-page4 - onMount')
    console.log(this)
    console.log(this.el)
    console.log('- - -')

    this.setState('name', appPage.currentCtx.params.name)
    this.setState('surname', appPage.currentCtx.params.surname)
  },
  handlePage1Click(e) {

    console.log('access/components/access-route-page4 - handlePage1Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page1')

    e.preventDefault()
  }
}
