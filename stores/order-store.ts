"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  brand: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {
    firstName: string
    lastName: string
    street: string
    city: string
    postalCode: string
    country: string
    phone: string
  }
  paymentMethod: string
  createdAt: string
  estimatedDelivery?: string
}

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => string
  getOrdersByUserId: (userId: string) => Order[]
  getOrderById: (orderId: string) => Order | null
  updateOrderStatus: (orderId: string, status: Order['status']) => void
}

// Mock orders for testing
const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    userId: '1',
    items: [
      {
        id: '1',
        name: 'Plaquettes de frein avant',
        price: 45.99,
        quantity: 1,
        image: '/images/brake-pads.jpg',
        brand: 'Bosch'
      },
      {
        id: '2',
        name: 'Filtre à huile',
        price: 12.50,
        quantity: 2,
        image: '/images/oil-filter.jpg',
        brand: 'Mann'
      }
    ],
    subtotal: 70.99,
    shipping: 8.90,
    total: 79.89,
    status: 'delivered',
    shippingAddress: {
      firstName: 'Jean',
      lastName: 'Dupont',
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      phone: '06 12 34 56 78'
    },
    paymentMethod: 'Carte bancaire',
    createdAt: '2024-01-20T14:30:00Z',
    estimatedDelivery: '2024-01-25T00:00:00Z'
  },
  {
    id: 'ORD-2024-002',
    userId: '1',
    items: [
      {
        id: '3',
        name: 'Amortisseur arrière',
        price: 89.99,
        quantity: 2,
        image: '/images/shock-absorber.jpg',
        brand: 'Monroe'
      }
    ],
    subtotal: 179.98,
    shipping: 12.90,
    total: 192.88,
    status: 'shipped',
    shippingAddress: {
      firstName: 'Jean',
      lastName: 'Dupont',
      street: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
      phone: '06 12 34 56 78'
    },
    paymentMethod: 'PayPal',
    createdAt: '2024-02-01T09:15:00Z',
    estimatedDelivery: '2024-02-05T00:00:00Z'
  }
]

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: mockOrders,
      currentOrder: null,

      createOrder: (orderData) => {
        const orderId = `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          createdAt: new Date().toISOString()
        }
        
        set(state => ({
          orders: [...state.orders, newOrder],
          currentOrder: newOrder
        }))
        
        return orderId
      },

      getOrdersByUserId: (userId) => {
        return get().orders.filter(order => order.userId === userId)
      },

      getOrderById: (orderId) => {
        return get().orders.find(order => order.id === orderId) || null
      },

      updateOrderStatus: (orderId, status) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        }))
      }
    }),
    {
      name: 'order-storage'
    }
  )
)
