import React from "react";

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img 
            src={getImageUrl("contact/emailIcon.png")}
            alt="email-icon" 
            draggable="false"/>
          <a href="mailto:myemail@email.com">myemail@email.com</a>
        </li>
        <li className={styles.link}>
          <img
            src={getImageUrl("contact/linkedinIcon.png")}
            alt="linkedin-icon"
            draggable="false"
          />
          <a href="https://www.linkedin.com/myname">linkedin.com/myname</a>
        </li>
        <li className={styles.link}>
          <img 
            src={getImageUrl("contact/githubIcon.png")}
            alt="github-icon"
            draggable="false"
          />
          <a href="https://www.github.com/myname">github.com/myname</a>
        </li>
      </ul>
    </footer>
  );
};