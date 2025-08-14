import { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { addToCart } from '../../Redux/Action/shopCartActions.js';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { getByCategory } from '../../API/products.js'
import imageShpe from '../../../public/Pictures/HomePage/icons8-shopping-bag-50.png'
import '../../styles/DesignNav.css';
import '../../styles/DesignCategories.css'

export default function CategoryDisplay() {
  
  const { categoryId } = useParams(); 
  const title = '';
  const [products, setProducts] = useState([]);
  const baseUrl = window.location.origin; // "http://localhost:5173"

useEffect(() => {
  const fetchProducts = async () => {
    try {
      console.log("Category ID:", categoryId);
      const fetchedProducts = await getByCategory( categoryId );
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  fetchProducts();
}, [categoryId]);

 const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <>
      <div className='nav-design-background'>
        <p className='nav-categories-design-text'>{title}</p>
      </div>
      <br />
      <br />
   <Box 
  sx={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'center',
    gap: 2,
    width: '100%',
    padding: 2,
  }}
>
  {products?.map((product) => (
  <Box 
    key={product.id}
    
    sx={{ 
      width: { xs: '45%', sm: '30%', md: '20%' }, 
      boxShadow: 3,
      borderRadius: 2,
      overflow: 'hidden',
      textAlign: 'center',
      backgroundColor: '#f8f5f2',
      p: 1
    }}
  >
 <Link to={`/product/${product.id}`}>
  <img 
    src={baseUrl+product.image} 
    alt={product.name} 
    className="product-image" 
    style={{ width: '65%', height: 'auto', objectFit: 'cover', cursor: 'pointer' }}
  />
</Link>


    <div className="product-details">
      <p><strong>שם:</strong> {product.name}</p>
      <p><strong>מחיר:</strong> ₪{product.price}</p>
      <p><strong>תיאור:</strong> {product.description}</p>
      
 <div 
  className="cart-row" 
  style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} 
  onClick={() => handleAddToCart({ ...product, quantity: 1 })}
>
  <img src={imageShpe} alt="עגלת קניות" width={30} />
  <span style={{ marginLeft: '8px' }}>הוספה לסל</span>
</div>

      
    </div>
  </Box>
))}
</Box>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          המוצר נוסף בהצלחה לסל!
        </MuiAlert>
      </Snackbar>
    </>
  );
}

