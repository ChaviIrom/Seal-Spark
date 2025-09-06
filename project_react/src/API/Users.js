const getToken = () => localStorage.getItem('accessToken');
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/users`
  : '/api/users';

console.log('BASE_URL = ',BASE_URL)

export const getList = async () => {
  try {
    const token = getToken();
    // console.log("Token:", token);
    const response = await fetch(`${BASE_URL}/getList`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) 
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    // console.log("Fetched users:", data);

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const token = getToken();
    console.log('BASE_URL = ',BASE_URL)
    const response = await fetch(`${BASE_URL}/getById/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) 
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    // console.log("Fetched user:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const add = async (user) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(user)
  });
  return await res.json();
};

export const update = async (id, updateData) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updateData)
  });
  return await res.json();
};

export const Delete = async (id) => {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await res.json();
};

export const login = async (id) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'שגיאה בהתחברות');
  }

  const data = await response.json();
  
  localStorage.setItem('accessToken', data.accessToken);
  
  return data; // מחזיר את { accessToken }
};


// export const CurrentUser = async () => {
//   try {
//     const token = getToken();
//     const response = await fetch(`${BASE_URL}/me`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//     const data = await response.json();
//     return data; // מחזיר את פרטי המשתמש המחובר
//   } catch (error) {
//     console.error("Error fetching current user:", error);
//     return null;
//   }
// };

// export const login = async (id) => {
//   const response = await fetch(`${BASE_URL}/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ id })
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || 'שגיאה בהתחברות');
//   }

//   const data = await response.json();
//   localStorage.setItem('accessToken', data.accessToken);
//   return data;  // { accessToken }
// };

export const CurrentUser = async (dispatch) => {
  try {
    const token = getToken();
    if (!token) {
      console.log('CurrentUser token missing');
      dispatch?.({ type: "USER_LOGIN_FAIL", payload: "No token" });
      return null;
    }

    const response = await fetch(`${BASE_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        // טוקן פג
        localStorage.clear();
        dispatch?.({ type: "USER_LOGIN_FAIL", payload: "Token expired" });
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('CurrentUser data: ', data);
    return data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
