import { useSettings } from "../hooks/useSettings";
import PomodorMenu from "./PomodorMenu";
import SettingsHeading from "./SettingsHeading";
import VolumeSlider from "./VolumeSlider";

const heading = ["Pomodoro", "todo list", "spotify", "inspiration"];

export default function Settings({
  toggle,
  handleToggle,
}: {
  toggle: boolean;
  handleToggle: () => void;
}) {
  const { activeImage, updateImage, backgroundImages } = useSettings();
  return (
    // Backdrop
    <div
      className={`fixed top-0 right-0 left-0 bottom-0 z-50 ${
        toggle ? "scale-100" : "scale-0"
      } flex items-center justify-center bg-black/40 transition-transform duration-150 ease-in-out`}
    >
      {/* MODAL */}
      <div
        className={` w-[360px] ${
          toggle ? "translate-y-0 opacity-100" : "-translate-y-40 opacity-0"
        } rounded transition-all delay-150 duration-150 ease-in-out`}
      >
        {/* MODAL HEADING */}
        <div className="flex justify-between rounded-t bg-rose-500">
          <p className="p-2">Settings</p>
          <button
            aria-label="close settings modal"
            className="p-2"
            onClick={handleToggle}
          >
            X
          </button>
        </div>
        {/* MENU - fixed height 500px ? */}
        <div className="rounded-b border border-rose-500 bg-gray-900/50 bg-opacity-60 bg-clip-padding p-2 backdrop-blur-sm backdrop-filter">
          <SettingsHeading title="Background" />
          <ul className="flex items-center justify-start gap-2 py-2">
            {backgroundImages.map((image) => (
              <li key={image.image}>
                <button
                  aria-label="select background image"
                  onClick={() => updateImage(image.image)}
                >
                  <img
                    height="64px"
                    width="64px"
                    className={`transition-transform duration-150 ease-in-out hover:scale-105 ${
                      activeImage === image.image
                        ? "border-2 border-rose-500"
                        : ""
                    }`}
                    alt={image.title}
                    src={image.image}
                  />
                </button>
              </li>
            ))}
          </ul>
          {/* MENU HEADING */}
          <SettingsHeading title="Pomodoro" />
          {/* MENU BODY */}
          <PomodorMenu />
          <VolumeSlider />
        </div>
      </div>
    </div>
  );
}
