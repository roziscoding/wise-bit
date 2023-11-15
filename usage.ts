import { Flags } from "./mod.ts";

const flagsFromBackend = 3;

const LayoutFlags = {
  USE_NEW_HEADER: 1,
  USE_NEW_FOOTER: 2,
  USE_NEW_SIDEBAR: 4,
};

const flags = new Flags(LayoutFlags, flagsFromBackend);
console.log(flags.isEnabled(LayoutFlags.USE_NEW_HEADER));
