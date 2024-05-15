import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'carts',
  modelName: 'Cart',
  timestamps: true,
})
class Cart extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    AllowNull: false,
  })
  declare categoryName: string;
}
