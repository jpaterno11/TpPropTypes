import { useState } from 'react';
import PropTypes from 'prop-types';
import './OrderForm.css';

const OrderForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: '',
    status: 'pending',
    items: [{ productId: '', name: '', quantity: 1, price: '' }]
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validar cliente
    if (!formData.customer.trim()) {
      newErrors.customer = 'El nombre del cliente es requerido';
    } else if (formData.customer.trim().length < 3) {
      newErrors.customer = 'El nombre del cliente debe tener al menos 3 caracteres';
    }

    // Validar items
    if (formData.items.length === 0) {
      newErrors.items = 'Debe agregar al menos un producto';
    } else {
      formData.items.forEach((item, index) => {
        if (!item.productId || !item.name.trim() || !item.quantity || !item.price) {
          newErrors[`item_${index}`] = 'Todos los campos del producto son requeridos';
        } else if (item.quantity <= 0) {
          newErrors[`item_${index}`] = 'La cantidad debe ser mayor a 0';
        } else if (isNaN(item.price) || parseFloat(item.price) <= 0) {
          newErrors[`item_${index}`] = 'El precio debe ser un número mayor a 0';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'quantity' || field === 'price' ? 
        (field === 'quantity' ? parseInt(value) || 0 : parseFloat(value) || 0) : 
        value
    };
    
    setFormData(prev => ({
      ...prev,
      items: newItems
    }));

    // Limpiar error del item
    if (errors[`item_${index}`]) {
      setErrors(prev => ({
        ...prev,
        [`item_${index}`]: ''
      }));
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productId: '', name: '', quantity: 1, price: '' }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const newOrder = {
        id: Date.now(), // ID temporal
        customer: formData.customer.trim(),
        date: new Date(),
        status: formData.status,
        items: formData.items.map(item => ({
          productId: parseInt(item.productId),
          name: item.name.trim(),
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price)
        }))
      };
      
      onSubmit(newOrder);
      
      // Reset form
      setFormData({
        customer: '',
        status: 'pending',
        items: [{ productId: '', name: '', quantity: 1, price: '' }]
      });
      setErrors({});
    }
  };

  return (
    <div className="order-form-container">
      <div className="order-form">
        <h3>Agregar Nuevo Pedido</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customer">Cliente *</label>
            <input
              type="text"
              id="customer"
              value={formData.customer}
              onChange={(e) => handleInputChange('customer', e.target.value)}
              className={errors.customer ? 'error' : ''}
              placeholder="Nombre del cliente (mínimo 3 caracteres)"
            />
            {errors.customer && <span className="error-message">{errors.customer}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
            >
              <option value="pending">Pendiente</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregado</option>
            </select>
          </div>

          <div className="form-group">
            <label>Productos *</label>
            {formData.items.map((item, index) => (
              <div key={index} className="item-row">
                <div className="item-inputs">
                  <input
                    type="number"
                    placeholder="ID Producto"
                    value={item.productId}
                    onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                    className={errors[`item_${index}`] ? 'error' : ''}
                  />
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    className={errors[`item_${index}`] ? 'error' : ''}
                  />
                  <input
                    type="number"
                    placeholder="Cantidad"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    min="1"
                    className={errors[`item_${index}`] ? 'error' : ''}
                  />
                  <input
                    type="number"
                    placeholder="Precio"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    step="0.01"
                    min="0"
                    className={errors[`item_${index}`] ? 'error' : ''}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="remove-item-btn"
                  disabled={formData.items.length === 1}
                >
                  ✕
                </button>
                {errors[`item_${index}`] && (
                  <span className="error-message">{errors[`item_${index}`]}</span>
                )}
              </div>
            ))}
            
            {errors.items && <span className="error-message">{errors.items}</span>}
            
            <button
              type="button"
              onClick={addItem}
              className="add-item-btn"
            >
              + Agregar Producto
            </button>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancelar
            </button>
            <button type="submit" className="submit-btn">
              Crear Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Validaciones con PropTypes
OrderForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default OrderForm;
