import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LogoutController {
  public async logoutAction({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()

    return response.redirect().toRoute('LoginController.loginAction')
  }
}
