'use strict'

const User = use('App/Models/User')

class UserController {

    async create({ request, response, auth, session }) {
        if (request.input('password') === request.input('c-password')) {
            const user = await User.create(request.only(['username' ,'email', 'password']))
            await auth.login(user)

            return response.redirect('/')
        } else {
            session.flash({ registerError: 'Ops, as senhas não são iguais!' })
        }
    }

    async login({ request, response, auth, session }) {
        try {
            const { email, password } = request.all()
            await auth.attempt(email, password)

            return response.redirect('/')
        } catch (error) {
            session.flash({ loginError: 'Ops, Email ou Senha incorretos!' })
        }
    }
}

module.exports = UserController
