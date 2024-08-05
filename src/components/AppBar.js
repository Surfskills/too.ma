import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from './AppBar.module.css';
import logo from '../assets/toomaLogo.svg';

const MyAppBar = ({ onLoginSuccess }) => {
  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.appBarTitle}>
          <a href="https://tooma.app" ><img src={logo} alt="Tooma Logo" /></a>
        </Typography>
        {/* <div className={styles.googleLogin}>
          <GoogleLoginComponent onLoginSuccess={onLoginSuccess} />
        </div> */}
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
