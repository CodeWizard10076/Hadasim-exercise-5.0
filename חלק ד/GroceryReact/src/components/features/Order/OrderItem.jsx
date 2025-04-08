import React from "react";
import { Paper, Typography, Button, Box, Divider, Chip, Grid, List, ListItem, ListItemText } from '@mui/material';
import { format } from 'date-fns';

const OrderItem = ({ order, onApprove, isWaiting }) => {
    // בדיקת הפורמט של התאריך
    const formattedDate = order.date instanceof Date 
        ? format(order.date, 'PPP') 
        : format(new Date(order.date), 'PPP');

    // חישוב הסכום הכולל של ההזמנה
    const calculateTotal = () => {
        return order.OrderProducts.reduce(
            (total, item) => total + (item.Quantity * (item.Product.Price || 0)), 
            0
        );
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Order #{order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Date: {formattedDate}
                    </Typography>
                    <Chip 
                        label={order.status} 
                        color={
                            order.status === "approved" ? "success" : 
                            order.status === "processing" ? "primary" : "warning"
                        }
                        size="small"
                        sx={{ mt: 1 }}
                    />
                </Grid>
                
                <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                    {isWaiting && (
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => onApprove(order)}
                        >
                            Approve Order
                        </Button>
                    )}
                </Grid>
                
                <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                        Order Items
                    </Typography>
                    
                    <List disablePadding>
                        {order.orderProducts.map((item, index) => (
                            <ListItem key={index} sx={{ py: 1, px: 0 }}>
                                <ListItemText
                                    primary={item.product.productName}
                                    secondary={`Quantity: ${item.quantity}`}
                                />
                                {item.product.price && (
                                    <Typography variant="body2">
                                        ${(item.Quantity * item.product.price).toFixed(2)}
                                    </Typography>
                                )}
                            </ListItem>
                        ))}
                        
                        {order.OrderProducts.some(item => item.product.price) && (
                            <>
                                <Divider sx={{ my: 1 }} />
                                <ListItem sx={{ py: 1, px: 0 }}>
                                    <ListItemText primary="Total" />
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        ${calculateTotal().toFixed(2)}
                                    </Typography>
                                </ListItem>
                            </>
                        )}
                    </List>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default OrderItem;