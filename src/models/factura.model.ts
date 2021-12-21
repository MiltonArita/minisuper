import {Entity, model, property, hasMany} from '@loopback/repository';
import {Detallefactura} from './detallefactura.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  cliente: string;

  @property({
    type: 'number',
    required: true,
  })
  rtn: number;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @hasMany(() => Detallefactura)
  detallefacturas: Detallefactura[];

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
