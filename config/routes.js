/*
* @Author: Matteo Zambon
* @Date:   2017-02-14 23:10:01
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-15 23:17:13
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
  }
]
