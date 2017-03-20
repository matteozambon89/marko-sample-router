/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-17 00:51:54
*/

/* global */

'use strict'

module.exports = {
  onCreate(input) {
    console.log('components/my-footer - onCreate')
    console.log(input)

    console.log(this.state)
    console.log('- - -')
  },
  onMount() {
    const el = this.el

    console.log('components/my-footer - onMount')
    console.log(el)
    console.log('- - -')
  }
}
