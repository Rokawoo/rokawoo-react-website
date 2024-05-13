import React from "react";

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  return (
    <div className={styles.backgroundColor}>

      <footer id="contact" className={styles.container}>
        <div className={styles.text}>
          <h2>Contact</h2>
          <p>Feel free to reach out~!</p>
        </div>
        <ul className={styles.links}>
          <li className={styles.link}>
            <img 
              src={getImageUrl("contact/emailIcon.png")}
              alt="email-icon" 
              draggable="false"/>
            <a href="mailto:ays36@drexel.edu">myemail@email.com</a>
          </li>
          <li className={styles.link}>
            <img
              src={getImageUrl("contact/linkedinIcon.png")}
              alt="linkedin-icon"
              draggable="false"
            />
            <a href="https://www.linkedin.com/in/augustus-sroka">linkedin.com/Augustus-Sroka</a>
          </li>
          <li className={styles.link}>
            <img 
              src={getImageUrl("contact/githubIcon.png")}
              alt="github-icon"
              draggable="false"
            />
            <a href="https://www.github.com/Rokawoo">github.com/Rokawoo</a>
          </li>
        </ul>
      </footer>
    </div>
  );
};