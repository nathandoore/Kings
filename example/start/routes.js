'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'QuoteController.home');

Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');


Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');


Route.get('/logout', async({auth, response}) => {
    await auth.logout();
    return response.redirect('/');
}
);

Route.get('/my-quotes', 'QuoteController.userIndex');


Route.group(() => {
    Route.post('', 'QuoteController.create').validator('CreateQuote');
    Route.get('/view/:id', 'QuoteController.view');
    Route.get('/delete/:id', 'QuoteController.delete');
    Route.get('/edit/:id', 'QuoteController.edit');
    Route.post('/update/:id', 'QuoteController.update').validator('CreateQuote');
}).prefix('/quote');