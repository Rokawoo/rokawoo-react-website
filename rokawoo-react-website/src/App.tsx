import React from 'react';
import styles from "./App.module.css"
import Background from './Background';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Background />
      <Navbar />
      <Hero />
    </div>
  );
};

export default App;
