'use strict'

/**
 * Resourceful controller for interacting with movielikes
 */

const Like = use('App/Models/MovieLike')
const Filme = use('App/Models/Filme')
const Database = use('Database')

class MovieLikeController {
  
  async index ({ request, response, view }) {
  }

  
  async create ({ request, response, params, auth }) {
    const filme = await Filme.find(params.id)
    const check = await Database.from('movie_likes').whereRaw('filme_id = ' + params.id + 'and user_id = ' + auth.user.id)

    if (check == 0) {
        await Like.create({
          user_id: auth.user.id,
          filme_id: params.id,
          likes: +1
        })
        
        filme.likes = filme.likes+1
        await filme.save()
    } else {
      await Database.table('movie_likes').whereRaw('filme_id = ' + params.id + 'and user_id = ' + auth.user.id).delete()
      filme.likes = filme.likes-1
      await filme.save()
    }

  }

 
  async store ({ request, response }) {
  }

  
  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  
  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = MovieLikeController
