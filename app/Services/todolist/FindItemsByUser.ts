import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Item from 'App/Models/Item'

export default class FindItemsByUser {
  public async invoke(auth: AuthContract) {
    return Item.query().select().where('user_id', auth.user!.id)
  }
}
