const getToken = () => localStorage.getItem('accessToken');
const BASE_URL = "http://localhost:3000/products";

export const getList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getList`);
    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    // console.log("Fetched products:", data);
    
    return data; 
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/getById/${id}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    // console.log("Fetched product by ID:", data);

    return data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

export const getByCategory = async (categoryId) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/getByCategoryId/${categoryId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    // console.log("Fetched product:", data);

    return Array.isArray(data) ? data : [data];
  } 
  catch (error) {
    console.error("Error fetching product:", error);
    return []; // במקום null
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
      body: JSON.stringify(newData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "הוספה נכשלה");
    }

    return data; 
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw error;
  }
};
