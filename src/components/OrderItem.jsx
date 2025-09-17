import PropTypes from 'prop-types';
import './OrderItem.css';

const OrderItem = ({ order }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#f39c12';
      case 'shipped':
        return '#3498db';
      case 'delivered':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregado';
      default:
        return 'Desconocido';
    }
  };

  const calculateTotal = () => {
    return order.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="order-item">
      <div className="order-header">
        <div className="order-id">
          <strong>Pedido #{order.id}</strong>
        </div>
        <div 
          className="order-status"
          style={{ backgroundColor: getStatusColor(order.status) }}
        >
          {getStatusText(order.status)}
        </div>
      </div>
      
      <div className="order-customer">
        <strong>Cliente:</strong> {order.customer}
      </div>
      
      <div className="order-date">
        <strong>Fecha:</strong> {formatDate(order.date)}
      </div>
      
      <div className="order-items">
        <strong>Productos:</strong>
        <ul className="items-list">
          {order.items.map((item, index) => (
            <li key={index} className="item">
              <span className="item-name">{item.name}</span>
              <span className="item-details">
                Cantidad: {item.quantity} | Precio: ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="order-total">
        <strong>Total: ${calculateTotal().toFixed(2)}</strong>
      </div>
    </div>
  );
};

// Validaciones con PropTypes
OrderItem.propTypes = {
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
};

export default OrderItem;
