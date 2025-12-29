import React from 'react'

const Container = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-10">
      {children}
    </div>
  );
};

export default Container;
