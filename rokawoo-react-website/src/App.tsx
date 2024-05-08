import React from 'react';
import styles from "./App.module.css"
import Background from './Background';
import { Navbar } from './components/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Background />
      <Navbar />
    </div>
  );
};

export default App;
