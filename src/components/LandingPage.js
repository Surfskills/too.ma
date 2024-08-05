// src/components/LandingPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import { Container, Typography, Box, Avatar, Card, CardMedia, CardContent, Button, IconButton } from '@mui/material';
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaTelegram,
  FaWhatsapp,
  FaDribbble,
  FaMedium,
} from 'react-icons/fa';
import axios from 'axios';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const { username } = useParams(); // Get the username from the URL parameters
  const [storeFrontData, setStoreFrontData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:8000/auth/auth/creator_profile/retrieve/${username}/`);
        setStoreFrontData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]); 

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Typography variant="h6" className={styles.loadingText}>
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Typography variant="h6" className={styles.errorText}>
          Error loading data: {error.message}
        </Typography>
      </div>
    );
  }

  if (!storeFrontData) {
    return null; // Render nothing if there is no data
  }

  // Social media links
  const socialLinks = {
    instagram: storeFrontData.instagram,
    linkedin: storeFrontData.linkedin,
    facebook: storeFrontData.facebook,
    twitter: storeFrontData.twitter,
    youtube: storeFrontData.youtube,
    telegram: storeFrontData.telegram,
    whatsapp: storeFrontData.whatsapp,
    dribbble: storeFrontData.dribbble,
    medium: storeFrontData.medium,
  };

  return (
    <Container maxWidth="md" className={styles.container}>
      {/* Profile Section */}
      <Box className={styles.profileSection}>
        <Avatar alt={storeFrontData.display_name} src={storeFrontData.profile_image} className={styles.avatar} />
        <Typography variant="h5" className={styles.displayName}>
          {storeFrontData.display_name}
        </Typography>
        <Typography variant="body2" color="textSecondary" className={styles.shortBio}>
          {storeFrontData.short_bio}
        </Typography>
      </Box>

      {/* Products Section */}
      <Box className={styles.productsSection}>
        <Typography variant="h4" className={styles.sectionTitle}>
          Products
        </Typography>
        <Box className={styles.productsContainer}>
          {storeFrontData.file_uploads.map((product) => (
            <Card key={product.unique_id} className={styles.productCard}>
              <CardMedia
                component="img"
                alt={product.title}
                height="140"
                image={product.banner}
                className={styles.productImage}
              />
              <CardContent>
                <Typography variant="h6" className={styles.productTitle}>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={styles.productMessage}>
                  {product.message}
                </Typography>
                <Typography variant="h6" color="primary" className={styles.productPrice}>
                  ${product.payment_amount}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.viewMoreButton}
                  href={product.metadata_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View More
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Social Links Section */}
      <Box className={styles.socialLinksSection}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Follow Me
        </Typography>
        <Box className={styles.socialIcons}>
          {Object.entries(socialLinks).map(([key, value]) => {
            if (value) {
              const IconComponent = getIconComponent(key);
              return (
                <IconButton key={key} component="a" href={value} target="_blank" rel="noopener noreferrer">
                  <IconComponent size={24} />
                </IconButton>
              );
            }
            return null;
          })}
        </Box>
      </Box>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2024 Tooma. All rights reserved.{' '}
          <a href="https://www.tooma.com" target="_blank" rel="noopener noreferrer">
            Tooma
          </a>
        </Typography>
      </footer>
    </Container>
  );
};

// Helper function to map social keys to icons
const getIconComponent = (key) => {
  const iconMap = {
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    facebook: FaFacebook,
    twitter: FaTwitter,
    youtube: FaYoutube,
    telegram: FaTelegram,
    whatsapp: FaWhatsapp,
    dribbble: FaDribbble,
    medium: FaMedium,
  };
  return iconMap[key];
};

export default LandingPage;
