import { PropsWithChildren } from "react";
import QueryProvider from "./QueryProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
