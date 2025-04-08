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
  CardActions,
  Divider
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';

export default function Entrance() {
    const navigate = useNavigate();
    const goToLogin = () => navigate('/Login');
    const goToOwner = () => navigate('/OwnerLogin');

    return (
        <Container 
            maxWidth="sm" 
            sx={{ 
                height: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}
        >
            <Paper 
                elevation={4} 
                sx={{ 
                    p: 4, 
                    width: '100%', 
                    borderRadius: 2,
                    textAlign: 'center'
                }}
            >
                <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom 
                    sx={{ 
                        mb: 4,
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }}
                >
                    Welcome
                </Typography>
                
                <Typography 
                    variant="subtitle1" 
                    color="text.secondary" 
                    sx={{ mb: 4 }}
                >
                    Please select your login type
                </Typography>
                
                <Divider sx={{ mb: 4 }} />
                
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            onClick={goToOwner}
                            size="large"
                            startIcon={<AdminPanelSettingsIcon />}
                            sx={{ 
                                py: 1.5,
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                }
                            }}
                        >
                            Admin Login
                        </Button>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                        <Button 
                            fullWidth 
                            variant="outlined" 
                            onClick={goToLogin}
                            size="large"
                            startIcon={<BusinessIcon />}
                            sx={{ py: 1.5 }}
                        >
                            Supplier Entry
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}