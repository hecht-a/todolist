import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Item from 'App/Models/Item'
import Note from 'App/Models/Note'
import { SnakeCaseNamingStrategy } from 'App/NamingStrategies/SnakeCase'

export default class NoteItem extends BaseModel {
  public static namingStrategy = new SnakeCaseNamingStrategy()

  @belongsTo(() => Item, {
    foreignKey: 'itemId',
  })
  public item: BelongsTo<typeof Item>

  @belongsTo(() => Note, {
    foreignKey: 'noteId',
  })
  public note: BelongsTo<typeof Note>

  @column({ isPrimary: true })
  public id: number

  @column()
  public itemId: number

  @column()
  public noteId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
