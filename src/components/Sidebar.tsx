import WorkspaceSwitcher from "@/features/workspaces/components/workspace-switcher";
import DottedSeparator from "./dotted-separator";
import Navigation from "@/components/Navigation";
import Projects from "@/components/projects";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="h-full lg:rounded-2xl lg:m-4 bg-neutral-100 p-4">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={164} height={48} />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};

export default Sidebar;
