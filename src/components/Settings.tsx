import PomodorMenu from "./PomodorMenu";

const heading = ["Pomodoro", "todo list", "spotify", "inspiration"];

export default function Settings({
  toggle,
  handleToggle,
}: {
  toggle: boolean;
  handleToggle: () => void;
}) {
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
        <div className="flex justify-between rounded-t bg-amber-500">
          <p className="p-2">Settings</p>
          <button className="p-2" onClick={handleToggle}>
            X
          </button>
        </div>
        {/* MENU */}
        <div className="h-[500px] rounded-b border border-amber-500 bg-gray-900/50 bg-opacity-60 bg-clip-padding p-2 backdrop-blur-sm backdrop-filter">
          {/* MENU HEADING */}
          <h2 className="flex items-center justify-around gap-2 border-b border-gray-400/50 ">
            {heading.map((h) => (
              <button className="text-gray-200/50 transition-colors duration-150 ease-in-out hover:text-white">
                {h}
              </button>
            ))}
          </h2>
          {/* MENU BODY */}
          <div>
            <PomodorMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
