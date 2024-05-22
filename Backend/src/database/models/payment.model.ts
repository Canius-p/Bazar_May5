import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'payment',
  modelName: 'Payment',
  timestamps: true,
})
class Payment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;
  @Column({
    type: DataType.ENUM('COD', 'ONLINE'),
  })
  declare paymentMethod: string;

  @Column({
    type: DataType.ENUM('Unpdaid', 'Paid'),
  })
  declare paymentStatus: string;

  @Column({
    type: DataType.NUMBER,
  })
  declare quantity: number;
}

export default Payment;
