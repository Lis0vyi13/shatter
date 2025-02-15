import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/redux/app/store";
import { userActions } from "@/redux/features/user";
import { chatActions } from "@/redux/features/chat";
import { foldersActions } from "@/redux/features/folders";
import { searchActions } from "@/redux/features/search";

const rootActions = {
  ...userActions,
  ...chatActions,
  ...foldersActions,
  ...searchActions,
};

const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export default useActions;
