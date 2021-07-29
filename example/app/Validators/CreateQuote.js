'use strict'

class CreateQuote {
  get rules () {
    return {
      // validation rules
      'title':'required',
      'type':'required',
      'price':'required',
    }
  }

  get messages() {
    return {
      'required': '{{ field }} required.',
    }
  }
  
  async fails(error) {
    this.ctx.session.withErrors(error)
    .flashAll();

    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateQuote
