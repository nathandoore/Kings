'use strict'

const Quote = use('App/Models/Quote');

/**
 * @namespace app/controllers/http/quote
 * @class QuoteController
 * @extends Controller
 * @description Controller class exposing methods over the routed endpoint
 * @author Nathan Doore
 */
class QuoteController {

    /**
    * @public @async @method home
    * @description Get a list of all quotes
    * @param {Object} view Responsible for view rendering
    */
    async home({view}) {
        const quotes = await Quote.all();
        
        return view.render('quotes.index', { quotes: quotes.toJSON() })
    }

    /**
    * @public @async @method userIndex
    * @description Gets quotes related to user
    * @param {Object} view Responsible for view rendering
    * @param {Object} auth Responsible getting user state
    */
    async userIndex({view, auth}) {
        const quotes = await auth.user.quotes().fetch();

        return view.render('quotes.quotes', {quotes: quotes.toJSON() })
    }

    /**
    * @public @async @method create
    * @description Creates a quote
    * @param {Object} request Data submited from form
    * @param {Object} response Reponse to be sent back to frontend
    * @param {Object} session Handles live session changes
    * @param {Object} auth Responsible getting user state
    */
    async create({ request, response, session, auth}) {
        const quote = request.all();
        await auth.user.quotes().create({
            title: quote.title,
            description: quote.description,
            type: quote.type,
            price: quote.price,
        });

        session.flash({ message: 'Your quote has been posted!' });
        return response.redirect('back');
    }

    /**
    * @public @async @method view
    * @description Gets individual item
    * @param {Object} params Properties of quote
    * @param {Object} view Responsible for view rendering
    */
    async view({ params, view }) {
        const quote = await Quote.find(params.id);

        return view.render('quotes.view', { quote: quote });
    }

    /**
    * @public @async @method delete
    * @description Deletes a quote
    * @param {Object} request Data submited from form
    * @param {Object} session Handles live session changes
    * @param {Object} params Properties of quote
    */
    async delete({ response, session, params }) {
        const quote = await Quote.find(params.id);
        await quote.delete();

        session.flash({ message: 'Your quote has been deleted!' });
        return response.redirect('back');
    }

    /**
    * @public @async @method edit
    * @description Gets object to populate update form
    * @param {Object} params Properties of quote
    * @param {Object} view Responsible for view rendering
    */
    async edit({ params, view }) {
        const quote = await Quote.find(params.id);

        return view.render('quotes.edit', { quote: quote });
    }

    /**
    * @public @async @method update
    * @description Updates a quote
    * @param {Object} request Data submited from form
    * @param {Object} response Reponse to be sent back to frontend
    * @param {Object} session Handles live session changes
    * @param {Object} params Properties of quote
    */
    async update ({ request, response, session, params }) {
        const quote = await Quote.find(params.id);
        quote.title = request.all().title;
        quote.description = request.all().description;
        quote.type = request.all().type;
        quote.price = request.all().price;
        await quote.save();

        session.flash({ message: 'Your quote has been updated. '});
        return response.redirect('/my-quotes');
    }
}

module.exports = QuoteController
