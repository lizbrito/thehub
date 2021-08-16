import React, { useState } from 'react';
import Alerts from '../../components/Alerts';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const timer = () => {
    setTimeout(() => {
      setAlert(false);
    }, 5100);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubject = (e) => {
    setSubject(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(true);
    setAlertMessage('Thank you for your message, you will hear from us soon');
    timer();
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>We'd Love To Hear From You</h2>
      <div className="form-group">
        <label>
          <p>Full Name</p>
          <input type="text" className="form-control" placeholder="e.g. Jane Doe" value={name} onChange={handleName} required />
        </label>
      </div>
      <div className="form-group">
        <label>
          <p>Email</p>
          <input type="email" className="form-control" placeholder="e.g. janedoe@gmail.com" value={email} onChange={handleEmail} required />
        </label>
      </div>
      <div className="form-group">
        <label>
          <p>Subject</p>
          <input type="text" className="form-control" placeholder="e.g. Size of images" value={subject} onChange={handleSubject} required />
        </label>
      </div>
      <div className="form-group">
        <label>
          <p>Message</p>
          <textarea className="form-control" rows="5" placeholder="e.g. Write your message here. We will be happy to hear from you!" value={message} onChange={handleMessage} required />
        </label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <Alerts active={alert} message={alertMessage} />
    </form>
  );
};

export default Contact;
