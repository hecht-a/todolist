import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Note from 'App/Models/Note'

export default class Item extends BaseModel {
  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @manyToMany(() => Note, {
    pivotTable: 'note_item',
  })
  public notes: ManyToMany<typeof Note>

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
