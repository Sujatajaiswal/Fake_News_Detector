import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Paper, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './App.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
    const [text, setText] = useState('');
    const [prediction, setPrediction] = useState('');
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/predict', { text });
            setPrediction(response.data.prediction == 1 ? 'Fake News' : 'Real News');
            setOpen(true);
        } catch (error) {
            console.error('Error predicting news:', error);
            setError(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setError(false);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Fake News Detector
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Enter news article text"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ marginBottom: '20px' }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Check
                    </Button>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Prediction: {prediction}
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        An error occurred while predicting.
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
}

export default App;