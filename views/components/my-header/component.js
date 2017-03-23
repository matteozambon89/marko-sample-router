/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-23 10:23:22
*/

/* global $ */

'use strict'

module.exports = {
  onCreate(input) {
    console.log('[my-header] onCreate')
    console.log(input)

    this.state = input

    console.log(this.state)
  },
  onMount() {
    const el = this.el

    console.log('[my-header] onMount')
    console.log(el)
  }
}
