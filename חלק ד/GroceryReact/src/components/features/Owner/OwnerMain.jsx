import React from "react";
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardActions 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function SupplierPage() {
    const navigate = useNavigate();
    const goToOrders = () => navigate('/Orders');
    const goToOrderGoods = () => navigate('/OrderGoods');

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                    Supplier Dashboard
                </Typography>
                
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} elevation={2}>
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                                <ShoppingCartIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Order Goods
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Create new orders from our suppliers
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    onClick={goToOrderGoods}
                                    size="large"
                                    startIcon={<ShoppingCartIcon />}
                                >
                                    Order Goods
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }} elevation={2}>
                            <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                                <VisibilityIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                                <Typography variant="h5" component="h2" gutterBottom>
                                    View Orders
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Check the status of your existing orders
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    fullWidth 
                                    variant="outlined" 
                                    onClick={goToOrders}
                                    size="large"
                                    startIcon={<VisibilityIcon />}
                                >
                                    View Orders
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}