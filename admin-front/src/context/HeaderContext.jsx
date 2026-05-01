import { createContext, useContext, useEffect, useState } from "react";

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [headerData, setHeaderData] = useState({
    title: "Dashboard",
    subtitle: "System Overview",
    action: null,
  });

  useEffect(() => { 
    if (!document.title.includes("Login")) {
      document.title = `${headerData.title} | MiniTech Admin`;
    }
  }, [headerData.title]);

  const setHeader = (title, subtitle, action = null) => {
    setHeaderData({ title, subtitle, action });
  };

  return (
    <HeaderContext.Provider value={{ ...headerData, setHeader }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeader = () => useContext(HeaderContext);