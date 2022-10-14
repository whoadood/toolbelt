import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type BackgroundImages = {
  title: string;
  image: string;
};

const SettingsContext = createContext<
  | {
      activeImage: string;
      updateImage: (image: string) => void;
      backgroundImages: BackgroundImages[];
    }
  | undefined
>(undefined);

const backgroundImages = [
  { title: "Computer Guy", image: "/computerguy.gif" },
  { title: "Cyber Punk", image: "/cyberpunk.gif" },
  { title: "Lofi Girl", image: "/lofigirl.gif" },
  { title: "Lofi Girl 2", image: "/lofigirl2.gif" },
  { title: "Lofi Girl 3", image: "/lofigirl3.gif" },
];

const storage = localStorage.getItem("bg-image");

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeImage, setActiveImage] = useState(
    storage ? storage : backgroundImages[1].image
  );
  const updateImage = useCallback((image: string) => {
    setActiveImage(image);
    localStorage.setItem("bg-image", image);
  }, []);

  const data = {
    activeImage,
    updateImage,
    backgroundImages,
  };
  return (
    <SettingsContext.Provider value={data}>{children}</SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings can only be used inside SettingsProvider");
  }
  return context;
};

export { useSettings, SettingsProvider };
