'use strict'

class UserRegister {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      username: 'required|unique:users',
      password: 'required'
    }
  }

  get messages() {
    return {
      required: 'Ops, parece que você está esquecendo algo.',
      unique: 'Ops, parece que o {{ field }} já está em uso.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = UserRegister
