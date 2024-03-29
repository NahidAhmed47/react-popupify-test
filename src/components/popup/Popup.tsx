/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type TPopupProps = {
  children: ReactNode;
};

type TPopupButtonProps = {
  children: ReactNode | string;
  onClick?: (e?: HTMLButtonElement) => void;
  [x: string]: any;
};

type TPopupBody = {
  children: ReactNode;
};

type TContextValues = {
  popupRef: React.RefObject<HTMLDivElement>;
  popupButtonRef: React.RefObject<HTMLButtonElement>;
  isPopupOpen: boolean;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type TTriggerCloseProps = {
  children: ReactNode;
};

// create context
const PopupContext = createContext<TContextValues | null>(null);

const Popup = ({ children }: TPopupProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // === REF ===
  const popupRef = useRef<HTMLDivElement>(null);
  const popupButtonRef = useRef<HTMLButtonElement>(null);

  // === HANDLING OUTSIDE CLOSE ===
  const handleOutsideClose = useCallback(
    (e: any) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        popupButtonRef.current &&
        !popupButtonRef.current.contains(e.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    },
    [setIsPopupOpen]
  );

  // Attach event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClose);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClose);
    };
  }, [handleOutsideClose]);
  const contextValue = {
    popupRef,
    popupButtonRef,
    isPopupOpen,
    setIsPopupOpen,
  };
  return (
    <PopupContext.Provider value={contextValue}>
      <div className="" onClick={handleOutsideClose}>
        {children}
      </div>
    </PopupContext.Provider>
  );
};

// make popup button component
const PopupButton = ({
  children,
  onClick: customOnClick,
  ...args
}: TPopupButtonProps) => {
  const { popupButtonRef, setIsPopupOpen } = usePopupContext();
  return (
    <button
      {...args}
      ref={popupButtonRef}
      onClick={(e: any) => {
        e.stopPropagation();
        setIsPopupOpen((prev: boolean) => !prev),
          customOnClick && customOnClick(e);
      }}
    >
      {children}
    </button>
  );
};

Popup.Button = PopupButton;

// make popup body component
const PopupBody = ({ children }: TPopupBody) => {
  const { popupRef, isPopupOpen } = usePopupContext();
  return (
    <>
      {isPopupOpen && (
        <div className="" ref={popupRef}>
          {children}
        </div>
      )}
    </>
  );
};

Popup.Body = PopupBody;

// make a wrapper for close popup when click an item
const TriggerClose = ({ children }: TTriggerCloseProps) => {
  const { setIsPopupOpen } = usePopupContext();
  return (
    <div id="trigger-close" onClick={() => setIsPopupOpen(false)}>
      {children}
    </div>
  );
};

Popup.TriggerClose = TriggerClose;

export const useClosePopup = () => {
  return () => document.getElementById("trigger-close")?.click();
};

const usePopupContext = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopupContext must be used within a PopupProvider");
  }
  return context;
};

export default Popup;
