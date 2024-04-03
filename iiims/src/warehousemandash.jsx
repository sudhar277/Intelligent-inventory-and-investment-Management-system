import React, { useState } from 'react';
import profilepic from "./default-profile-picture.jpg"

const DashboardPage = () => {
  const [inventoryData, setInventoryData] = useState([
    { inventoryid: '', productname: '', addProduct: '', removeProduct: '', location: '' }
  ]);
  const [showUpdatePage, setShowUpdatePage] = useState(true);
  const [showHistoryPage, setShowHistoryPage] = useState(false);
  const [showInventoryPage, setShowInventoryPage] = useState(false); // New state for showing inventory
  const [errors, setErrors] = useState({});
  const [inventoryList, setInventoryList] = useState([]); // State to hold fetched inventory data

  // Dummy product names
  const dummyProducts = ["Dummy Product 1", "Dummy Product 2", "Dummy Product 3"];

  const handleAddRow = () => {
    setInventoryData([...inventoryData, { inventoryid: '', productname: '', addProduct: '', removeProduct: '', location: '' }]);
  };

  const handleRemoveRow = (indexToRemove) => {
    setInventoryData(prevData => prevData.filter((_, index) => index !== indexToRemove));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...inventoryData];
    newData[index][name] = value;
    setInventoryData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let isValid = true;
    inventoryData.forEach((data, index) => {
      if (!data.inventoryid || !data.productname || (data.addProduct === '' && data.removeProduct === '') || !data.location) {
        errors[index] = 'At least one of "Add Quantity" or "Remove Quantity" is required';
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(errors);
      return;
    }

    // Implement submit functionality here
    console.log('Inventory Data:', inventoryData);
    // Clear errors if the form is successfully submitted
    setErrors({});

    // Reset form fields
    setInventoryData([
      { inventoryid: '', productname: '', addProduct: '', removeProduct: '', location: '' }
    ]);
  };

  const handleShowUpdatePage = () => {
    setShowUpdatePage(true);
    setShowHistoryPage(false);
    setShowInventoryPage(false); // Hide inventory page
  };

  const handleShowHistoryPage = () => {
    setShowUpdatePage(false);
    setShowHistoryPage(true);
    setShowInventoryPage(false); // Hide inventory page
  };

  const handleShowInventoryPage = () => {
    setShowInventoryPage(true);
    setShowUpdatePage(false);
    setShowHistoryPage(false);
    // Here you can make an API call to fetch inventory data from the backend and update `inventoryList` state
    // For now, let's assume `inventoryList` is empty
    setInventoryList([]);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    // For now, let's simply reload the page
    window.location.reload();
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#4285F4', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Intelligent Inventory Management System</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ color: 'white', margin: 0, marginRight: '20px' }}>Welcome, Warehouse Manager</p>
          <div style={{ position: 'relative' }}>
            <img src={profilepic} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }} />
            <div style={{ position: 'absolute', top: '100%', right: '0', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', zIndex: '100', display: 'none' }}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ padding: '10px', cursor: 'pointer' }} onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <nav style={{ backgroundColor: '#D0D8E1', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', alignSelf: 'flex-end' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button style={{ backgroundColor: 'transparent', color: showUpdatePage ? '#4285F4' : '#000', border: 'none', padding: '10px', marginRight: '5px', cursor: 'pointer', borderRadius: '5px', borderBottom: showUpdatePage ? '2px solid #4285F4' : 'none' }} onClick={handleShowUpdatePage}>Update Inventory</button>
          <button style={{ backgroundColor: 'transparent', color: showHistoryPage ? '#4285F4' : '#000', border: 'none', padding: '10px', marginRight: '5px', cursor: 'pointer', borderRadius: '5px', borderBottom: showHistoryPage ? '2px solid #4285F4' : 'none' }} onClick={handleShowHistoryPage}>View History</button>
          <button style={{ backgroundColor: 'transparent', color: showInventoryPage ? '#4285F4' : '#000', border: 'none', padding: '10px', cursor: 'pointer', borderRadius: '5px', borderBottom: showInventoryPage ? '2px solid #4285F4' : 'none' }} onClick={handleShowInventoryPage}>View Inventory</button>
        </div>
      </nav>
      <section style={{ paddingTop: '50px', paddingRight: '200px', paddingLeft: '200px', flexGrow: 1 }}>
        {showHistoryPage && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#4285F4', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>View History</h2>
            <select style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option>Dummy Product 1</option>
              <option>Dummy Product 2</option>
              <option>Dummy Product 3</option>
            </select>
          </div>
        )}
        {showUpdatePage && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#4285F4', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Update Inventory</h2>
            <form onSubmit={handleSubmit}>
              {inventoryData.map((data, index) => (
                <div key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                  <input type="number" name="inventoryid" placeholder="Inventory ID" min="0" value={data.inventoryid} onChange={(e) => handleInputChange(index, e)} style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                  {/* Dropdown for product name */}
                  <select name="productname" value={data.productname} onChange={(e) => handleInputChange(index, e)} style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option value="">Select Product</option>
                    {dummyProducts.map((product, i) => (
                      <option key={i} value={product}>{product}</option>
                    ))}
                  </select>
                  <input type="number" name="addProduct" placeholder="Add Quantity" min="0" value={data.addProduct} onChange={(e) => handleInputChange(index, e)} style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                  <input type="number" name="removeProduct" placeholder="Remove Quantity" min="0" value={data.removeProduct} onChange={(e) => handleInputChange(index, e)} style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                  <input type="text" name="location" placeholder="Location" value={data.location} onChange={(e) => handleInputChange(index, e)} style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                  {index !== 0 && <button type="button" onClick={() => handleRemoveRow(index)} style={{ backgroundColor: '#DB4437', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>-</button>}
                  {errors[index] && <div style={{ color: '#DB4437', marginTop: '5px' }}>{errors[index]}</div>}
                </div>
              ))}
              <button type="button" onClick={handleAddRow} style={{ backgroundColor: '#4285F4', color: 'white', border: 'none', padding: '10px', marginRight: '10px', borderRadius: '5px', cursor: 'pointer' }}>+</button>
              <button type="submit" style={{ backgroundColor: '#4285F4', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
            </form>
          </div>
        )}
        {showInventoryPage && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#4285F4', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>View Inventory</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Inventory ID</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {/* Render inventory data here */}
                {inventoryList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.inventoryid}</td>
                    <td>{item.productid}</td>
                    <td>{item.productname}</td>
                    <td>{item.quantity}</td>
                    <td>{item.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
