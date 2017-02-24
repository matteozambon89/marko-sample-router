/*
* @Author: Matteo Zambon
* @Date:   2017-02-15 00:29:46
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-02-15 00:53:05
*/

'use strict'

const page = require('page')

module.exports = {
  onMount() {
    const el = this.el

    console.log('page1 - mounted')
    console.log(el)

    require('./js/main')()
  },
  page2Click() {
    page('/page/2')
  },
  page3Click() {
    page('/page/3')
  }
}
