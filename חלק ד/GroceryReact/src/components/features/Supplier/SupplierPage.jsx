import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersBySupplierId,updateOrder } from '../Order/OrderSlice';
import { Container, Typography, Tabs, Tab, Box, Paper, Grid } from '@mui/material';
import OrderItem from "../Order/OrderItem";

export default function SupplierPage() {
    const dispatch = useDispatch();
    const supplierId = useSelector((state) => state.supplier.currentSupplierId);
    const orders = useSelector((state) => state.order.orders);
    const [activeStatus, setActiveStatus] = useState("waiting");

    useEffect(() => {
        dispatch(getOrdersBySupplierId(supplierId)); 
    }, [dispatch, supplierId]);

    // מטפל כאשר הסטטוס השתנה או שהסינוון משתנה
    const handleStatusChange = (event, newStatus) => {
        setActiveStatus(newStatus);
    };

    // סינון ההזמנות
    const filteredOrders = orders.filter(order => order.status === activeStatus);

    // עדכון הזמנה
    const handleApproveOrder = (order) => {
        console.log('order',order)
        dispatch(updateOrder({
            id: order.id,
            updatedOrder: "processing"
        }));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom component="h1">
                Order Management
            </Typography>
            
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs 
                    value={activeStatus} 
                    onChange={handleStatusChange}
                    aria-label="order status tabs"
                    variant="fullWidth"
                >
                    <Tab label="Orders Pending Confirmation" value="waiting" />
                    <Tab label="Orders In Progress" value="processing" />
                    <Tab label="Completed Orders" value="approved" />
                </Tabs>
            </Box>

            {filteredOrders.length === 0 ? (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1">
                        No orders found with status: {activeStatus}
                    </Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {filteredOrders.map(order => (
                        <Grid item xs={12} key={order.id}>
                            <OrderItem 
                                order={order} 
                                onApprove={handleApproveOrder}
                                isWaiting={activeStatus === "waiting"}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}