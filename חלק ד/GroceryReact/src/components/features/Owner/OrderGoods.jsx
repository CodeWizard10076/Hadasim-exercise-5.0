import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllSuppliers } from '../Supplier/SupplierSlice';
import { addOrder } from '../Order/OrderSlice';
import { 
  Container, Typography, List, ListItem, ListItemText, 
  ListItemButton, Collapse, TextField, Button, Paper, 
  Box, Grid, IconButton
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export default function OrderGoods() {
    const dispatch = useDispatch();
    const supplier = useSelector((state) => state.supplier.suppliers);
    const suppliers = supplier || []
    const [expandedSupplier, setExpandedSupplier] = useState(null);
    const [orderItems, setOrderItems] = useState({});

    useEffect(() => {
        dispatch(getAllSuppliers()); 
    }, [dispatch]);
    console.log(suppliers);

    // אחראי לטפל בכל פעם שבוחרים ספק אחר
    const handleSupplierClick = (supplierId) => {
        if (expandedSupplier === supplierId) {
            setExpandedSupplier(null);
        } else {
            setExpandedSupplier(supplierId);
            // מאתחל את את הפרטים בהזמנה כשמשתנה הספק
            setOrderItems({});
        }
    };

    // עדכון הכמות למוצר
    const handleQuantityChange = (productId, value) => {
        setOrderItems(prev => ({
            ...prev,
            [productId]: Math.max(0, value)
        }));
    };

    // הוספה לכמות
    const incrementQuantity = (productId) => {
        setOrderItems(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1
        }));
    };

    // הורדה לכמות
    const decrementQuantity = (productId) => {
        if (!orderItems[productId] || orderItems[productId] <= 0) return;
        
        setOrderItems(prev => ({
            ...prev,
            [productId]: prev[productId] - 1
        }));
    };

    // בדיקה האם הכמות לא נמוכה מהכמות המינימלית
    const isQuantityValid = (product) => {
        const quantity = orderItems[product.id] || 0;
        return quantity === 0 || quantity >= product.minimumAmount;
    };

    // מקבל את כל המוצרים עם הכמות התקנית מהספק
    const getValidOrderProducts = (supplierId) => {
        const currentSupplier = suppliers.find(s => s.id === supplierId);
        if (!currentSupplier) return [];
        return currentSupplier.products
            .filter(product => {
                const quantity = orderItems[product.id] || 0;
                return quantity >= product.minimumAmount;
            })
            .map(product => ({
                productId: product.id,
                quantity: orderItems[product.id]
            }));
    };

    // אישור וביצוע הזמנה
    const handleSubmitOrder = (supplierId) => {
        const orderProducts = getValidOrderProducts(supplierId);

        if (orderProducts.length === 0) {
            alert("Please add at least one product with a quantity that meets the minimum order requirements.");
            return;
        }

        const newOrder = {
            supplierId: supplierId,
            Date: new Date().toISOString(),
            Status: "waiting",
            OrderProducts: orderProducts
        };

        dispatch(addOrder(newOrder));
        alert("Order submitted successfully!");
        setOrderItems({});
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom component="h1">
                Order Goods
            </Typography>
            
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Suppliers
                </Typography>
                <List component="nav">
                    {suppliers.map((supplier) => (
                        <React.Fragment key={supplier.id}>
                            <ListItemButton onClick={() => handleSupplierClick(supplier.id)}>
                                <ListItemText 
                                    primary={`${supplier.companyName}`} 
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                {` supplier name: ${supplier.supplierName}`}                                       
                                            </Typography>
                                            {` — ${supplier.phoneNumber}`}
                                        </>
                                    }
                                />
                                {expandedSupplier === supplier.id ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={expandedSupplier === supplier.id} timeout="auto" unmountOnExit>
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="subtitle1" sx={{ pl: 2, pt: 2 }}>
                                        Products
                                    </Typography>
                                    <List component="div" disablePadding>
                                        {supplier.products.map((product) => {
                                            const quantity = orderItems[product.id] || 0;
                                            const isValid = isQuantityValid(product);
                                            
                                            return (
                                                <ListItem 
                                                    key={product.id} 
                                                    sx={{ 
                                                        pl: 4, 
                                                        backgroundColor: !isValid ? '#fff4f4' : 'inherit'
                                                    }}
                                                >
                                                    <Grid container alignItems="center" spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <ListItemText
                                                                primary={product.name}
                                                                secondary={`productName: ${product.productName} | Min: ${product.minimumAmount}`}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <IconButton 
                                                                    size="small" 
                                                                    onClick={() => decrementQuantity(product.id)}
                                                                    disabled={quantity <= 0}
                                                                >
                                                                    <RemoveIcon />
                                                                </IconButton>
                                                                <TextField
                                                                    value={quantity}
                                                                    onChange={(e) => {
                                                                        const value = parseInt(e.target.value) || 0;
                                                                        handleQuantityChange(product.id, value);
                                                                    }}
                                                                    type="number"
                                                                    size="small"
                                                                    InputProps={{
                                                                        inputProps: { min: 0 }
                                                                    }}
                                                                    sx={{ mx: 1, width: 60 }}
                                                                    error={!isValid && quantity > 0}
                                                                    helperText={!isValid && quantity > 0 ? 
                                                                        `Min ${product.minimumAmount}` : ''}
                                                                />
                                                                <IconButton 
                                                                    size="small" 
                                                                    onClick={() => incrementQuantity(product.id)}
                                                                >
                                                                    <AddIcon />
                                                                </IconButton>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ mt: 2, mx: 2, mb: 2 }}
                                        startIcon={<AddShoppingCartIcon />}
                                        onClick={() => handleSubmitOrder(supplier.id)}
                                        disabled={getValidOrderProducts(supplier.id).length === 0}
                                    >
                                        Order It!
                                    </Button>
                                </Box>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}