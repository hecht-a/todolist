import { SimplePaginatorMetaKeys } from '@ioc:Adonis/Lucid/Database'
import { LucidModel, ModelRelations, NamingStrategyContract } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'

export class SnakeCaseNamingStrategy implements NamingStrategyContract {
  public tableName(model: LucidModel): string {
    return string.snakeCase(model.name)
  }

  public columnName(_: LucidModel, attributeName: string): string {
    return string.snakeCase(attributeName)
  }

  public serializedName(_: LucidModel, attributeName: string): string {
    return string.snakeCase(attributeName)
  }

  public relationLocalKey(
    relation: ModelRelations['__opaque_type'],
    model: LucidModel,
    relatedModel: LucidModel
  ): string {
    if (relation === 'belongsTo') {
      return relatedModel.primaryKey
    }

    return model.primaryKey
  }

  public relationForeignKey(
    relation: ModelRelations['__opaque_type'],
    model: LucidModel,
    relatedModel: LucidModel
  ): string {
    if (relation === 'belongsTo') {
      return string.camelCase(`${relatedModel.name}_${relatedModel.primaryKey}`)
    }

    return string.camelCase(`${model.name}_${model.primaryKey}`)
  }

  public relationPivotTable(_: 'manyToMany', model: LucidModel, relatedModel: LucidModel): string {
    return string.snakeCase([relatedModel.name, model.name].sort().join('_'))
  }

  public relationPivotForeignKey(_: 'manyToMany', model: LucidModel): string {
    return string.snakeCase(`${model.name}_${model.primaryKey}`)
  }

  public paginationMetaKeys(): SimplePaginatorMetaKeys {
    return {
      total: 'total',
      perPage: 'per_page',
      currentPage: 'current_page',
      lastPage: 'last_page',
      firstPage: 'first_page',
      firstPageUrl: 'first_page_url',
      lastPageUrl: 'last_page_url',
      nextPageUrl: 'next_page_url',
      previousPageUrl: 'previous_page_url',
    }
  }
}
