import React from 'react';

import styles from "./App.module.css"

import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Kins } from './components/Kins/Kins';
import { Projects } from './components/Projects/Projects';
import { Contact} from './components/Contact/Contact';


const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Navbar />
      <Hero />
      <About />
      <Kins />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;
