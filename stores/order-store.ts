import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/types/product"

interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: Array<{
    product: Product
    quantity: number
    price: number
  }>
  total: number
  shippingAddress: {
    street: string
    city: string
    postalCode: string
    country: string
  }
  trackingNumber?: string
}

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  addOrder: (order: Omit<Order, "id" | "date">) => string
  getOrderById: (id: string) => Order | undefined
}

const mockOrders: Order[] = [
  {
    id: "CMD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    items: [
      {
        product: {
          id: "1",
          name: "Plaquettes de Frein Avant",
          brand: "Renault",
          category: "Freinage",
          subCategory: "Plaquettes de Frein",
          partNumber: "REN-PF-7701208265",
          price: 45.99,
          description: "Plaquettes de frein avant haute performance",
          specifications: {},
          compatibility: { brands: ["Renault"], models: ["Clio"], years: [2020] },
          images: [],
          stock: 25,
          lowStockThreshold: 10,
          restockDate: null,
          rating: 4.8,
          reviewCount: 156,
        },
        quantity: 1,
        price: 45.99
      }
    ],
    total: 51.98,
    shippingAddress: {
      street: "123 Rue de la République",
      city: "Paris",
      postalCode: "75001",
      country: "France"
    },
    trackingNumber: "FR123456789"
  },
  {
    id: "CMD-2024-002",
    date: "2024-01-20",
    status: "shipped",
    items: [
      {
        product: {
          id: "2",
          name: "Filtre à Huile",
          brand: "BMW",
          category: "Moteur",
          subCategory: "Filtres à Huile",
          partNumber: "BMW-FO-11427566327",
          price: 28.5,
          description: "Filtre à huile original BMW",
          specifications: {},
          compatibility: { brands: ["BMW"], models: ["Série 3"], years: [2018] },
          images: [],
          stock: 42,
          lowStockThreshold: 15,
          restockDate: null,
          rating: 4.9,
          reviewCount: 203,
        },
        quantity: 2,
        price: 28.5
      }
    ],
    total: 62.99,
    shippingAddress: {
      street: "123 Rue de la République",
      city: "Paris",
      postalCode: "75001",
      country: "France"
    },
    trackingNumber: "FR987654321"
  }
]

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: mockOrders,
      currentOrder: null,

      addOrder: (orderData) => {
        const orderId = `CMD-${Date.now()}`
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          date: new Date().toISOString().split('T')[0]
        }

        set((state) => ({
          orders: [newOrder, ...state.orders],
          currentOrder: newOrder
        }))

        return orderId
      },

      getOrderById: (id) => {
        return get().orders.find(order => order.id === id)
      }
    }),
    {
      name: "order-storage",
    }
  )
)
