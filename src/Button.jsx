import React from 'react';

export const Button = ({ className = "", children, ...props }) => {
  return (
    <button className={`input-button ${className}`}{...props}>{children}</button>
  )
}