'use strict'
var inquirer = require('inquirer')
var colors = require('colors') // eslint-disable-line no-unused-vars
var secretKey = require('./lib/secretKey')
var fetchChallenges = require('./lib/fetchChallenges')
var generateSql = require('./lib/generateSql')
var writeToFile = require('./lib/writeToFile')

var juiceShopCtfCli = function () {
  var questions = [
    {
      type: 'input',
      name: 'juiceShopUrl',
      message: 'Juice Shop URL to retrieve challenges?',
      default: 'https://juice-shop.herokuapp.com'
    },
    {
      type: 'input',
      name: 'ctfKey',
      message: 'Secret key <or> URL to ctf.key file?',
      default: 'https://raw.githubusercontent.com/bkimminich/juice-shop/master/ctf.key'
    },
    {
      type: 'confirm',
      name: 'deleteBeforeInsert',
      message: 'DELETE all CTFd Challenges before INSERT statements?',
      default: true
    },
    {
      type: 'list',
      name: 'insertHints',
      message: 'INSERT a text hint along with each CTFd Challenge?',
      choices: ['No text hints', 'Free text hints', 'Paid text hints'],
      default: 0
    },
    {
      type: 'list',
      name: 'insertHintUrls',
      message: 'INSERT a hint URL along with each CTFd Challenge?',
      choices: ['No hint URLs', 'Free hint URLs', 'Paid hint URLs'],
      default: 0
    },
    {
      type: 'confirm',
      name: 'selectAfterInsert',
      message: 'SELECT all CTFd Challenges after INSERT statements?',
      default: true
    }
  ]

  console.log()
  console.log('Generate INSERT statements for ' + 'CTFd'.bold + ' (>=1.0.1) with the ' + 'OWASP Juice Shop'.bold + ' challenges')
  inquirer.prompt(questions).then(function (answers) {
    console.log()
    secretKey(answers.ctfKey).then(function (secretKey) {
      fetchChallenges(answers.juiceShopUrl).then(function (challenges) {
        generateSql(challenges, answers.deleteBeforeInsert, answers.insertHints, answers.insertHintUrls, answers.selectAfterInsert, secretKey).then(function (sql) {
          writeToFile(sql).then(function (file) {
            console.log('SQL written to ' + file)
            console.log()
            console.log('For a step-by-step guide to apply the INSERT statements to ' + 'CTFd'.bold + ', please refer to')
            console.log('https://github.com/bkimminich/juice-shop-ctf#populating-the-ctfd-database'.gray)
          }, function (error) {
            console.log(error.red)
          })
        }, function (error) {
          console.log(error.red)
        })
      }, function (error) {
        console.log(error.red)
      })
    }, function (error) {
      console.log(error.red)
    })
  })
}

module.exports = juiceShopCtfCli
