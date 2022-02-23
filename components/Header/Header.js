import React, { useState } from 'react';
import Link from 'next/link';

import { Logo } from '../Logo';

const Navbar = () => {

  const [connected, setConnected] = useState(false);

  const handleConnect = e => {
    e.preventDefault();
    setConnected(!connected)
  };

  return (
    <header className="top-0 sticky z-40 lg:z-50 w-full backdrop-blur flex-none border-b border-slate-900/10 bg-white/80 supports-backdrop-blur:bg-white/60">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 xl:px-24">
        <div className="flex">
          <Link href="/" passHref>
            <Logo size="w-10 h-10" />
          </Link>
        </div>
        <div className="flex space-x-2">
          <div className="rounded-md shadow">
            <a href="#" className="primary-btn h-10"
                  onClick={handleConnect}>
                  { connected ? 'Logout' : 'Connect' }
            </a>
          </div>
        </div>     
      </div>
    </header>
  );
}

export default Navbar;
