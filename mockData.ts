
import { User, UserRole, Product, Order, OrderStatus } from './types';

export const currentUser: User = {
  id: 'u1',
  name: 'Moussa Traoré',
  phone: '+223 70000000',
  roles: [UserRole.FARMER, UserRole.CLIENT],
  zone: 'Bamako, Zone Industrielle',
  rating: 4.8
};

export const mockProducts: Product[] = [
  {
    id: 'p1',
    farmerId: 'f1',
    farmerName: 'Jean Dupont',
    name: 'Pommes de terre',
    quantity: 500,
    unit: 'kg',
    pricePerUnit: 450,
    zone: 'Sikasso',
    photos: ['https://picsum.photos/seed/potato/400/300'],
    status: 'AVAILABLE'
  },
  {
    id: 'p2',
    farmerId: 'f2',
    farmerName: 'Awa Koné',
    name: 'Mangues Kent',
    quantity: 1200,
    unit: 'kg',
    pricePerUnit: 300,
    zone: 'Bougouni',
    photos: ['https://picsum.photos/seed/mango/400/300'],
    status: 'AVAILABLE'
  }
];

export const mockTransporters: User[] = [
  {
    id: 't1',
    name: 'Bakary Transport',
    phone: '+223 66666666',
    roles: [UserRole.TRANSPORTER],
    zone: 'Axe Bamako-Sikasso',
    rating: 4.5
  }
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    productId: 'p1',
    productName: 'Pommes de terre',
    clientId: 'u1',
    clientName: 'Moussa Traoré',
    farmerId: 'f1',
    quantity: 50,
    totalPrice: 22500,
    status: OrderStatus.PENDING,
    destination: 'Bamako Market'
  }
];
