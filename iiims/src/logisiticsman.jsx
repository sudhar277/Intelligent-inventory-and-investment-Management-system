import { useState, useEffect } from 'react';
import profilepic from "./default-profile-picture.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProductLocations } from './Components/apiservice';

const LogisticsManagerPage = () => {
  const [showProductLocation, setShowProductLocation] = useState(true);
  const [showOrdersPlaced, setShowOrdersPlaced] = useState(false);
  const [productLocations, setProductLocations] = useState([]);

  // Function to toggle between different sections
  const handleToggleSection = (section) => {
    switch (section) {
      case "productLocation":
        setShowProductLocation(true);
        setShowOrdersPlaced(false);
        break;
      case "ordersPlaced":
        setShowProductLocation(false);
        setShowOrdersPlaced(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchProductLocations = async () => {
      try {
        const data = await getProductLocations();
        setProductLocations(data);
      } catch (error) {
        console.error('Error fetching product locations:', error);
      }
    };

    fetchProductLocations();
  }, []);

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
      <header style={{ backgroundColor: '#4285F4', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Logistics Manager Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ color: 'white', margin: 0, marginRight: '20px' }}>Welcome, Logistics Manager</p>
          <div style={{ position: 'relative' }}>
            <img src={profilepic} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }} />
            <div style={{ position: 'absolute', top: '100%', right: '0', backgroundColor: '#fff', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', zIndex: '100', display: 'none' }}>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ padding: '10px', cursor: 'pointer' }}>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <nav style={{ backgroundColor: '#D0D8E1', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', alignSelf: 'flex-end' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button style={{ backgroundColor: 'transparent', color: showProductLocation ? '#4285F4' : '#000', border: 'none', padding: '10px', marginRight: '5px', cursor: 'pointer', borderRadius: '5px', borderBottom: showProductLocation ? '2px solid #4285F4' : 'none' }} onClick={() => handleToggleSection("productLocation")}>View Product Location</button>
          <button style={{ backgroundColor: 'transparent', color: showOrdersPlaced ? '#4285F4' : '#000', border: 'none', padding: '10px', marginRight: '5px', cursor: 'pointer', borderRadius: '5px', borderBottom: showOrdersPlaced ? '2px solid #4285F4' : 'none' }} onClick={() => handleToggleSection("ordersPlaced")}>Orders Placed</button>
        </div>
      </nav>
      <section style={{ paddingTop: '50px', paddingRight: '200px', paddingLeft: '200px', flexGrow: 1 }}>
        {showProductLocation && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ color: '#4285F4', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>View Product Location</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc' }}>Inventory No</th>
                  <th style={{ border: '1px solid #ccc' }}>Product ID</th>
                  <th style={{ border: '1px solid #ccc' }}>Product Name</th>
                  <th style={{ border: '1px solid #ccc' }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {productLocations.map(location => (
                  <tr key={location.productID}> {/* Assuming productID is unique */}
                    <td style={{ border: '1px solid #ccc' }}>{location.inventoryNo}</td>
                    <td style={{ border: '1px solid #ccc' }}>{location.productID}</td>
                    <td style={{ border: '1px solid #ccc' }}>{location.productName}</td>
                    <td style={{ border: '1px solid #ccc' }}>{location.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showOrdersPlaced && (
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
    <h2 style={{ color: '#4285F4', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>Orders Placed</h2>
    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ccc' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc' }}>Order ID</th>
          <th style={{ border: '1px solid #ccc' }}>Product ID</th>
          <th style={{ border: '1px solid #ccc' }}>Supplier Name</th>
          <th style={{ border: '1px solid #ccc' }}>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: '1px solid #ccc' }}>Will be done in upcoming sprints</td>
          <td style={{ border: '1px solid #ccc' }}>Will be done in upcoming sprints</td>
          <td style={{ border: '1px solid #ccc' }}>Will be done in upcoming sprints</td>
          <td style={{ border: '1px solid #ccc' }}>Will be done in upcoming sprints</td>
        </tr>
      </tbody>
    </table>
  </div>
)}

      </section>
    </div>
  );
};

export default LogisticsManagerPage;
