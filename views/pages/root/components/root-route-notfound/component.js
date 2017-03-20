/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-19 23:24:17
*/

/* global */

'use strict'

const appPage = require('~/views/app/page')

module.exports = {
  onCreate(input) {
    console.log('root/components/root-route-notfound - onCreate')
    console.log(input)

    this.state = input

    console.log(this.state)
    console.log('- - -')
  },
  onMount() {
    console.log('root/components/root-route-notfound - onMount')
    console.log(this)
    console.log(this.el)
    console.log('- - -')
  },
  handlePage1Click(e) {

    console.log('access/components/access-route-notfound - handlePage1Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page1')

    e.preventDefault()
  },
  handlePage2Click(e) {

    console.log('access/components/access-route-notfound - handlePage2Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page2')

    e.preventDefault()
  },
  handlePage3Click(e) {

    console.log('access/components/access-route-notfound - handlePage3Click')
    console.log(e)
    console.log('- - -')

    appPage.goTo('/page3')

    e.preventDefault()
  }
}
