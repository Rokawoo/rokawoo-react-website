import React from 'react';
import styles from "./App.module.css"
import Background from './Background';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Background />
      <Navbar />
      <Hero />
      <About />
    </div>
  );
};

export default App;
