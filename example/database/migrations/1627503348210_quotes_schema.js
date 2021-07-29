'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuotesSchema extends Schema {
  up () {
    this.create('quotes', (table) => {
      table.increments()
      table.string('title')
      table.string('description')
      table.string('type')
      table.integer('price')
      table.integer('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('quotes')
  }
}

module.exports = QuotesSchema
