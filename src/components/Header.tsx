import React from 'react';

const styles = {
  header: {
    height: '56px',
    backgroundColor: 'navy',
    color: 'white'
  }
};

const Header = () => {
  return (
    <div style={styles.header} className={'shadow p-3'}>
      <h5>Compelo</h5>
    </div>
  );
};

export default Header;
