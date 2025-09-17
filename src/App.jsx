import { useState } from 'react';
import Dashboard from './components/Dashboard';
import { Orders } from './data/Data';
import './App.css';

function App() {
  const [orders, setOrders] = useState(Orders);

  const handleAddOrder = (newOrder) => {
    setOrders(prevOrders => [...prevOrders, newOrder]);
  };

  return (
    <div className="App">
      <Dashboard orders={orders} onAddOrder={handleAddOrder} />
    </div>
  );
}

export default App;
