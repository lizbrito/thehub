import React from 'react';

const Alers = (props) => {
  const { active, message } = props;

  return (
    <div className={active ? 'alerts--active' : 'alerts'}>
      <p>{message}</p>
    </div>
  );
};

export default Alers;
