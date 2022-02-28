import React, { useState, useContext, useEffect } from 'react';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

import { useConnected } from '../../hooks/useConnected';
import { Account } from '../Account';

import { apiGetAccountAssets } from "../../utils/crypto/api";
 
const INITIAL_STATE = {
  connector: null,
  fetching: false,
  connected: false,
  chainId: 1,
  showModal: false,
  pendingRequest: false,
  uri: "",
  accounts: [],
  address: "",
  result: null,
  assets: [],
};

const HomeIntro = ({}) => {

  const [isConnected, setIsConnected] = useConnected();
  //const [isConnectedC, setIsConnectedC] = useContext(StatusContext);
  //const [connector, setConnector] = useState(null);
  const [blockchain, setBlockchain] = useState(INITIAL_STATE);
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    setIsConnected(isConnected);
  }, [isConnected]);

  const handleConnect = e => {
    e.preventDefault();
    isConnected? killSession(): _connect(true);
    setIsConnected(!isConnected);
    //setIsConnectedC(!isConnectedC)
  };

  const _connect = async (refresh) => {
    // bridge url
    const bridge = "https://bridge.walletconnect.org";
    // const refresh1 : boolean = false;

    // create new connector
    const connector = new WalletConnect({ bridge, qrcodeModal: QRCodeModal });
    console.log('conn '+connector)

    setState({...state, connector});

    // check if already connected
    console.log('connector.connected='+connector.connected)
    console.log('refresh='+refresh)
    if (refresh && !connector.connected) {
      // create new session
      await connector.createSession();
    }

    // subscribe to events
    await subscribeToEvents(connector);
  };

  const subscribeToEvents = async (connector) => {
    //console.log('state='+state)
    //const connector  = state.connector;
    console.log('subscribeToEvents connector.connected='+connector.connected)

    if (!connector) {
      return;
    }

    connector.on("session_update", async (error, payload) => {
      console.log(`connector.on("session_update")`);

      if (error) {
        throw error;
      }

      const { chainId, accounts } = payload.params[0];
      onSessionUpdate(accounts, chainId);
    });

    connector.on("connect", (error, payload) => {
      console.log(`connector.on("connect")`);

      if (error) {
        throw error;
      }

      onConnect(payload);
    });

    connector.on("disconnect", (error, payload) => {
      console.log(`connector.on("disconnect")`);

      if (error) {
        throw error;
      }

      onDisconnect();
    });

    if (connector.connected) {
      const { chainId, accounts } = connector;
      const address = accounts[0];
      setState({
        connected: true,
        chainId,
        accounts,
        address,
      });
      onSessionUpdate(accounts, chainId);
    }

    setState({ ...state, connector });
  };

  const killSession = async () => {
    console.log('kill session')
    const connector = state.connector;
    console.log('kill session='+connector)
    if (connector) {
      connector.killSession();
    }
    resetApp();
  };

  const resetApp = async () => {
    setState({ ...INITIAL_STATE });
  };

  const onConnect = async (payload) => {
    const { chainId, accounts } = payload.params[0];
    const address = accounts[0];
    setState({ ...state,
      connected: true,
      chainId,
      accounts,
      address,
    });
    getAccountAssets();
  };

  const onDisconnect = async () => {
    resetApp();
  };

  const onSessionUpdate = async (accounts, chainId) => {
    const address = accounts[0];
    setState( { ...state, chainId, accounts, address} );
    await getAccountAssets(address, chainId);
  };

  const getAccountAssets = async (address,chainId) => {
    
    setState({ ...state, fetching: true });
    try {
      // get account balances
      const assets = await apiGetAccountAssets(address, chainId);

      setState({ ...state, fetching: false, address, assets });
    } catch (error) {
      console.error(error);
      setState({ ...state, fetching: false });
    }
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
                  { isConnected ? 'Disconnect' : 'Connect' }
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block lg:w-1/2 bg-gradient-to-t'>
        { isConnected ? <Account state={state}/> : 
          <img className=''
            src='/assets/img/home-intro.png'>
          </img>
        }
        
        </div>
    </>
  );
}

export default HomeIntro;
