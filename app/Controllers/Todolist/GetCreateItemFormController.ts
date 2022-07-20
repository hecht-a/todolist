import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { inject } from '@adonisjs/fold'
import FormatDateFromParams from 'App/Services/todolist/FormatDateFromParams'

@inject()
export default class GetCreateItemFormController {
  constructor(private formatDateFromParams: FormatDateFromParams) {}

  public async getCreateItemFormAction({ request, view }: HttpContextContract) {
    const { date } = request.qs()

    return view.render('todolist/createItem', {
      date: this.formatDateFromParams.invoke(date),
    })
  }
}
