import React, { useEffect } from 'react';

import styles from "./App.module.css"

import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Showcase } from './components/Showcase/Showcase';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';


const App: React.FC = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    }
  }, []);

  return (
    <div className={styles.App}>
      <Navbar />
      <Hero />
      <About />
      <Showcase />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;