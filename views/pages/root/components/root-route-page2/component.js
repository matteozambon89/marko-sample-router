/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-15 23:07:08
*/

/* global $ */

'use strict'

const page = require('page')

module.exports = {
  onCreate(input) {
    console.log('root/components/root-route-page2 - onCreate')
    console.log(input)

    console.log(this.state)
    console.log('- - -')
  },
  onMount() {
    const self = this
    const el = this.el

    console.log('root/components/root-route-page2 - onMount')
    console.log(el)
    console.log('- - -')
  },
  handlePage1Click(e) {

    console.log('access/components/access-route-page2 - handlePage1Click')
    console.log(e)
    console.log('- - -')

    page('/page1')

    e.preventDefault()
  },
  handlePage3Click(e) {

    console.log('access/components/access-route-page2 - handlePage3Click')
    console.log(e)
    console.log('- - -')

    page('/page3')

    e.preventDefault()
  }
}
