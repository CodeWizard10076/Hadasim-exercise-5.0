import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrder } from '../Order/OrderSlice';
import { useDispatch, useSelector } from 'react-redux';
import OrderItem from "../Order/OrderItem";
import { Container, Typography, Tabs, Tab, Box, Paper, Grid } from '@mui/material';

export default function Orders() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);
    const [viewMode, setViewMode] = useState("all");
    
    useEffect(() => {
        dispatch(getAllOrders()); 
    }, [dispatch]);
    
    // מטפל בשינוי הבחירה של ההזמנות
    const handleViewChange = (event, newView) => {
        setViewMode(newView);
    };
    
    // סינון להזמנות
    const filteredOrders = viewMode === "all" 
        ? orders 
        : orders.filter(order => order.status === "processing");
    
    // עדכון סטטוס הזמנה
    const handleApproveOrder = (orderId) => {
        console.log(orderId);
        dispatch(updateOrder({
            id: orderId.id,
            updatedOrder: "approved"
        }));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom component="h1">
                Orders Dashboard
            </Typography>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs 
                    value={viewMode} 
                    onChange={handleViewChange}
                    aria-label="order view tabs"
                    variant="fullWidth"
                >
                    <Tab label="All Orders" value="all" />
                    <Tab label="Orders In Process" value="processing" />
                </Tabs>
            </Box>
            
            {filteredOrders.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1">
                        {viewMode === "all" 
                            ? "No orders found" 
                            : "No orders in process found"}
                    </Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {filteredOrders.map(order => (
                        <Grid item xs={12} key={order.id}>
                            <OrderItem 
                                order={order} 
                                onApprove={handleApproveOrder}
                                isWaiting={viewMode === "processing"}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}