const getToken = () => localStorage.getItem('accessToken');
const BASE_URL = "http://localhost:3000/contactUs";

export const getList = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/getList`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching contact list:', error);
    throw error;
  }
};
export const add = async (contact) => {
  const token = getToken();
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(contact),
    });
    if (!response.ok) {
      throw new Error('Failed to add contact');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};