'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilmeSchema extends Schema {
  up () {
    this.create('filmes', (table) => {
      table.increments()
      table.string('title', 80).notNullable()
      table.text('sinopse').notNullable()
      table.string('slub', 80).unique()
      table.text('slug').notNullable()
      table.string('release').notNullable()
      table.integer('duration').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('filmes')
  }
}

module.exports = FilmeSchema
