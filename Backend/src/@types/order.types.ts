import OrderDetails from '../database/models/orderdetails.model';

export interface orderData {
  phoneNumber: string;
  shippingAddress: string;
  totalAmount: number;
  paymentDetails: {
    paymentMethod: paymentMethod;
    paymentStatus: string;
    pidx?: string;
  };
  items: OrderDetails[];
}

export interface orderDetails {
  quantity: number;
  productId: string;
}

export enum paymentMethod {
  COD = 'COD',
  Khalti = 'Khalti',
  Esewa = 'Esewa',
}

export enum paymentStatus {
  Paid = 'Paid',
  Unpaid = 'Unpaid',
}
