import { PropsWithChildren } from "react";

const SchedulerLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full justify-center items-center ">
      <main className="h-full w-full flex bg-slate-300">{children}</main>
    </div>
  );
};

export default SchedulerLayout;
