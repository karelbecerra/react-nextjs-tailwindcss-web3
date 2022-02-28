import React, { userContext, useState, useMemo, useEffect } from 'react';

const useConnected = () => {
  const [isConnected, setIsConnected] = useState(null);
  return [isConnected, setIsConnected];
};

export default useConnected;
