export const registerUser = async (userData) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/register', {
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
    const response = await fetch('http://127.0.0.1:8000/login', {
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
    const response = await fetch('http://127.0.0.1:8000/recent_products', {  
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

export const sendOtp = async (email) => {
  const response = await fetch('http://127.0.0.1:8000/send_otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email }),
  });
  return response.json();
};

export const verifyOtp = async (email, otp) => {
  const response = await fetch('http://127.0.0.1:8000/verify_otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, otp_code: otp }),
  });
  return response.json();
};

export const resetPassword = async (email, newPassword) => {
  const response = await fetch('http://127.0.0.1:8000/reset_password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, new_password: newPassword }),
  });
  return response.json();
};

// Update the getProductLocations function to use the correct endpoint
export const getProductLocations = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/product-locations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Product Locations:', data); // Log the fetched data
    return data;
  } catch (error) {
    console.error('There was an error fetching the product locations:', error);
    throw error;
  }
};


export const setReorderPoints = async (reorderPoints) => {
  console.log('Received raw data:', reorderPoints);
  try {
    const response = await fetch('http://127.0.0.1:8000/reorder-points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reorderPoints)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('There was an error setting reorder points:', error);
    throw error;
  }
};

export const getUserRole = async (email) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/get_role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('There was an error fetching the user role:', error);
    throw error;
  }
};
