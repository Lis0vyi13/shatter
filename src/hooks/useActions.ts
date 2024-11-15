import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { AppDispatch } from "@/redux/app/store";
import { userActions } from "@/redux/features/user";
import { chatActions } from "@/redux/features/chat";
import { foldersActions } from "@/redux/features/folders";

const rootActions = {
  ...userActions,
  ...chatActions,
  ...foldersActions,
};

const useActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

export default useActions;
