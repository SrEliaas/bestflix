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

Route.get('/', 'FilmeController.index')

// === USER === //
// CREATE USER
Route.post('/signup', 'UserController.create').validator('UserRegister')
// LOGIN USER
Route.post('/login', 'UserController.login').validator('UserLogin')

// PERFIL
Route.on('/perfil').render('perfil').middleware(['auth'])

// LOGOUT
Route.get('/logout', async ({auth, response}) => {
    await auth.logout()
    return response.redirect('/')
}).middleware(['auth'])

// WATCH
Route.get('/watch/:slug', 'FilmeController.watch').middleware(['auth'])
// LIKE
Route.get('/like/:id', 'MovieLikeController.create').middleware(['auth'])



// ======= ADMIN ======== //
// DASHBOARD
Route.on('/admin').render('admin.dashboard').middleware(['admin'])

// UPLOAD
Route.on('/upload').render('admin.upload').middleware(['admin'])
Route.post('/upload', 'FilmeController.create').middleware(['admin'])