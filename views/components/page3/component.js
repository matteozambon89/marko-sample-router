/*
* @Author: Matteo Zambon
* @Date:   2017-02-15 00:29:46
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-02-15 00:53:19
*/

'use strict'

const page = require('page')

module.exports = {
  onMount() {
    const el = this.el

    console.log('page3 - mounted')
    console.log(el)

    require('./js/main')()
  },
  page1Click() {
    page('/page/1')
  },
  page2Click() {
    page('/page/2')
  }
}
