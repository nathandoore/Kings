'use strict'

const User = use('App/Models/User');

/**
 * @namespace app/controllers/http/user
 * @class UserController
 * @extends Controller
 * @description Controller class exposing methods over the routed endpoint
 * @author Nathan Doore
 */
class UserController {

    /**
    * @public @async @method create
    * @description Creates a user
    * @param {Object} request Data submited from form
    * @param {Object} response Reponse to be sent back to frontend
    * @param {Object} auth Responsible getting user state
    */
    async create({ request, response, auth}) {
        const user = await User.create(request.only(['username', 'email', 'password']));
        await auth.login(user);

        return response.redirect('/');
    }

    /**
    * @public @async @method login
    * @description Authenticates user
    * @param {Object} request Data submited from form
    * @param {Object} response Reponse to be sent back to frontend
    * @param {Object} auth Responsible getting user state
    * @param {Object} session Handles live session changes
    */
    async login({ request, response , auth, session}) {
        const { email, password } = request.all();

        try{
            await auth.attempt(email, password);
            return response.redirect('/');
        }catch(error){
            session.flash({loginError: 'These credentials did not work'})
            return response.redirect('back')
        }
    }
}

module.exports = UserController
