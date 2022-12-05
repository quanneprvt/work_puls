import React, { FC, useState, createContext } from 'react';

export interface PopupProps {
  open: boolean;
  name: string;
  onConfirm: (params?: unknown) => void;
  onCancel: (params?: unknown) => void;
  props?: unknown;
}

type PopupContext = {
  openPopup: (
    name: string,
    props?: unknown,
    onConfirm?: (params?: unknown) => void,
    onCancel?: (params?: unknown) => void
  ) => void;
  closePopup: (name: string) => void;
  closeAllPopup: () => void;
  openedPopup: PopupProps[];
};

export const PopupContext = createContext<PopupContext>({} as PopupContext);

export const PopupProvider: FC = ({ children }) => {
  const [openedPopup, setOpenedPopup] = useState<PopupProps[]>([]);

  const openPopup = (
    name: string,
    props: unknown,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => {
    const isExist = Boolean(openedPopup.find((popup) => popup.name === name));
    if (!isExist)
      setOpenedPopup((cur) => [
        ...cur,
        {
          name,
          props,
          open: true,
          onConfirm,
          onCancel
        }
      ]);
    else {
      setOpenedPopup((cur) => {
        const index = cur.findIndex((pop) => pop.name === name);
        const result = [...cur];
        result[index] = { ...result[index], open: true, props };
        return result;
      });
    }
  };

  const closePopup = (name: string) => {
    const index = openedPopup.findIndex((pop) => pop.name === name);
    if (index >= 0)
      setOpenedPopup((cur) => {
        const result = [...cur];
        result[index] = { ...result[index], open: false };
        return result;
      });
  };

  const closeAllPopup = () => {
    setOpenedPopup([]);
  };

  return (
    <PopupContext.Provider
      value={{ openPopup, closePopup, closeAllPopup, openedPopup }}
    >
      {children}
    </PopupContext.Provider>
  );
};
