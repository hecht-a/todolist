import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Item from 'App/Models/Item'

export default class Note extends BaseModel {
  @belongsTo(() => User)
  public noteOwner: BelongsTo<typeof User>

  @manyToMany(() => Item, {
    pivotTable: 'note_item',
  })
  public items: ManyToMany<typeof Item>

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
