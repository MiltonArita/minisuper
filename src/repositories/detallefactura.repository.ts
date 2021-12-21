import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MinisuperDataSource} from '../datasources';
import {Detallefactura, DetallefacturaRelations, Factura, Producto} from '../models';
import {FacturaRepository} from './factura.repository';
import {ProductoRepository} from './producto.repository';

export class DetallefacturaRepository extends DefaultCrudRepository<
  Detallefactura,
  typeof Detallefactura.prototype.id,
  DetallefacturaRelations
> {

  public readonly factura: BelongsToAccessor<Factura, typeof Detallefactura.prototype.id>;

  public readonly producto: BelongsToAccessor<Producto, typeof Detallefactura.prototype.id>;

  constructor(
    @inject('datasources.minisuper') dataSource: MinisuperDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Detallefactura, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
