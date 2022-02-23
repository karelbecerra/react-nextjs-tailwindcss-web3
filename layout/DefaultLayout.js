import React from 'react';
import PropTypes from 'prop-types';


import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const DefaultLayout = ({children}) => (
    <div className="bg-white">
      <Header />
      <div className="">
        {children}
      </div>
      <Footer/>
    </div>
)

DefaultLayout.propTypes = {
  children: PropTypes.node
};

export default DefaultLayout;
