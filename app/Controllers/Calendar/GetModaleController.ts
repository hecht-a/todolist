import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GetModaleController {
  public async getModaleAction({ view }: HttpContextContract) {
    return view.render('calendar/modal')
  }
}
