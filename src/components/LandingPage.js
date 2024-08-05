import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  FormGroup,
  Switch,
} from '@mui/material';
import axios from 'axios';
import styles from './LandingPage.module.css';

const currentYear = new Date().getFullYear();

const LandingPage = () => {
  const { uniqueId, buyer_info_id } = useParams();
  const navigate = useNavigate();
  const [linkData, setLinkData] = useState(null);
  const [buyerInfo, setBuyerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [alreadyBought, setAlreadyBought] = useState(false);
  const [emailForDownload, setEmailForDownload] = useState('');
  const [customRequest, setCustomRequest] = useState(false);
  const [requirements, setRequirements] = useState('');

  const BACKEND_URL = 'https://tooma-backend.onrender.com';

  useEffect(() => {
    const fetchLinkData = async () => {
      setLoading(true);
      try {
        console.log('Fetching link data for uniqueId', uniqueId);
        const linkRes = await axios.get(`${BACKEND_URL}/files_app/files/${uniqueId}/`);
        console.log('Link data received:', linkRes.data);
        setLinkData(linkRes.data);

        if (linkRes.data.payment_amount === null) {
          console.log('Payment amount is null, redirecting...');
          navigate(`/shared/${uniqueId}/`);
          return;
        }

        if (linkRes.data.buyer_info && linkRes.data.buyer_info.length > 0) {
          setBuyerInfo(linkRes.data.buyer_info[0]); // Assuming the first item in the array is the relevant one
        }

        if (linkRes.data.buyer_email) {
          setEmail(linkRes.data.buyer_email);
          setName(linkRes.data.buyer_name);
        }
      } catch (error) {
        console.error('Error fetching link data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkData();
  }, [uniqueId, navigate]);

  useEffect(() => {
    const fetchBuyerInfo = async () => {
      if (!buyer_info_id) return;

      setLoading(true);
      try {
        console.log('Fetching buyer info for id:', buyer_info_id);
        const buyerInfoRes = await axios.get(`${BACKEND_URL}/files_app/buyers/${buyer_info_id}/`);
        console.log('BuyerInfo data received:', buyerInfoRes.data);
        setBuyerInfo(buyerInfoRes.data);

        // Update linkData with the latest payment status
        setLinkData((prevLinkData) => ({
          ...prevLinkData,
          payment_status: buyerInfoRes.data.payment_status,
        }));
      } catch (error) {
        console.error('Error fetching BuyerInfo:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerInfo();
  }, [buyer_info_id]);

  useEffect(() => {
    console.log('Current linkData:', linkData);
    console.log('Current buyerInfo:', buyerInfo);
  }, [linkData, buyerInfo]);

  const handleDownload = () => {
    console.log('Initiating download for:', linkData.title);
    const link = document.createElement('a');
    link.href = linkData.s3_download_link;
    link.setAttribute('download', linkData.title);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBuy = () => {
    console.log('Opening buy dialog');
    setOpen(true);
  };

  const handleAlreadyBought = (event) => {
    setAlreadyBought(event.target.checked);
    if (event.target.checked) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    console.log('Closing dialog');
    setOpen(false);
    setAlreadyBought(false);
    setCustomRequest(false); // Reset custom request toggle on close
    setRequirements(''); // Clear the requirements field
  };

  const handleFormSubmit = async () => {
    console.log('Submitting form with email:', email, 'and name:', name, 'and requirements:', requirements);
    try {
      const response = await axios.post(`${BACKEND_URL}/files_app/buyers/create/${uniqueId}/`, {
        buyer_email: email,
        buyer_name: name,
        payment_status: '',
        requirements: customRequest ? requirements : null, // Only include requirements if custom request is active
      });
      console.log('Response from server:', response.data);

      const paymentLink = response.data.payment_link;
      if (paymentLink) {
        console.log('Redirecting to payment link:', paymentLink);
        window.location.href = paymentLink;
      } else {
        console.error('Payment link is missing in response data');
      }
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  const handleEmailSubmit = async () => {
    console.log('Submitting email for verification:', emailForDownload);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/files_app/buyers/verify-buyer-email/${uniqueId}/`,
        {
          buyer_email: emailForDownload,
        }
      );

      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      if (response.status === 200) {
        const buyerData = response.data;
        if (buyerData.payment_status === 'paid') {
          console.log('Payment verified. Redirecting to download page.');
          window.location.href = `https://toomaapp-git-main-experiolearns-projects.vercel.app/shared/${buyerData.file_upload_unique_id}/${buyerData.buyer_info_id}/`;
        } else {
          alert('Email Verified! Payment Status: ' + buyerData.payment_status);
        }
      } else {
        console.error('Unexpected response status:', response.status);
        alert('Invalid email. Please enter the email used to purchase the file.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        if (error.response.status === 404) {
          alert('Invalid email. Please enter the email used to purchase the file.');
        } else {
          alert('An error occurred. Please try again later.');
        }
      } else {
        console.error('Error message:', error.message);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  const ThankYouMessage = () => (
    <Paper className={styles.thankYouMessage}>
      <Typography variant="h4" gutterBottom>
        Thank You for Your Purchase!
      </Typography>
      <Typography variant="body1">
        We appreciate your purchase. Please keep an eye on your email for your order once the creator fulfills it.
      </Typography>
    </Paper>
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading data: {error.message}</Typography>;
  }

  const formattedExpiry =
    linkData &&
    new Date(linkData.expires_at).toLocaleString('en-US', {
      dateStyle: 'short',
      timeStyle: 'short',
    });

  // Modified conditions for showing components
  const showThankYouMessage =
    (linkData?.s3_download_link === null && buyerInfo?.payment_status === 'paid') ||
    (linkData?.s3_download_link === null && linkData?.payment_status === 'paid');

  const showDownloadButton =
    (buyerInfo?.payment_status === 'paid' ||
      linkData?.payment_status === 'paid' ||
      linkData?.payment_amount === null) &&
    linkData?.s3_download_link;

  const showBuyButton = !buyerInfo || (buyerInfo?.payment_status !== 'paid' && linkData?.payment_status !== 'paid');

  console.log('Show thank you message:', showThankYouMessage);
  console.log('Show download button:', showDownloadButton);
  console.log('Show buy button:', showBuyButton);

  return (
    <div className={styles.container}>
      {showThankYouMessage ? (
        <ThankYouMessage />
      ) : (
        <>
          <div className={styles.header}>
            <h1>You have files to download</h1>
            <p>This link will expire on {formattedExpiry}, please download your items before then.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.fileCard}>
              <div className={styles.fileDetails}>
                <p className={styles.fileName}>File Name: {linkData?.title}</p>
                <p className={styles.fileMessage}>Message: {linkData?.message}</p>
              </div>
              <div className={styles.fileActions}>
                {showDownloadButton ? (
                  <Button
                    variant="contained"
                    className={styles.downloadButton}
                    onClick={handleDownload}
                  >
                    Download File
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      className={styles.buyButton}
                      onClick={handleBuy}
                      disabled={!showBuyButton}
                    >
                      Buy
                    </Button>
                    <FormControlLabel
                      control={<Checkbox checked={alreadyBought} onChange={handleAlreadyBought} />}
                      label="I already bought the file"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <div className={styles.footer}>
        <Typography variant="body2" color="textSecondary">
          &copy; {currentYear} Tooma. All rights reserved.
        </Typography>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{alreadyBought ? 'Enter Your Email' : 'Enter Your Details'}</DialogTitle>
        <DialogContent style={{ minWidth: '400px' }}>
          {!alreadyBought && (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={customRequest}
                      onChange={() => setCustomRequest(!customRequest)}
                      color="primary"
                    />
                  }
                  label="Make a Custom Request"
                />
              </FormGroup>
              {customRequest && (
                <TextField
                  margin="dense"
                  label="Requirements"
                  type="text"
                  fullWidth
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  multiline
                  rows={4}
                />
              )}
            </>
          )}
          {alreadyBought && (
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={emailForDownload}
              onChange={(e) => setEmailForDownload(e.target.value)}
              required
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={alreadyBought ? handleEmailSubmit : handleFormSubmit} color="primary">
            {alreadyBought ? 'Verify and Download' : 'Save and Continue to Checkout'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LandingPage;
