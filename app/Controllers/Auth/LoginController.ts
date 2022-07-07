import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class LoginController {
  public async loginAction({ view, request, response, auth }: HttpContextContract) {
    if (request.method().toLowerCase() === 'get') {
      return view.render('auth/login')
    }

    const { email, password } = await request.validate(LoginValidator)

    const user = await User.query().where('email', email).firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest('Informations incorrectes')
    }
    await auth.use('web').login(user)

    return response.redirect().toRoute('ShowTodolistController.showTodolistAction')
  }
}
