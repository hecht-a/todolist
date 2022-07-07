import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AlreadyLoggedIn {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.user) {
      return response.redirect().toRoute('ShowTodolistController.showTodolistAction')
    }
    await next()
  }
}
