'use strict'

class UserLogin {
  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      required: 'Ops, parece que você está esquecendo algo.',
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error).flashAll()
    return this.ctx.response.redirect('back')
  }
}

module.exports = UserLogin
