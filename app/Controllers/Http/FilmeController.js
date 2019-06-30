'use strict'

const Filme = use('App/Models/Filme')

const Helpers = use('Helpers')
const Database = use('Database')

const { validate } = use('Validator')

class FilmeController {

    async index({ view }) {
        const filmes = await Filme.all()
        return view.render('index', { filmes: filmes.toJSON() })
    }

    async create({ request, response, session }) {

        const rules = {
            title: 'required',
            sinopse: 'required',
            slub: 'unique:filmes',
            release: 'required',
            duration: 'required',
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            session.withErrors(validation.messages()).flashAll()
        }

        try {
            const filme = new Filme()
            filme.title = request.input('title')
            filme.sinopse = request.input('sinopse')
            filme.slub = request.input('slub')
            filme.slug = request.input('slug')
            filme.release = request.input('release')
            filme.duration = request.input('duration')

            // MOVIE FILE MP4 - PART
            const movie = request.file('movieFile', {
                types: ['video']
            })

            filme.movieFile = new Date().getTime()+'.'+movie.subtype
            await movie.move(Helpers.publicPath('uploads/movies'), {
                name: filme.movieFile
            })

            // MOVIE POSTER - PART
            const movieP = request.file('moviePoster', {
                types: ['image'],
                size: '5mb'
            })

            filme.moviePoster = new Date().getTime()+'.'+movieP.subtype
            await movieP.move(Helpers.publicPath('upload/movies/poster'), {
                name: filme.moviePoster
            })

            filme.save()
            return response.redirect('back')
                
        } catch (error) {
            return response.send(error)
        }
    }

    async watch({ view, params }) {
        const filme = await Filme.findBy('slug',params.slug)
        const others = await Database.select('*').from('filmes').where('slub', filme.slub).orderBy('id','desc')
        return view.render('watch', { filme: filme.toJSON(), others: others })
    }

}

module.exports = FilmeController
