import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import {ToggleButtonGroup, ToggleButton, Divider, TextField} from "@mui/material";
import { useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';
import Paper from "@mui/material/Paper";
import isStrongPassword from "validator/es/lib/isStrongPassword";
import isEmail from "validator/es/lib/isEmail";
import { registerWithEmailAndPassword, createUserDocFromAuth } from "../firebase/firebase";
import {Link, useNavigate} from "react-router-dom";

function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const validateInputs = () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            setError('All fields are required')
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return false;
        }

        if (!isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
        })) {
            setError('Password should include uppercase, lowercase, and numbers');
            return false;
        }

        if (!isEmail(email)) {
            setError('Email is incorrect');
            return false;
        }

        return true;
    }

    const handleSubmit = async () => {
        if (validateInputs()) {
            try {
                const userCredential = await registerWithEmailAndPassword(email, password);
                await createUserDocFromAuth(userCredential.user, {
                    email,
                    firstName,
                    lastName,
                });
                navigate("/login");
            }
            catch (error) {
                setError(error.message);
            }
        }
    }

    return (
        <Container maxWidth="md">
            <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography variant="h4" mb={4} color="primary" fontWeight={"bold"}>Create a DEV@Deakin Account</Typography>
                    <Stack spacing={2} mb={4}>
                        <Typography component='h1' variant='h5'>First Name *</Typography>
                        <TextField id="outlined-basic" variant="outlined" value={firstName}
                                   onChange={(e) => setFirstName(e.target.value)}
                                   fullWidth/>
                    </Stack>
                    <Stack spacing={2} mb={4}>
                        <Typography component='h1' variant='h5'>Last Name *</Typography>
                        <TextField id="outlined-basic" variant="outlined" value={lastName}
                                   onChange={(e) => setLastName(e.target.value)}
                                   fullWidth/>
                    </Stack>
                    <Stack spacing={2} mb={4}>
                        <Typography component='h1' variant='h5'>Email *</Typography>
                        <TextField id="outlined-basic" variant="outlined" value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   fullWidth/>
                    </Stack>
                    <Stack spacing={2} mb={4}>
                        <Typography component='h1' variant='h5'>Password *</Typography>
                        <TextField id="outlined-basic" variant="outlined" type={"password"} value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   fullWidth/>
                    </Stack>
                    <Stack spacing={2} mb={4}>
                        <Typography component='h1' variant='h5'>Confirm Password *</Typography>
                        <TextField id="outlined-basic" variant="outlined" type={"password"}
                                   value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}
                                   fullWidth/>
                    </Stack>
                    {error && <Typography color="error" variant="h6">{error}</Typography>}
                    <Stack direction="row" spacing={2} mt={5}>
                        <Button variant="contained" size="large" color="primary" endIcon={<SendIcon />}
                                onClick={handleSubmit}>Create</Button>
                        <Button component={Link} to="/login" variant="outlined" size="large" color="primary">Back</Button>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    )
}

export default RegisterPage;