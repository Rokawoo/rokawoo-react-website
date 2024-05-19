import React from "react";

import styles from "./Contact.module.css";

import { getAssetUrl } from "../../utils";


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
              src={getAssetUrl("contact/emailIcon.webp")}
              alt="email-icon" 
              draggable="false"/>
            <a href="mailto:ays36@drexel.edu">myemail@email.com</a>
          </li>
          <li className={styles.link}>
            <img
              src={getAssetUrl("contact/linkedinIcon.webp")}
              alt="linkedin-icon"
              draggable="false"
            />
            <a href="https://www.linkedin.com/in/augustus-sroka">linkedin.com/Augustus-Sroka</a>
          </li>
          <li className={styles.link}>
            <img 
              src={getAssetUrl("contact/githubIcon.webp")}
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