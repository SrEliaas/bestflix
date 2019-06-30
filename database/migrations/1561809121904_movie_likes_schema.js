'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovieLikesSchema extends Schema {
  up () {
    this.create('movie_likes', (table) => {
      table.increments()

      table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table
      .integer('filme_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('filmes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      
      table.integer('likes', 4).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('movie_likes')
  }
}

module.exports = MovieLikesSchema
