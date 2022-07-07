import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('register', 'RegisterController.registerAction')
  Route.post('register', 'RegisterController.registerAction')

  Route.get('login', 'LoginController.loginAction')
  Route.post('login', 'LoginController.loginAction')

  Route.get('logout', 'LogoutController.logoutAction')
})
  .namespace('App/Controllers/Auth')
  .middleware('alreadyLoggedIn')
