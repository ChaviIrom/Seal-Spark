const BASE_URL = `${import.meta.env.VITE_API_URL}/shopCart`;
const getToken = () => localStorage.getItem('accessToken');

export const getList = async () => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/getList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching cart list:", error);
    return [];
  }
};

export const getById = async (userId) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/getById/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cart by user ID:", error);
    return null;
  }
};

export const add = async (newCartData) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newCartData),
    });

    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
};

export const removeItem = async ({ userId, productId }) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, productId }),
    });

    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return null;
  }
};

export const update = async (id, updatedCartData) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedCartData),
    });

    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating cart:", error);
    return null;
  }
};
