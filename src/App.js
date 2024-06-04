import './App.css';
import { useState } from 'react';
import Contact from './component/Contact/Contact';
import Billing from './component/Billing/Billing';
import Product from './component/Product/Product';
import Submit from './component/Submit/submit';


function App() {
  const [showModal, setShowModal] = useState(false);
  
  function handleModal(){
    setShowModal(true);
  }

  function handleSubmit(){
    setShowModal(false)
    window.location.reload()
  }

  return (
    <div className='main'>
      <h1>Booking Cart</h1>
      <Contact/>
      <Billing/>
      <Product/>
      <button id='submit-btn' onClick={handleModal}>Generate Quote</button>
      {showModal && <Submit handleSubmit={handleSubmit}/>}
    </div>
    
  );
}

export default App;
