import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import NotificationForm from '../components/NotificationForm';
import SubmitPayment from '../components/SubmitPayment';

const Routes = () => (
  <Router>
    <div className='ms-Grid'>
      <Header />
      <Route exact={true} path="/" component={NotificationForm} />
      <Route path="/submitPayment/:instanceId" component={SubmitPayment} />
      <Footer />
    </div>
  </Router>
)

export default Routes;