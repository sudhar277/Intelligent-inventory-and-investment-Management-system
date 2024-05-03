import { useState, useEffect } from 'react';
import profilepic from "./default-profile-picture.jpg"
import { getRecentProducts } from './Components/apiservice';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardPage = () => {
  const [inventoryData, setInventoryData] = useState([{ inventory_id: '', product_id: '', import_: '', export: '', location: '' }]);
  const [showUpdatePage, setShowUpdatePage] = useState(true);
  const [showHistoryPage, setShowHistoryPage] = useState(false);
  const [showInventoryPage, setShowInventoryPage] = useState(false); // New state for showing inventory
  const [errors, setErrors] = useState({});
  const [inventoryList, setInventoryList] = useState([]); // State to hold fetched inventory data
  const [recentProducts, setRecentProducts] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetching recent products
  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const products = await getRecentProducts();
        setRecentProducts(products);
      } catch (error) {
        console.error('Failed to fetch recent products:', error);
      }
    };

    fetchRecentProducts();
  }, [showInventoryPage]);

  // Fetching products
  const getProducts = async () => {
    const response = await fetch('http://127.0.0.1:8000/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Handle adding a new row
  const handleAddRow = () => {
    setInventoryData(prevData => [...prevData, { inventory_id: '', product_id: '', import_: '', export: '', location: '' }]);
  };

  // Handle removing a row
  const handleRemoveRow = (indexToRemove) => {
    setInventoryData(prevData => prevData.filter((_, index) => index !== indexToRemove));
  };

  // Handle input change in the form
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...inventoryData];
    switch (name) {
      case "inventoryid":
        newData[index]["inventory_id"] = value;
        break;
      case "productname":
        newData[index]["product_id"] = value;
        break;
      case "addProduct":
        newData[index]["import_"] = value;
        break;
      case "removeProduct":
        newData[index]["export"] = value;
        break;
      case "location":
        newData[index]["location"] = value;
        break;
      default:
        break;
    }
    setInventoryData(newData);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    let isValid = true;
    inventoryData.forEach((data, index) => {
      if (!data.inventory_id || !data.product_id || (data.import_ === '' && data.export === '') || !data.location) {
        errors[index] = 'At least one of "Add Quantity" or "Remove Quantity" is required';
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(errors);
      return;
    }

    // Send data to the API
    try {
      const response = await fetch('http://127.0.0.1:8000/inventory_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inventoryData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      alert(JSON.stringify(data));

      // Clear errors if the form is successfully submitted
      setErrors({});

      // Reset form fields
      setInventoryData([{ inventory_id: '', product_id: '', import_: '', export: '', location: '' }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Show update page
  const handleShowUpdatePage = () => {
    setShowUpdatePage(true);
    setShowHistoryPage(false);
    setShowInventoryPage(false);
  };

  // Show history page
  const handleShowHistoryPage = () => {
    setShowUpdatePage(false);
    setShowHistoryPage(true);
    setShowInventoryPage(false);
  };

  // Show inventory page
  const handleShowInventoryPage = () => {
    setShowInventoryPage(true);
    setShowUpdatePage(false);
    setShowHistoryPage(false);
    setInventoryList([]);
  };

  // Logout function
  const handleLogout = () => {
    window.location.reload();
  };

  // Fetch product history
  const [productHistory, setProductHistory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');

  const getProductHistory = async (product_id) => {
    const response = await fetch('http://127.0.0.1:8000/view_history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_id: Number(product_id) })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setProductHistory(data);
    setSelectedProduct(product_id);
  };

  useEffect(() => {
    if (showHistoryPage) {
      getProductHistory("0");
    }
  }, [showHistoryPage]);

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
            <select
              name="productname"
              onChange={(e) => getProductHistory(e.target.value || "0")}
              style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            >
              <option value="">Select Product</option>
              {Object.entries(products).map(([id, name], i) => (
                <option key={i} value={id}>{name}</option>
              ))}
            </select>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc' }}>Product ID</th>
                  <th style={{ border: '1px solid #ccc' }}>Date of transaction </th>
                  <th style={{ border: '1px solid #ccc' }}>Import</th>
                  <th style={{ border: '1px solid #ccc' }}>Export</th>
                  <th style={{ border: '1px solid #ccc' }}>Total Quantity</th>
                  <th style={{ border: '1px solid #ccc' }}>Inventory ID</th>
                  <th style={{ border: '1px solid #ccc' }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {productHistory.map((product, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ccc' }}>{product.product_id}</td>
                    <td style={{ border: '1px solid #ccc' }}>{product.datetime}</td>
                    <td style={{ border: '1px solid #ccc' }}>{product.import}</td>
                    <td style={{ border: '1px solid #ccc' }}>{product.export}</td>
                    <td style={{ border: '1px solid #ccc' }}>{product.total_quantity}</td>
                    <td style={{ border: '1px solid #ccc' }}>{product.inventory_id}</td>
                    <td style={{ border: '1px solid #ccc' }}>{product.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showUpdatePage && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#4285F4', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Update Inventory</h2>
            <form onSubmit={handleSubmit}>
              {inventoryData.map((data, index) => (
                <div key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                  <input type="number" name="inventoryid" placeholder="Inventory ID" min="0" value={data.inventory_id} onChange={(e) => handleInputChange(index, e)} style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                  <select name="productname" value={data.product_id} onChange={(e) => handleInputChange(index, e)} style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option value="">Select Product</option>
                    {Object.entries(products).map(([id, name], i) => (
                      <option key={i} value={id}>{name}</option>
                    ))}
                  </select>
                  <input type="number" name="addProduct" placeholder="Add Quantity" min="0" value={data.import_} onChange={(e) => handleInputChange(index, e)} style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                  <input type="number" name="removeProduct" placeholder="Remove Quantity" min="0" value={data.export} onChange={(e) => handleInputChange(index, e)} style={{ marginRight: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
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
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc' }}>Product ID</th>
                  <th style={{ border: '1px solid #ccc' }}>Product Name</th>
                  <th style={{ border: '1px solid #ccc' }}>Quantity</th>
                  <th style={{ border: '1px solid #ccc' }}>Inventory ID</th>
                  <th style={{ border: '1px solid #ccc' }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.map((product, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ccc' }}>{product.product_id}</td>
                    <td style={{ border: '1px solid #ccc' }}>{product.product_name}</td>
                    <td style={{ border: '1px solid #ccc' }}>{product.quantity}</td>
                    <td style={{ border: '1px solid #ccc' }}>{product.inventory_id}</td>
                    <td style={{ border: '1px solid #ccc' }}>{product.location}</td>
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
