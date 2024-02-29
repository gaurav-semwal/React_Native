import React from 'react';
import NetInfo from '@react-native-community/netinfo';

export const NetworkStatusContext = React.createContext(null);

export const NetworkStatusProvider = NetworkStatusContext.Provider;

export const NetworkStatusConsumer = NetworkStatusContext.Consumer;

export default NetInfo;