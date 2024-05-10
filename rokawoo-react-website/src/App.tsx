import React from 'react';
import styles from "./App.module.css"
import Background from './components/Background/Background';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Contact} from './components/Contact/Contact'

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      {/* <Background /> */}
      <Navbar />
      <Background />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;