import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('user', 'user_id')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, () => {})
  }
}
