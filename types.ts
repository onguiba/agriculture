
export enum UserRole {
  FARMER = 'FARMER',
  CLIENT = 'CLIENT',
  TRANSPORTER = 'TRANSPORTER',
  ADMIN = 'ADMIN'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_DELIVERY = 'IN_DELIVERY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export type PaymentMethod = 'CASH' | 'MOBILE_MONEY';

export interface User {
  id: string;
  name: string;
  phone: string;
  roles: UserRole[];
  zone: string;
  rating: number;
  avatar?: string;
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  zone: string;
  photos: string[];
  status: 'AVAILABLE' | 'SOLD_OUT';
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  clientId: string;
  clientName: string;
  farmerId: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  transporterId?: string;
  transporterName?: string;
  destination: string;
  deliveryPhoto?: string;
  paymentMethod?: PaymentMethod;
  isPaid?: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'delivery' | 'system';
}
