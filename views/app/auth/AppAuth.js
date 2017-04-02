/*
* @Author: Matteo Zambon
* @Date:   2017-03-16 18:17:10
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-31 00:12:39
*/

'use strict'

const EventEmitter = require('events')

class AppAuth extends EventEmitter {
  constructor() {
    super()

    this._email = ''
    this._password = ''
    this._firstName = ''
    this._lastName = ''
  }

  set email(newEmail) {
    this._email = newEmail
    this._emitChange()
  }

  get email() {
    return this._email
  }

  set password(newPassword) {
    this._password = newPassword
    this._emitChange()
  }

  get password() {
    return this._password
  }

  set firstName(newFirstName) {
    this._firstName = newFirstName
    this._emitChange()
  }

  get firstName() {
    return this._firstName
  }

  set lastName(newLastName) {
    this._lastName = newLastName
    this._emitChange()
  }

  get lastName() {
    return this._lastName
  }

  _emitChange() {
    this.emit('change', {
      'email': this._email,
      'password': this._password,
      'firstName': this._firstName,
      'lastName': this._lastName
    })
  }
}

module.exports = AppAuth
