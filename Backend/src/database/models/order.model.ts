import multer from 'multer';
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'orders',
  modelName: 'Order',
  timestamps: true,
})
class Order extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare phoneNumber: number;

  @Column({
    type: DataType.STRING,
  })
  declare shippingAddre: string;

  @Column({
    type: DataType.FLOAT,
  })
  declare totalAmount: number;

  @Column({
    type: DataType.ENUM(
      'Pending',
      'Approved',
      'Processing',
      'Delivered',
      'Cancelled'
    ),
    defaultValue: 'Pending',
  })
  declare orderStatus: string;

  @Column({
    type: DataType.STRING,
  })
  declare paymentMethod: string;
}
export default Order;
