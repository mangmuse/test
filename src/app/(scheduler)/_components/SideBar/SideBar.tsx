import Link from "next/link";

const SideBar = () => {
  return (
    <aside className="bg-white border-slate-400">
      <div className="min-h-full px-12 py-6">
        사이드바입니다
        <ul>
          <span className="block text-xs font-semibold py-2">TODO</span>
          <li>
            <Link href="/todos/today">TODAY</Link>
          </li>
          <li>
            <Link href="/todos/important">IMPORTANT</Link>
          </li>

          <span className="block text-xs font-semibold py-2">CALENDAR</span>
          <li>
            <Link href="/calendar/my">내 일정보기</Link>
          </li>
          <li>
            <Link href="/calendar/shared">공유 일정보기</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
