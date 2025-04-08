import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from './OwnerSlice';
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    
    const { isAuthenticated, error } = useSelector(state => state.admin);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAdmin(password));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/OwnerMain');
        }
    }, [isAuthenticated, navigate]);
    

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} sx={{ p: 4, width: 350 }}>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                    Admin Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default AdminLogin;
