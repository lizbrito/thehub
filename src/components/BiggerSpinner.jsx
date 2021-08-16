import React from 'react';
import {FaSpinner} from 'react-icons/fa';
import {LogoRegular} from './Assets';

const Spinner = ({active}) => {

  return (
    <div className={active ? 'spinner--active' : 'spinner'}>
      <img src={LogoRegular} />
      <p>Preparing your project! Give us a moment...</p>
    </div>
  );
};

export default Spinner;
