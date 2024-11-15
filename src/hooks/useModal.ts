import { useState } from "react";

type UseModalResult = [boolean, () => void];

const useModal = (): UseModalResult => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return [isOpen, toggle];
};

export default useModal;
