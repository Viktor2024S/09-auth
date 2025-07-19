import { Riple } from "react-loading-indicators";
import css from "./Loader.module.css";

export const Loader = () => (
  <div className={css.loader}>
    <Riple color="#325bcdff" size="medium" text="" textColor="" />
  </div>
);
