import type { AuthContract } from '@ioc:Adonis/Addons/Auth'
import Item from 'App/Models/Item'

export default class FindItemByIdAndByUser {
  public async invoke(auth: AuthContract, id: number) {
    return Item.query().select().where('id', id).andWhere('user_id', auth.user!.id).first()
  }
}
