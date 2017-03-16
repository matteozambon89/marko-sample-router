/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-15 23:12:05
*/

/* global $ */

'use strict'

module.exports = {
  onCreate(input) {
    console.log('components/my-header - onCreate')
    console.log(input)

    console.log(this.state)
    console.log('- - -')
  },
  onMount() {
    const el = this.el

    console.log('components/my-header - onMount')
    console.log(el)
    console.log('- - -')
  }
}
