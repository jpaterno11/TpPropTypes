import PropTypes from 'prop-types';
import './OrderFilter.css';

const OrderFilter = ({ filter, onFilterChange }) => {
  const statusOptions = [
    { value: 'all', label: 'Todos los pedidos' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'shipped', label: 'Enviados' },
    { value: 'delivered', label: 'Entregados' }
  ];

  const handleChange = (event) => {
    const selectedFilter = event.target.value === 'all' ? null : event.target.value;
    onFilterChange(selectedFilter);
  };

  return (
    <div className="order-filter">
      <label htmlFor="status-filter" className="filter-label">
        Filtrar por estado:
      </label>
      <select
        id="status-filter"
        value={filter || 'all'}
        onChange={handleChange}
        className="filter-select"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Validaciones con PropTypes
OrderFilter.propTypes = {
  filter: PropTypes.oneOf(['pending', 'shipped', 'delivered']),
  onFilterChange: PropTypes.func.isRequired
};

export default OrderFilter;
