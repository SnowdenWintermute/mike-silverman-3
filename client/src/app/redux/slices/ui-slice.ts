"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vector } from "matter-js";
export enum Theme {
  DEFAULT = "",
  VT320 = "VT320",
  HTML = "HTML",
  VIRGINIA_BLUEBELL = "Virginia Bluebell",
}

export interface IUISlice {
  showContextMenu: boolean;
  theme: Theme;
  tooltip: {
    contents: string | JSX.Element[];
    position: Vector;
  } | null;
}
const initialState: IUISlice = {
  showContextMenu: false,
  theme: Theme.DEFAULT,
  tooltip: null,
};

const UISlice = createSlice({
  name: "UISlice",
  initialState,
  reducers: {
    setTooltipContents(state, action: PayloadAction<null | { contents: string | JSX.Element[]; position: Vector }>) {
      state.tooltip = action.payload;
    },
  },
});

export const { setTooltipContents } = UISlice.actions;
export default UISlice.reducer;
