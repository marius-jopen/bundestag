import React from 'react';
import BundestagForm from './components/form';
import BundestagLooper from './components/looper';

function App() {
  return (
    <div className="App px-4 pt-4">
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <BundestagForm />
        <BundestagLooper />
      </div>
    </div>
  );
}

export default App;