import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Checkbox, FormControlLabel, Container, Typography, IconButton, Paper, Grid, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { registerSupplier } from './SupplierSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const nav = useNavigate();
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    password: '',
    phoneNumber: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  // מערך של הסחורות של הספק
  const [products, setProducts] = useState([
    { id: Date.now(), productName: '', price: '', minimumAmount: '' }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // עדכון פרטי סחורה
  const handleProductChange = (id, field, value) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  // הוספת סחורה חדשה
  const addProduct = () => {
    setProducts([...products, {
      id: Date.now(),
      productName: '',
      price: '',
      minimumAmount: ''
    }]);
  };

  // הסרת סחורה
  const removeProduct = (id) => {
    if (products.length > 1) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // הכנסת ספק חדש
  const handleSubmit = (e) => {
    e.preventDefault();

    // בודק האם הסיסמא תואמת
    if (formData.password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // מוודא שכל השדות מלאים
    const invalidProducts = products.filter(
      product => !product.productName || !product.price || !product.minimumAmount
    );

    if (invalidProducts.length > 0) {
      alert("Please fill in all product details!");
      return;
    }

    // שולח את המידע לredux 
    const cleanedProducts = products.map(({ id, ...rest }) => ({
      ...rest,
      price: Number(rest.price),
      minimumAmount: Number(rest.minimumAmount),
      supplier: null
    }));

    dispatch(registerSupplier({
      supplierName: formData.name,
      companyName: formData.companyName,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      products: cleanedProducts,
    }));

    setFlag(true);
    nav('/SupplierPage')
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{ color: 'gray', marginTop: '20px', textAlign: 'center' }}
      >
        Supplier Registration
      </Typography>

      <form onSubmit={handleSubmit}>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Supplier Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Supplier Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <Typography variant="h6">
              Product List
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={addProduct}
            >
              Add Product
            </Button>
          </div>

          <Divider style={{ marginBottom: '15px' }} />

          {products.map((product, index) => (
            <Paper
              key={product.id}
              elevation={1}
              style={{ padding: '15px', marginBottom: '15px', backgroundColor: '#f9f9f9' }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Product {index + 1}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Product Name"
                    value={product.productName}
                    onChange={(e) => handleProductChange(product.id, 'productName', e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Price Per Unit"
                    type="number"
                    value={product.price}
                    onChange={(e) => handleProductChange(product.id, 'price', e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Minimum Order Quantity"
                    type="number"
                    value={product.minimumAmount}
                    onChange={(e) => handleProductChange(product.id, 'minimumAmount', e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={2}>
                  <IconButton
                    color="error"
                    onClick={() => removeProduct(product.id)}
                    disabled={products.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Paper>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{ padding: '12px' }}
        >
          Register as Supplier
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;