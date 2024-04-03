export const registerUser = async (userData) => {
  try {
    const response = await fetch('https://inventory-db-m6j0.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('There was an error registering the user:', error);
    throw error;
  }
};


export const loginUser = async (email, password) => {
  try {
    const response = await fetch('https://inventory-db-m6j0.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('There was an error logging in the user:', error);
    throw error;
  }
};

export const getRecentProducts = async () => {
  try { 
    const response = await fetch('https://inventory-db-m6j0.onrender.com/recent_products', {  
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Recent Products:', data); // Log the fetched data
    return data;
  } catch (error) {
    console.error('There was an error fetching the recent products:', error);
    throw error;
  }
};




