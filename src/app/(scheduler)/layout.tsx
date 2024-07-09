import Button from "@/components/Button/Button";
import { PropsWithChildren } from "react";
import SideBar from "./_components/SideBar/SideBar";

const SchedulerLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex flex-grow">
        <div className="relative h-full w-full flex flex-col bg-slate-300">
          <Button className="absolute top-4 right-4">일정 추가하기</Button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SchedulerLayout;
