// context/BackgroundContext.tsx
import { createContext, useState, useContext } from "react";

const BackgroundContext = createContext<any>(null);

export const BackgroundProvider = ({ children }: any) => {
  const [background, setBackground] = useState({
    type: "image",
    url: "src/assets/background3.webp"
  });

  return (
    <BackgroundContext.Provider value={{ background, setBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => useContext(BackgroundContext);
