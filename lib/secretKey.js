'use strict'
var Promise = require('bluebird')
var request = require('request-promise')
var isUrl = require('./url')

function secretKey (origin) {
  return new Promise(function (resolve, reject) {
    if (origin && isUrl(origin)) {
      request(origin)
        .then(function (body) {
          resolve(body)
        }).catch(function (error) {
          reject('Failed to fetch secret key from URL! ' + error)
        })
    } else {
      resolve(origin)
    }
  })
}

module.exports = secretKey
