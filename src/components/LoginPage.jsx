import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import {ToggleButtonGroup, ToggleButton, Divider, TextField} from "@mui/material";
import {Link, useNavigate} from "react-router-dom"
import { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import Paper from "@mui/material/Paper";
import {createUserDocFromAuth, loginWithEmailAndPassword} from "../firebase/firebase";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('All fields are required')
            return;
        }

        try {
            await loginWithEmailAndPassword(email, password);
            navigate("/login");
        }
        catch (error) {
            setError(error.message);
        }
    }

    return (
        <Container maxWidth="md">
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography variant="h4" mb={4} color="primary">Login</Typography>
                    <Stack spacing={2} mb={4}>
                        <Typography component='h1' variant='h5'>Your Email</Typography>
                        <TextField id="outlined-basic" variant="outlined" value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   fullWidth/>
                    </Stack>
                    <Stack spacing={2} mb={4}>
                        <Typography component='h1' variant='h5'>Your Password</Typography>
                        <TextField id="outlined-basic" variant="outlined" type={"password"} value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   fullWidth/>
                    </Stack>
                    {error && <Typography color="error" variant="h6">{error}</Typography>}
                    <Stack direction="row" spacing={2} mt={5}>
                        <Button variant="contained" size="large" color="primary" endIcon={<SendIcon />} onClick={handleLogin}>Login</Button>
                        <Button component={Link} to="/register" variant="outlined" size="large" color="primary" endIcon={<SendIcon />}>Sign Up</Button>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    )
}

export default LoginPage;