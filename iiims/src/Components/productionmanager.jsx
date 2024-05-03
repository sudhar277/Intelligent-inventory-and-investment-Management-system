import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { setReorderPoints } from './apiservice'; // Assuming apiService.js is in the same directory
import profilepic from "./default-profile-picture.jpg"

const ReorderManagementPage = () => {
  const [products, setProducts] = useState([{ name: '', totalQuantitySold: '', numberOfDays: '', leadTime: '', safetyStock: '' }]);

  const calculateReorderPoint = (product) => {
    // Calculate daily demand
    const dailyDemand = parseFloat(product.totalQuantitySold) / parseFloat(product.numberOfDays);

    // Calculate reorder point
    const reorderPoint = dailyDemand * parseFloat(product.leadTime) + parseFloat(product.safetyStock);

    return Math.round(reorderPoint);
  };

  const handleInputChange = (index, event) => {
    const values = [...products];
    values[index][event.target.name] = event.target.value;
    setProducts(values);
  };

  const handleSetReorderPoint = async (event) => {
    event.preventDefault();
    const reorderPoints = products.map((product) => ({
      product_name: product.name,
      reorder_point: calculateReorderPoint(product),
    }));
    try {
      const response = await setReorderPoints(reorderPoints);
      console.log(response);
      if (response.status === 'success') {
        alert('Reorder points set successfully!');
      } else if (response.status === 'error') {
        alert(`Error setting reorder points: ${response.detail}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  const handleAddRow = () => {
    setProducts([...products, { name: '', totalQuantitySold: '', numberOfDays: '', leadTime: '', safetyStock: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#4285F4', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Intelligent Inventory Management System</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Profile picture */}
          <img src={profilepic} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
          <p style={{ color: 'white', margin: 0 }}>Welcome, Production Manager</p>
        </div>
      </header>
      <section style={{ paddingTop: '50px', paddingRight: '200px', paddingLeft: '200px', flexGrow: 1 }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#4285F4', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Inventory Reorder Management</h2>
          {/* Form to set reorder point */}
          <form onSubmit={handleSetReorderPoint} className="mb-3">
            {products.map((product, index) => (
              <div key={index} className="mb-3 row">
                <div className="col">
                  <label className="form-label">Product Name</label>
                  <input type="text" name="name" className="form-control" value={product.name} onChange={(e) => handleInputChange(index, e)} required />
                </div>
                <div className="col">
                  <label className="form-label">Total Quantity Sold</label>
                  <input type="number" min="0" name="totalQuantitySold" className="form-control" value={product.totalQuantitySold} onChange={(e) => handleInputChange(index, e)} required />
                </div>
                <div className="col">
                  <label className="form-label">Number of Days</label>
                  <input type="number" min="0" name="numberOfDays" className="form-control" value={product.numberOfDays} onChange={(e) => handleInputChange(index, e)} required />
                </div>
                <div className="col">
                  <label className="form-label">Lead Time(Days)</label>
                  <input type="number" min="0" name="leadTime" className="form-control" value={product.leadTime} onChange={(e) => handleInputChange(index, e)} required />
                </div>
                <div className="col">
                  <label className="form-label">Safety Stock</label>
                  <input type="number" min="0" name="safetyStock" className="form-control" value={product.safetyStock} onChange={(e) => handleInputChange(index, e)} required />
                </div>
                <div className="col">
                  {index !== 0 && ( // Render minus button only if index is not 0
                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveRow(index)}>
                      -
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div>
              <button type="button" className="btn btn-primary mb-3 mr-3" onClick={handleAddRow}>
                +
              </button>
            </div>
            <button type="submit" className="btn btn-primary">
              Set Reorder Points
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ReorderManagementPage;
