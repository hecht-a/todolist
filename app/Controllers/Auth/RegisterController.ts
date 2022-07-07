import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import User from 'App/Models/User'

export default class RegisterController {
  public async registerAction({ request, response, view }: HttpContextContract) {
    if (request.method().toLowerCase() === 'get') {
      return view.render('auth/register')
    }

    const payload = await request.validate(RegisterValidator)
    await User.create(payload)

    return response.redirect().toRoute('LoginController.loginAction')
  }
}
