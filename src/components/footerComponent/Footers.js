import React from 'react';
import { FaLinkedin, FaGithub, FaMedium } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footerContainer}>
      <a href="https://www.linkedin.com/in/saim-can-%C3%B6zgen" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
        <FaLinkedin size={24} style={styles.icon} />
      </a>
      <a href="https://github.com/saimthecan" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
        <FaGithub size={24} style={styles.icon} />
      </a>
      <a href="https://medium.com/@canozgen" target="_blank" rel="noopener noreferrer" style={styles.iconLink}>
        <FaMedium size={24} style={styles.icon} />
      </a>
    </footer>
  );
};

const styles = {
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '1rem',
  },
  iconLink: {
    margin: '0 0.5rem',
    color: '#fff',
    textDecoration: 'none',
  },
  icon: {
    transition: '0.3s',
    '&:hover': {
      color: '#0077b5',
    },
  },
};

export default Footer;
