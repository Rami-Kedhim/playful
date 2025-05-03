
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-border py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Neural Analytics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
