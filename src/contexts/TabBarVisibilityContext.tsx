/**
 * TabBarVisibilityContext
 * Context to manage tab bar visibility across the app
 * This is a more reliable approach than using tabBarStyle options
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabBarVisibilityContextType {
  isVisible: boolean;
  hide: () => void;
  show: () => void;
}

const TabBarVisibilityContext = createContext<TabBarVisibilityContextType | undefined>(undefined);

export const TabBarVisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  const hide = () => setIsVisible(false);
  const show = () => setIsVisible(true);

  return (
    <TabBarVisibilityContext.Provider value={{ isVisible, hide, show }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
};

export const useTabBarVisibility = () => {
  const context = useContext(TabBarVisibilityContext);
  if (!context) {
    throw new Error('useTabBarVisibility must be used within TabBarVisibilityProvider');
  }
  return context;
};

