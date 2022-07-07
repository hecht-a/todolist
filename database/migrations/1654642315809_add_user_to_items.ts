import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('user').references('users.id').notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, () => {})
  }
}
