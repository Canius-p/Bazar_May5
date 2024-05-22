import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'orderdetails',
  modelName: 'OrderDetails',
  timestamps: true,
})
class OrderDetails extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
  @Column({
    type: DataType.INTEGER,
  })
  declare quantity: number;
}
export default OrderDetails;
