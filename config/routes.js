/*
* @Author: Matteo Zambon
* @Date:   2017-02-14 23:10:01
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-23 19:02:34
*/

'use strict'

module.exports = [
  {
    'middleware': 'lasso'
  },
  {
    'method': 'get',
    'path': '/',
    'callback': (req, res) => {
      res.redirect('/root')
    }
  },
  {
    'method': 'get',
    'path': '/root',
    'page': 'root',
    'params': {}
  },
  {
    'method': 'get',
    'path': '/root/*',
    'page': 'root',
    'params': {}
  },
  {
    'method': 'get',
    'path': '/auth',
    'page': 'auth',
    'params': {}
  },
  {
    'method': 'get',
    'path': '/auth/*',
    'page': 'auth',
    'params': {}
  }
]
