import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaymentForm from './components/PaymentForm';
import StripeContainer from './components/StripeContainer';
import ThankYou from './pages/ThankYou';

const Component = () => <div>1</div>

function App() {
  return (
    <BrowserRouter>
      <Routes path="/">
        <Route path="/payment-form" element={<StripeContainer />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  )
  // return (
  //   <StripeContainer>
  //     <PaymentForm />
  //   </StripeContainer>
  // );
}

export default App;
