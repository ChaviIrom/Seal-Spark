const BASE_URL = "http://localhost:3000/orders";
const getToken = () => localStorage.getItem('accessToken');

export const getList = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/getList`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) 
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    // console.log("Fetched orders:", data);
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const getById = async (userId) => {
  try {
    const token = localStorage.getItem("token");

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
export const getByOrderId = async (_Id) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/getByOrderId/${_Id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    // console.log("Fetched order by ID:", data);
    return data;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
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
// דוגמה לפונקציה ששולחת הזמנה
async function sendOrder(userId, items) {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, items })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'שגיאה בשליחת ההזמנה');
    }

    const orderData = await response.json();
    alert('ההזמנה נשלחה בהצלחה! תודה רבה 😊');
    return orderData;

  } catch (error) {
    alert('אירעה שגיאה: ' + error.message);
  }
}

