#!/usr/bin/env node
var inquirer = require('inquirer')
var getPort = require('get-port')
var minimist = require('minimist')

var options = minimist(process.argv.slice(2))

var questions = [{
  name: 'server',
  message: 'What type of database do you want to analyze',
  choices: ['mongodb', 'couchdb'],
  type: 'list',
  when: function () {
    return !options.server
  }
}, {
  name: 'host',
  message: 'What is your database server host (name or IP)',
  default: '127.0.0.1'
}, {
  name: 'port',
  message: 'What is your database server port',
  default: function (answers) {
    switch (answers.server) {
      case 'CouchDB':
        return '5984'
      default:
        return '27017'
    }
  }
}, {
  name: 'database',
  message: 'What is the name of the database to analyze'
}, {
  name: 'collection',
  message: 'What is the name of the collection to analyze',
  when: function (answers) {
    return answers.server === 'mongodb'
  }
}, {
  name: 'collection',
  message: 'What is the name of the view to analyze',
  when: function (answers) {
    return answers.server === 'couchdb'
  }
}]
inquirer.prompt(questions, function (answers) {
  getPort(function (error, port) {
    if (error) {
      console.error("Oops, couldn't find a free port to use")
      console.error(error)
      return
    }
    var cli = [
      'ssh',
      '-R',
      port + ':' + answers.host + ':' + answers.port,
      'scan@carson.peterlyons.com',
      '--',
      '--server',
      answers.server.toLowerCase(),
      '--port',
      port,
      '--database',
      answers.database,
      '--collection',
      answers.collection
    ]
    console.log('Run the command below to scan your data:\n')
    console.log(cli.join(' '))
  })
})
