import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Item extends BaseModel {
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @column()
  public userId: number

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public category: number

  @column()
  public state: boolean = false

  @column()
  public description: string

  @column.dateTime({
    consume: (date: string) =>
      DateTime.fromJSDate(new Date(date)).setLocale('fr').toFormat('dd/MM/yyyy HH:mm'),
  })
  public start: DateTime

  @column.dateTime({
    consume: (date: string) =>
      DateTime.fromJSDate(new Date(date)).setLocale('fr').toFormat('dd/MM/yyyy HH:mm'),
  })
  public end: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
