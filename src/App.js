import Popup, { useClosePopup } from "./components/popup/Popup.tsx";

function App() {
  const closePopup = useClosePopup();
  const handleClose = () => {
    closePopup();
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative">
        <Popup>
          <Popup.Button className="font-medium px-3 py-1.5 rounded-md bg-slate-600 text-white ">
            Click me
          </Popup.Button>
          <Popup.Body>
            <ul className="w-fit whitespace-nowrap  h-fit rounded-md bg-zinc-100 border absolute top-full left-full">
              <Popup.TriggerClose>
                <li className="text-center py-1 border-b border font-sans cursor-pointer hover:bg-zinc-200 px-10">
                  Item 1
                </li>
              </Popup.TriggerClose>
              <Popup.TriggerClose>
                <li className="text-center py-1 border-b border font-sans cursor-pointer hover:bg-zinc-200">
                  Item 2
                </li>
              </Popup.TriggerClose>
              <Popup.TriggerClose>
                <li className="text-center py-1 border-b border font-sans cursor-pointer hover:bg-zinc-200">
                  Item 3
                </li>
              </Popup.TriggerClose>
              <li
                className="text-center py-1 border-b border font-sans cursor-pointer hover:bg-zinc-200"
                onClick={handleClose}
              >
                Close by Click
              </li>
            </ul>
          </Popup.Body>
        </Popup>
      </div>
    </div>
  );
}

export default App;
