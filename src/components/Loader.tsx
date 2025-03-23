import React from 'react';
import { UI_TEXT } from '../constants/messages';

const Loader: React.FC = () => {
  return (
    <div className="loading">
      <div className="loader"></div>
      <p>{UI_TEXT.LOADING}</p>
    </div>
  );
};

export default Loader;