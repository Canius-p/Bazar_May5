import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  modelName: 'Product',
  timestamps: true,
})
class Product extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare productName: string;

  @Column({
    type: DataType.STRING,
  })
  declare productDescription: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare productPrice: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare prdouctStockQuantity: number;

  @Column({
    type: DataType.ENUM('available', 'unavailable'),
    defaultValue: 'unavailable',
  })
  declare productStatus: string;

  @Column({
    type: DataType.STRING,
  })
  declare image: string;
}
export default Product;
