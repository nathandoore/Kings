'use strict'

class LoginUser {
  get rules () {
    return {
      // validation rules
      'email':'required|email',
      'password':'required',
    }
  }

  get messages() {
    return {
      'required': '{{ field }} required.',
      'unique': '{{ field }} already exists.'
    }
  }
  
  async fails(error) {
    this.ctx.session.withErrors(error)
    .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = LoginUser
