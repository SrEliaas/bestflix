'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FilmeSchema extends Schema {
  up () {
    this.table('filmes', (table) => {
      table.string('movieFile')
      table.string('moviePoster')

      table.integer('likes')
    })
  }

  down () {
    this.table('filmes', (table) => {
    })
  }
}

module.exports = FilmeSchema
