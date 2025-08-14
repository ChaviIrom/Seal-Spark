const getToken = () => localStorage.getItem('accessToken');
const BASE_URL = "http://localhost:3000/categories";

export const getList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getList`);
    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    // console.log("Fetched categories:", data);
    
    return data.Categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/getById/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) 
      throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    // console.log("Fetched category:", data);
    return data;
  } 
  catch (error) {
    console.error("Error fetching category:", error);
    return null; 
  }
};

export const add = async (newData) => {
  const token = getToken();
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(newData)
    });
    return response.ok;
  } catch (error) {
    console.error("Error adding category:", error);
    return false;
  }
};

