import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MinisuperDataSource} from '../datasources';
import {Producto, ProductoRelations, Detallefactura} from '../models';
import {DetallefacturaRepository} from './detallefactura.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly detallefacturas: HasManyRepositoryFactory<Detallefactura, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.minisuper') dataSource: MinisuperDataSource, @repository.getter('DetallefacturaRepository') protected detallefacturaRepositoryGetter: Getter<DetallefacturaRepository>,
  ) {
    super(Producto, dataSource);
    this.detallefacturas = this.createHasManyRepositoryFactoryFor('detallefacturas', detallefacturaRepositoryGetter,);
    this.registerInclusionResolver('detallefacturas', this.detallefacturas.inclusionResolver);
  }
}
