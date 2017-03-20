/*
* @Author: Matteo Zambon
* @Date:   2017-03-16 18:17:10
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-18 18:05:49
*/

'use strict'

const EventEmitter = require('events')

class AppRoot extends EventEmitter {
  constructor() {
    super()

    this._currentPage = null
    this._name = ''
    this._surname = ''
  }

  set currentPage(newCurrentPage) {
    this._currentPage = newCurrentPage
    this._emitChange()
  }

  get currentPage() {
    return this._currentPage
  }

  set name(newName) {
    this._name = newName
    this._emitChange()
  }

  get name() {
    return this._name
  }

  set surname(newSurname) {
    this._surname = newSurname
    this._emitChange()
  }

  get surname() {
    return this._surname
  }

  _emitChange() {
    this.emit('change', {
      'name': this._name,
      'surname': this._surname
    })
  }
}

module.exports = AppRoot
