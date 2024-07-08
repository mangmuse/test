import SideBar from "@/app/(scheduler)/_components/SideBar";
import TodoList from "@/app/(scheduler)/_components/TodoList";
import { PropsWithChildren } from "react";

const SchedulerPage = ({ children }: PropsWithChildren) => {
  return (
    <>
      <SideBar />
      <div className="flex">
        {children}
        <TodoList />
      </div>
    </>
  );
};

export default SchedulerPage;
