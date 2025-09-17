// Datos de ejemplo para el sistema de gestión de pedidos
export const Orders = [
  {
    id: 1,
    customer: "Juan Pérez",
    date: new Date('2024-01-15'),
    status: 'delivered',
    items: [
      { productId: 101, name: "Laptop Dell XPS 13", quantity: 1, price: 1299.99 },
      { productId: 102, name: "Mouse inalámbrico", quantity: 2, price: 29.99 }
    ]
  },
  {
    id: 2,
    customer: "María García",
    date: new Date('2024-01-16'),
    status: 'shipped',
    items: [
      { productId: 103, name: "Teclado mecánico", quantity: 1, price: 89.99 },
      { productId: 104, name: "Monitor 24 pulgadas", quantity: 1, price: 199.99 }
    ]
  },
  {
    id: 3,
    customer: "Carlos López",
    date: new Date('2024-01-17'),
    status: 'pending',
    items: [
      { productId: 105, name: "Auriculares Bluetooth", quantity: 1, price: 79.99 },
      { productId: 106, name: "Cargador USB-C", quantity: 3, price: 19.99 }
    ]
  },
  {
    id: 4,
    customer: "Ana Martínez",
    date: new Date('2024-01-18'),
    status: 'delivered',
    items: [
      { productId: 107, name: "Tablet Samsung Galaxy", quantity: 1, price: 399.99 }
    ]
  },
  {
    id: 5,
    customer: "Roberto Silva",
    date: new Date('2024-01-19'),
    status: 'pending',
    items: [
      { productId: 108, name: "Smartphone iPhone 15", quantity: 1, price: 999.99 },
      { productId: 109, name: "Funda protectora", quantity: 2, price: 24.99 }
    ]
  }
];

export const orderStatuses = ['pending', 'shipped', 'delivered'];

export const getOrderStats = (orders) => {
  const total = orders.length;
  const pending = orders.filter(order => order.status === 'pending').length;
  const shipped = orders.filter(order => order.status === 'shipped').length;
  const delivered = orders.filter(order => order.status === 'delivered').length;
  
  return { total, pending, shipped, delivered };
};

// Exportar como Data para mantener consistencia
export const Data = {
  Orders,
  orderStatuses,
  getOrderStats
};
