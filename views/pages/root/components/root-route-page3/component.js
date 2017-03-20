/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-19 23:22:33
*/

/* global */

'use strict'

const appPage = require('~/views/app/page')
const appRoot = require('~/views/app/root')

module.exports = {
  onCreate(input) {
    console.log('root/components/root-route-page3 - onCreate')
    console.log(input)

    this.state = {
      'name': appRoot.name,
      'surname': appRoot.surname
    }

    console.log(this.state)
    console.log('- - -')
  },
  onMount() {
    console.log('root/components/root-route-page3 - onMount')
    console.log(this)
    console.log(this.el)
    console.log('- - -')
  },
  handlePage1Click(e) {

    console.log('access/components/access-route-page3 - handlePage1Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page1')

    e.preventDefault()
  },
  handlePage2Click(e) {

    console.log('access/components/access-route-page3 - handlePage2Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page2')

    e.preventDefault()
  },
  handlePage4Click(e) {

    console.log('access/components/access-route-page3 - handlePage4Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page4/name/' + this.state.name + '/surname/' + this.state.surname)

    e.preventDefault()
  }
}
