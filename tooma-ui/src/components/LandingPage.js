import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Link,
  Grid,
  Avatar,
} from '@mui/material';
import styles from './LandingPage.module.css';

const currentYear = new Date().getFullYear();

const LandingPage = () => {
  const { username } = useParams(); // Get username from the URL
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Creator Profile
  useEffect(() => {
    const fetchCreatorProfile = async () => {
      if (!username) {
        setError(new Error('Username is undefined or invalid.'));
        setLoading(false);
        return;
      }

      console.log(`Fetching profile for username: ${username}`);

      try {
        const profileRes = await axios.get(
          `https://tooma-backend.onrender.com/auth/creator_profile/retrieve/${username}/`
        );

        console.log('Profile data received:', profileRes.data);

        setProfileData(profileRes.data);
      } catch (error) {
        console.error('Error fetching profile:', error);

        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorProfile();
  }, [username]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading data: {error.message}</Typography>;
  }

  return (
    <div className={styles.container}>
      {profileData && (
        <div className={styles.profileSection}>
          <Card className={styles.profileCard}>
            <CardContent>
              <Avatar
                src={profileData.profile_image}
                alt={profileData.display_name}
                className={styles.avatar}
              />
              <Typography variant="h5" component="div">
                {profileData.display_name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {profileData.short_bio}
              </Typography>
              <div className={styles.socialLinks}>
                {profileData.instagram && (
                  <Link href={profileData.instagram} target="_blank" rel="noopener">
                    Instagram
                  </Link>
                )}
                {profileData.linkedin && (
                  <Link href={profileData.linkedin} target="_blank" rel="noopener">
                    LinkedIn
                  </Link>
                )}
                {profileData.facebook && (
                  <Link href={profileData.facebook} target="_blank" rel="noopener">
                    Facebook
                  </Link>
                )}
                {profileData.twitter && (
                  <Link href={profileData.twitter} target="_blank" rel="noopener">
                    Twitter
                  </Link>
                )}
                {profileData.youtube && (
                  <Link href={profileData.youtube} target="_blank" rel="noopener">
                    YouTube
                  </Link>
                )}
                {profileData.telegram && (
                  <Link href={profileData.telegram} target="_blank" rel="noopener">
                    Telegram
                  </Link>
                )}
                {profileData.whatsapp && (
                  <Link href={profileData.whatsapp} target="_blank" rel="noopener">
                    WhatsApp
                  </Link>
                )}
                {profileData.dribbble && (
                  <Link href={profileData.dribbble} target="_blank" rel="noopener">
                    Dribbble
                  </Link>
                )}
                {profileData.medium && (
                  <Link href={profileData.medium} target="_blank" rel="noopener">
                    Medium
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Grid container spacing={3} className={styles.productsSection}>
        {profileData?.file_uploads?.map((upload) => (
          <Grid item xs={12} sm={6} md={4} key={upload.unique_id}>
            <Card className={styles.productCard}>
              <CardMedia
                component="img"
                height="200"
                image={upload.banner}
                alt={upload.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {upload.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {upload.message}
                </Typography>
                <Typography variant="h6">${upload.payment_amount}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  href={upload.metadata_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div className={styles.footer}>
        <Typography variant="body2" color="textSecondary">
          &copy; {currentYear} Tooma. All rights reserved.{' '}
          <Link href="https://app.tooma.app">Tooma</Link>
        </Typography>
      </div>
    </div>
  );
};

export default LandingPage;
