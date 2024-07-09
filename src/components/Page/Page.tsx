import { PropsWithChildren } from "react";

interface PageProps {
  title: string;
  isTitleHidden?: boolean;
}

const Page = ({
  children,
  title,
  isTitleHidden = false,
}: PropsWithChildren<PageProps>) => {
  return (
    <main className="container max-w-[1024px] mx-auto px-6 py-20">
      <h1 className={"font-semibold" + (isTitleHidden ? " hidden" : "")}>
        {title}
      </h1>
      {children}
    </main>
  );
};

export default Page;
