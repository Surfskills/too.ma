// src/components/FormComponent.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Box, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correctly import jwtDecode
import { getCsrfToken } from '../utils/csrf';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    expires_at: '',
    request_payment: false,
  });
  const [file, setFile] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.error('Token expired');
        localStorage.removeItem('jwtToken');
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('No token found');
      return;
    }

    const csrfToken = getCsrfToken(); // Get the CSRF token

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('message', formData.message);
    formDataToSubmit.append('expires_at', formData.expires_at);
    formDataToSubmit.append('request_payment', formData.request_payment);
    formDataToSubmit.append('file', file);

    for (const pair of formDataToSubmit.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const res = await axios.post('https://tooma-backend.onrender.com/files_app/files/', formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken,
          
        },
      });
      console.log('Backend response:', res.data);
      setSubmittedData(res.data);
    } catch (error) {
      console.error('Form submission failed', error);
      console.log('Error response:', error.response);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="message"
          name="message"
          label="Message"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="expires_at"
          name="expires_at"
          label="Expires At"
          type="datetime-local"
          variant="outlined"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="request_payment"
          name="request_payment"
          label="Request Payment"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ margin: '20px 0' }}
        />
        <Button variant="contained" color="primary" type="submit">
          Publish
        </Button>
      </Box>
      {submittedData && (
        <Paper sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6">Published Data</Typography>
        <Typography variant="body1">Title: {submittedData.title}</Typography>
        <Typography variant="body1">Message: {submittedData.message}</Typography>
        <Typography variant="body1">Expires At: {submittedData.expires_at}</Typography>
        <Typography variant="body1">Request Payment: {submittedData.request_payment}</Typography>
        <TextField
          fullWidth
          id="metadata_link"
          label="Metadata Link"
          variant="outlined"
          margin="normal"
          value={submittedData.metadata_link}
          InputProps={{
            readOnly: true,
          }}
        />
      </Paper>
      )}
    </Container>
  );
};

export default FormComponent;
