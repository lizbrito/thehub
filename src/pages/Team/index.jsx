import React from 'react';
import { FaLinkedin, FaGithub, FaBehance, FaHome } from 'react-icons/fa';
import CallToAction from '../../components/CallToAction';
import { Gustavo, Marina, Leonart, Taichi, Liz, Julia, Yuvraj, Mandeep } from '../../components/Assets';

const Team = () => {
  function showBio(bio, id) {
    document.querySelector('.about__bio').innerHTML = `<p>${bio}</p>`;
    document.querySelector('.about__bio').style.opacity = 1;
    // Change name color to accent color
    document.querySelector(`.about__memberTile:nth-child(${id})>h3`).style.color = '#0b7a75';
  }

  function hideBio(id) {
    document.querySelector('.about__bio').innerHTML = '';
    document.querySelector('.about__bio').style.opacity = 0;
    // Change name color back to original color
    document.querySelector(`.about__memberTile:nth-child(${id})>h3`).style.color = 'black';
  }

  return (
    <>
      <main className="about">

        <div className="about__innerDiv">

          <div className="about__leftDiv">
            <span>
              <h1>Meet the Team</h1>
              <p>Collaboration is our middle name.<br />We are a group of different career background,
                life-long learners ready to solve any problem.
              </p>
            </span>
          </div>

          <div className="about__membersDiv">

            <div className="about__memberTile">

              <img src={Gustavo} alt="Team Member Avatar" onMouseOver={() => showBio('Art Director and Graphic Designer, now expanding my skills in UX/UI Design here in Canada.', 1)} onFocus={() => showBio('Art Director and Graphic Designer, now expanding my skills in UX/UI Design.', 1)} onMouseOut={() => hideBio(1)} onBlur={() => hideBio(1)} />

              <h3>Gustavo</h3>

              <p>Brand & Lead Designer</p>

              <span>
                <a href="https://linkedin.com/in/gpalladini" aria-label="Link to linkedIn" rel="noopener noreferrer" title="LinkedIn" target="_blank"><FaLinkedin /></a>
                <a href="https://gp.art.br" aria-label="Link to behance" title="Behance" rel="noopener noreferrer" target="_blank"><FaHome /></a>
              </span>

            </div>

            <div className="about__memberTile">

              <img src={Marina} alt="Team Member Avatar" onMouseOver={() => showBio('UX/UI designer who loves to learn and to create visual solutions for web and mobile applications. I also have an editorial design background with many projects for both digital and printed media.', 2)} onFocus={() => showBio('UX/UI designer who loves to learn and to create visual solutions for web and mobile applications. I also have an editorial design background with many projects for both digital and printed media.', 2)} onMouseOut={() => hideBio(2)} onBlur={() => hideBio(2)} />

              <h3>Marina</h3>

              <p>Lead UI/UX Designer</p>

              <span>
                <a href="https://linkedin.com/in/lemos-marina" aria-label="Link to linkedIn" title="LinkedIn" rel="noopener noreferrer" target="_blank"><FaLinkedin /></a>
                <a href="https://behance.net/lemos_marina" aria-label="Link to behance" title="Behance" rel="noopener noreferrer" target="_blank"><FaBehance /></a>
              </span>

            </div>

            <div className="about__memberTile">

              <img src={Leonart} alt="Team Member Avatar" onMouseOver={() => showBio('Full-Stack developer with background in accounting. 8 years working as freelancer some of my skills includes, websites optimizations, React, PHP, SQL, SEO, UX/UI, webdesign, Node.js. I like to help business grow and learn new skills!', 3)} onFocus={() => showBio('Full-Stack Web Developer and a Nerd who likes to create modules even when you don\'t need!', 3)} onMouseOut={() => hideBio(3)} onBlur={() => hideBio(3)} />

              <h3>Leonart</h3>

              <p>Full-Stack Lead Developer</p>

              <span>
                <a href="https://linkedin.com/in/leonartgutz/" aria-label="Link to linkedIn" title="LinkedIn" rel="noopener noreferrer" target="_blank"><FaLinkedin /></a>
                <a href="https://github.com/leonartgutz" aria-label="Link to github" title="GitHub" rel="noopener noreferrer" target="_blank"><FaGithub /></a>
              </span>

            </div>

            <div className="about__memberTile">

              <img src={Julia} alt="Team Member Avatar" onMouseOver={() => showBio('UX/UI designer with a background in public relations. Great eye for details, very organized, and hard worker. As a project manager, I will be responsible for keeping the team on track.', 4)} onFocus={() => showBio('UX/UI designer with a background in public relations. Great eye for details, very organized, and hard worker. As a project manager, I will be responsible for keeping the team on track.', 4)} onMouseOut={() => hideBio(4)} onBlur={() => hideBio(4)} />

              <h3>Julia</h3>

              <p>Project Manager</p>

              <span>
                <a href="https://linkedin.com/in/julia-francese" aria-label="Link to linkedIn" title="LinkedIn" rel="noopener noreferrer" target="_blank"><FaLinkedin /></a>
                <a href="https://www.behance.net/juliafrancese" aria-label="Link to behance" title="Behance" rel="noopener noreferrer" target="_blank"><FaBehance /></a>
              </span>

            </div>

            <div className="about__memberTile">

              <img src={Liz} alt="Team Member Avatar" onMouseOver={() => showBio("Front-End Developer with Bachelor's Degree in Architecture and enrolled in Post-Degree Diploma in Web and App Mobile Developer. Passionate about learning and excited to expand my development knowledge.", 5)} onFocus={() => showBio("Front-End Developer with Bachelor's Degree in Architecture and enrolled in Post-Degree Diploma in Web and App Mobile Developer. Passionate about learning and excited to expand my development knowledge.", 5)} onMouseOut={() => hideBio(5)} onBlur={() => hideBio(5)} />

              <h3>Liz</h3>

              <p>Front-End Developer</p>

              <span>
                <a href="https://linkedin.com/in/lizcostafernandes" aria-label="Link to linkedIn" title="LinkedIn" rel="noopener noreferrer" target="_blank"><FaLinkedin /></a>
                <a href="https://github.com/lizbrito" aria-label="Link to github" title="GitHub" rel="noopener noreferrer" target="_blank"><FaGithub /></a>
              </span>

            </div>

            <div className="about__memberTile">

              <img src={Taichi} alt="Team Member Avatar" onMouseOver={() => showBio('Front End Developer with background in Engineering (Biochemistry). With agile project experience developing Web & Mobile app, and skills in JavaScript ES6, Node.js and React.js.', 6)} onFocus={() => showBio('Front End Developer with background in Engineering (Biochemistry). With agile project experience developing Web & Mobile app, and skills in JavaScript ES6, Node.js and React.js.', 6)} onMouseOut={() => hideBio(6)} onBlur={() => hideBio(6)} />

              <h3>Taichi</h3>

              <p>Front-End Developer & QA</p>

              <span>
                <a href="https://linkedin.com/in/taichimurai" aria-label="Link to linkedIn" title="LinkedIn" rel="noopener noreferrer" target="_blank"><FaLinkedin /></a>
                <a href="https://github.com/epmt6528" aria-label="Link to github" title="GitHub" rel="noopener noreferrer" target="_blank"><FaGithub /></a>
              </span>

            </div>

            <div className="about__memberTile">

              <img src={Yuvraj} alt="Team Member Avatar" onMouseOver={() => showBio('UX/UI designer with background in Engineering Computer Science. I am learning the  different aspects of design like space, perspective, balance. Actively helping the team in the UX/UI of the project while studying the market for it.', 7)} onFocus={() => showBio('UX/UI designer with background in Engineering Computer Science. I am learning the  different aspects of design like space, perspective, balance. Actively helping the team in the UX/UI of the project while studying the market for it.', 7)} onMouseOut={() => hideBio(7)} onBlur={() => hideBio(7)} />

              <h3>Yuvraj</h3>

              <p>Content Designer</p>

              <span>
                <a href="https://linkedin.com/in/yuvraj-tonk" aria-label="Link to linkedIn" title="LinkedIn" rel="noopener noreferrer" target="_blank"><FaLinkedin /></a>
                <a href="https://behance.net/yuvrajsingh31" aria-label="Link to behance" title="Behance" rel="noopener noreferrer" target="_blank"><FaBehance /></a>
              </span>

            </div>

            <div className="about__memberTile">

              <img src={Mandeep} alt="Team Member Avatar" onMouseOver={() => showBio('UX/UI Designer with a background in Computer Science. I am working on the technical aspects of design from the user end.', 8)} onFocus={() => showBio('UX/UI Designer with a background in Computer Science. I am working on the technical aspects of design from the user end.', 8)} onMouseOut={() => hideBio(8)} onBlur={() => hideBio(8)} />

              <h3>Mandeep</h3>

              <p>Content Designer</p>

              <span>
                <a href="https://linkedin.com/in/mandeep-kaur09" aria-label="Link to linkedIn" title="LinkedIn" rel="noopener noreferrer" target="_blank"><FaLinkedin /></a>
                <a href="https://behance.net/mandeepkaur09" aria-label="Link to behance" title="Behance" rel="noopener noreferrer" target="_blank"><FaBehance /></a>
              </span>

            </div>

            {/* Logo tile (Where bio shows up) */}
            <div className="about__logo">
              <div className="about__bio" />
            </div>

          </div>

        </div>

      </main>

      <CallToAction />
    </>
  );
};

export default Team;
