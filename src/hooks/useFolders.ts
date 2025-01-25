import { useAppSelector } from "@/redux/app/hooks";
import { IFolder } from "@/types/sidebar";

const useFolders = (): IFolder[] | null => {
  const folders = useAppSelector((store) => store.folders.folders);
  return folders;
};

export default useFolders;
