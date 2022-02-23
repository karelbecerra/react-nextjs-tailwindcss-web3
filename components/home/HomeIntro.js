import React, { useState } from 'react';

const HomeIntro = ({}) => {

  const [connected, setConnected] = useState(false);

  const handleConnect = e => {
    e.preventDefault();
    setConnected(!connected)
  };

  return (
    <>
        <div className='w-full lg:w-1/2'>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-gray-900 ">
              <span className="block xl:inline">React Nextjs</span>{' '}
              <span className="block text-blue-500 xl:inline text-gradient ">starter kit</span>
            </h1>
            <p className="mt-3 md:mt-5 text-base md:text-lg lg:text-xl text-gray-500 sm:max-w-xl mx-auto lg:mx-0">
              This sample includes: React Nextjs Tailwindcss Mongodb
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a 
                  href="#" 
                  className="primary-btn"
                  onClick={handleConnect}>
                  { connected ? 'Disconnect' : 'Connect' }
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block lg:w-1/2 bg-gradient-to-t'>
        { connected ? 'Disconnect' : 
          <img className=''
            src='/assets/img/home-intro.png'>
          </img>
        }
        
        </div>
    </>
  );
}

export default HomeIntro;
