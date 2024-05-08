import React from 'react';
import styles from "./App.module.css"
import Background from './Background';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
      <Background />

    </div>
  );
};

export default App;
