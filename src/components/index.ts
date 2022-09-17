import { lazy } from "react";

export { default as TextInput } from "./input/TextInput";
export { default as Textarea } from "./input/Textarea";
export const LocationArea = lazy(() => import("./input/LocationArea"));

export { default as ThemeSwaper } from "./input/ThemeSwaper";

// layout
export { default as PageTitle } from "./layout/PageTitle";
