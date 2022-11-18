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
  {
    title: "Computer Guy",
    image:
      "https://user-images.githubusercontent.com/82413454/202794052-4dfa8c8d-6a8d-4c31-8568-78f8b070f4d6.gif",
  },
  {
    title: "Cyber Punk",
    image:
      "https://user-images.githubusercontent.com/82413454/202794060-a385a229-bded-4f9f-a736-e0281b722bed.gif",
  },
  {
    title: "Lofi Girl",
    image:
      "https://user-images.githubusercontent.com/82413454/202794068-9c460c4b-3190-4cd3-b835-94734b97a009.gif",
  },
];

const storage = localStorage.getItem("bg-image");

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeImage, setActiveImage] = useState(
    storage ? storage : backgroundImages[0].image
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
