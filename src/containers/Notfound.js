import React from 'react';

const Notfound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>The page you are looking for does not exist.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: '3rem',
    margin: '0',
    color: '#333',
  },
  message: {
    fontSize: '1.5rem',
    color: '#666',
  },
};

export default Notfound;
