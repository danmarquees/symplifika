import create from "zustand";
import { authSlice } from "./slices/authSlice";
import { shortcutsSlice } from "./slices/shortcutsSlice";

const useStore = create((set, get) => ({
  ...authSlice(set, get),
  ...shortcutsSlice(set, get),
}));

export default useStore;
