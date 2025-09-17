# Arquitectura del Sistema de Gestión de Pedidos - MailAméricas

## Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── Dashboard.jsx    # Componente principal del dashboard
│   ├── Dashboard.css    # Estilos del dashboard
│   ├── OrderItem.jsx    # Componente para mostrar un pedido individual
│   ├── OrderItem.css    # Estilos del item de pedido
│   ├── OrderList.jsx    # Componente para listar pedidos
│   ├── OrderList.css    # Estilos de la lista de pedidos
│   ├── OrderFilter.jsx  # Componente para filtrar pedidos
│   ├── OrderFilter.css  # Estilos del filtro
│   ├── OrderStats.jsx   # Componente para mostrar estadísticas
│   ├── OrderStats.css   # Estilos de las estadísticas
│   ├── OrderForm.jsx    # Formulario para crear nuevos pedidos
│   └── OrderForm.css    # Estilos del formulario
├── data/                # Datos y utilidades
│   └── mockData.js      # Datos de ejemplo y funciones helper
├── utils/               # Utilidades (vacío por ahora)
├── App.jsx             # Componente principal de la aplicación
├── App.css             # Estilos globales
├── main.jsx            # Punto de entrada de la aplicación
└── index.css           # Estilos base
```

## Componentes y sus Responsabilidades

### 1. Dashboard (src/components/Dashboard.jsx)
- **Propósito**: Componente principal que orquesta toda la aplicación
- **Props**:
  - `orders`: Array de pedidos (requerido)
  - `onAddOrder`: Función para agregar nuevos pedidos (requerido)
- **Funcionalidades**:
  - Maneja el estado del filtro
  - Controla la visibilidad del formulario
  - Calcula estadísticas
  - Filtra pedidos según el estado seleccionado

### 2. OrderItem (src/components/OrderItem.jsx)
- **Propósito**: Muestra la información detallada de un pedido individual
- **Props**:
  - `order`: Objeto con la información del pedido (requerido)
- **Validaciones PropTypes**:
  - `id`: number, requerido
  - `customer`: string, requerido
  - `date`: instanceOf(Date), requerido
  - `status`: oneOf(['pending', 'shipped', 'delivered']), requerido
  - `items`: array de objetos con validaciones específicas, requerido

### 3. OrderList (src/components/OrderList.jsx)
- **Propósito**: Renderiza una lista de pedidos
- **Props**:
  - `orders`: Array de pedidos, requerido
- **Funcionalidades**:
  - Muestra mensaje cuando no hay pedidos
  - Renderiza cada pedido usando OrderItem

### 4. OrderFilter (src/components/OrderFilter.jsx)
- **Propósito**: Permite filtrar pedidos por estado
- **Props**:
  - `filter`: Estado seleccionado (opcional)
  - `onFilterChange`: Función callback (requerido)
- **Validaciones PropTypes**:
  - `filter`: oneOf(['pending', 'shipped', 'delivered'])
  - `onFilterChange`: func, requerido

### 5. OrderStats (src/components/OrderStats.jsx)
- **Propósito**: Muestra estadísticas generales de los pedidos
- **Props**:
  - `total`: number, requerido
  - `pending`: number, requerido
  - `shipped`: number, requerido
  - `delivered`: number, requerido

### 6. OrderForm (src/components/OrderForm.jsx)
- **Propósito**: Formulario modal para crear nuevos pedidos
- **Props**:
  - `onSubmit`: Función para manejar el envío (requerido)
  - `onCancel`: Función para cancelar (requerido)
- **Validaciones**:
  - Cliente: mínimo 3 caracteres
  - Items: al menos uno, cantidad > 0, precio > 0
  - Validación en tiempo real con mensajes de error

## Validaciones con PropTypes

### OrderItem
```javascript
order: PropTypes.shape({
  id: PropTypes.number.isRequired,
  customer: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  status: PropTypes.oneOf(['pending', 'shipped', 'delivered']).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired
    })
  ).isRequired
}).isRequired
```

### OrderList
```javascript
orders: PropTypes.arrayOf(
  PropTypes.shape({
    // Misma estructura que OrderItem
  })
).isRequired
```

### OrderFilter
```javascript
filter: PropTypes.oneOf(['pending', 'shipped', 'delivered']),
onFilterChange: PropTypes.func.isRequired
```

### OrderStats
```javascript
total: PropTypes.number.isRequired,
pending: PropTypes.number.isRequired,
shipped: PropTypes.number.isRequired,
delivered: PropTypes.number.isRequired
```

## Datos de Ejemplo (src/data/mockData.js)

- **mockOrders**: Array con 5 pedidos de ejemplo
- **orderStatuses**: Array con los estados disponibles
- **getOrderStats()**: Función helper para calcular estadísticas

## Características Técnicas

### Estado de la Aplicación
- **React Hooks**: useState para manejo de estado local
- **useMemo**: Para optimizar cálculos de filtrado y estadísticas
- **Props drilling**: Comunicación entre componentes padre e hijo

### Estilos
- **CSS Modules**: Cada componente tiene su propio archivo CSS
- **Responsive Design**: Adaptable a diferentes tamaños de pantalla
- **Design System**: Colores y estilos consistentes

### Validaciones
- **PropTypes**: Validación de tipos en tiempo de desarrollo
- **Validación de formularios**: Validación en tiempo real con mensajes de error
- **Reglas de negocio**: Implementadas en el formulario de creación

## Funcionalidades Implementadas

✅ **Dashboard Principal**
- Vista principal con estadísticas
- Lista de pedidos
- Filtros por estado
- Botón para agregar nuevos pedidos

✅ **Gestión de Pedidos**
- Visualización detallada de cada pedido
- Información del cliente, fecha, estado
- Lista de productos con cantidades y precios
- Cálculo automático del total

✅ **Filtrado**
- Filtrar por estado (pending, shipped, delivered)
- Opción "Todos los pedidos"

✅ **Estadísticas**
- Total de pedidos
- Cantidad por estado
- Diseño visual atractivo

✅ **Formulario de Creación**
- Validaciones completas
- Múltiples productos por pedido
- Interfaz modal
- Validación en tiempo real

✅ **Validaciones con PropTypes**
- Todas las props están validadas
- Mensajes de error descriptivos
- Validaciones customizadas

## Cómo Ejecutar

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run dev
```

3. Abrir en el navegador: `http://localhost:5173`

## Próximas Mejoras Sugeridas

- [ ] Persistencia de datos (localStorage o API)
- [ ] Edición de pedidos existentes
- [ ] Eliminación de pedidos
- [ ] Búsqueda por nombre de cliente
- [ ] Ordenamiento por fecha o total
- [ ] Paginación para listas grandes
- [ ] Tests unitarios
- [ ] Estado global con Context API o Redux
