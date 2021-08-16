import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { RocketImg, RocketGp, BalloonImg, BalloonGp } from './Assets';

const CallToAction = ({ auth }) => (
  <section className="call-to">
    <div className="call-to__inner">

      <div className="call-to__left">
        {auth.session
          ? <img className="call-to__balloon" src={BalloonImg} srcSet={BalloonGp} alt="The Hub Balloon" />
          : <img className="call-to__rocket" src={RocketImg} srcSet={RocketGp} alt="The Hub Rocket" />}

      </div>

      <div className="call-to__right">
        {auth.session
          ? (
            <>
              <h2> Engage The HUB community by<br /> sharing your thoughts.</h2>

              <p>Let’s make it! Share your opinions on other<br /> people’s projects and give them feedback.</p>

              <NavLink to="/">Check the projects</NavLink>
            </>
          )
          : (
            <>
              <h2>Join The HUB community to <br /> share your do it yourself project.</h2>

              <p>Let’s make it! See other DIY projects that <br /> people love & participate yourself.</p>

              <NavLink to="/">Sign Up</NavLink>
            </>
          )}
      </div>

    </div>
  </section>
);

export default connect((state) => ({
  auth: state.auth,
}))(CallToAction);
