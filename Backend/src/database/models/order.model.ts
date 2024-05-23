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
    allowNull: false,
  })
  declare phoneNumber: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare shippingAddre: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [10, 10],
        msg: 'Phone number should be 10 digits',
      },
    },
  })
  declare totalAmount: string;

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
