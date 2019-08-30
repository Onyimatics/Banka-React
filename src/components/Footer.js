import React from 'react';

const Footer = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '410px',
        background:'#EFEFEF'
      }}
    >
      <footer className="in" style={{}}>
        <p className="credits">Banka | Copyright © Andela 2019</p>
      </footer>
    </div>
  );
};

export default Footer;
