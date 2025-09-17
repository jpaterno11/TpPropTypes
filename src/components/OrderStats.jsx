import PropTypes from 'prop-types';
import './OrderStats.css';

const OrderStats = ({ total, pending, shipped, delivered }) => {
  const stats = [
    {
      label: 'Total de Pedidos',
      value: total,
      color: '#2c3e50',
      icon: '📦'
    },
    {
      label: 'Pendientes',
      value: pending,
      color: '#f39c12',
      icon: '⏳'
    },
    {
      label: 'Enviados',
      value: shipped,
      color: '#3498db',
      icon: '🚚'
    },
    {
      label: 'Entregados',
      value: delivered,
      color: '#27ae60',
      icon: '✅'
    }
  ];

  return (
    <div className="order-stats">
      <h3 className="stats-title">Estadísticas de Pedidos</h3>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Validaciones con PropTypes
OrderStats.propTypes = {
  total: PropTypes.number.isRequired,
  pending: PropTypes.number.isRequired,
  shipped: PropTypes.number.isRequired,
  delivered: PropTypes.number.isRequired
};

export default OrderStats;
