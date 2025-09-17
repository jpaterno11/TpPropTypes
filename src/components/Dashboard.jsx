import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import OrderStats from './OrderStats';
import OrderFilter from './OrderFilter';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import { getOrderStats } from '../data/Data';
import './Dashboard.css';

const Dashboard = ({ orders, onAddOrder }) => {
  const [filter, setFilter] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Filtrar pedidos según el estado seleccionado
  const filteredOrders = useMemo(() => {
    if (!filter) return orders;
    return orders.filter(order => order.status === filter);
  }, [orders, filter]);

  // Calcular estadísticas
  const stats = useMemo(() => {
    return getOrderStats(orders);
  }, [orders]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleAddOrder = (newOrder) => {
    onAddOrder(newOrder);
    setShowForm(false);
  };

  const handleCancelForm = () => {
    setShowForm(false);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>MailAméricas</h1>
        <button 
          className="add-order-btn"
          onClick={() => setShowForm(true)}
        >
          + Nuevo Pedido
        </button>
      </header>

      <main className="dashboard-main">
        <section className="stats-section">
          <OrderStats {...stats} />
        </section>

        <section className="filters-section">
          <OrderFilter 
            filter={filter} 
            onFilterChange={handleFilterChange} 
          />
        </section>

        <section className="orders-section">
          <OrderList orders={filteredOrders} />
        </section>
      </main>

      {showForm && (
        <OrderForm 
          onSubmit={handleAddOrder}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
};

// Validaciones con PropTypes
Dashboard.propTypes = {
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
  ).isRequired,
  onAddOrder: PropTypes.func.isRequired
};

export default Dashboard;
