import PropTypes from 'prop-types';
import OrderItem from './OrderItem';
import './OrderList.css';

const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="order-list-empty">
        <p>No hay pedidos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="order-list">
      <div className="order-list-header">
        <h3>Lista de Pedidos ({orders.length})</h3>
      </div>
      <div className="order-list-content">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

// Validaciones con PropTypes
OrderList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired
};

export default OrderList;
