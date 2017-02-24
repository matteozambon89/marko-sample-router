/*
* @Author: Matteo Zambon
* @Date:   2017-02-14 23:10:01
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-02-23 23:25:39
*/

'use strict'

module.exports = [
  {
    'method': 'get',
    'route': '/',
    'callback': (req, res) => {
      res.redirect('/root')
    }
  },
  {
    'method': 'get',
    'route': '/root',
    'page': 'root',
    'params': {}
  },
  {
    'method': 'get',
    'route': '/root/*',
    'page': 'root',
    'params': {}
  }
]
