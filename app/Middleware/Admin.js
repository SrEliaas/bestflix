'use strict'

class Admin {
 
  async handle ({ response, auth }, next) {
    if (auth.user.is_admin === 'true' || auth.user.email == 'sreliaas@gmail.com') {
      await next()
    } else {
      return response.redirect('back')
    }
  }
}

module.exports = Admin
