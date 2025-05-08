// context/BackgroundContext.tsx
import { createContext, useState, useContext } from "react";
import backgroundImg from "../assets/background3.webp"

const BackgroundContext = createContext<any>(null);

export const BackgroundProvider = ({ children }: any) => {
  const [background, setBackground] = useState({
    type: "image",
    url: backgroundImg
  });

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);
