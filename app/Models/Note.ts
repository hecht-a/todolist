import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Note extends BaseModel {
  @belongsTo(() => User)
  public noteOwner: BelongsTo<typeof User>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public content: string

  @column()
  public owner: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
