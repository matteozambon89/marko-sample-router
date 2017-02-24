/*
* @Author: Matteo Zambon
* @Date:   2017-02-15 00:23:14
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-02-15 00:57:42
*/

/* global $global */

'use strict'

const page = require('page')
const pace = require('pace-js')

pace.start()

window.$global = {}

$global.body = document.querySelector('body')
$global.main = document.querySelector('#main')

page.base('/root')

require('./routes')

page()
