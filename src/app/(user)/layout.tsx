import SidebarWrapper from "@/components/pages/my-account/shared/Sidebar/SidebarWrapper";
import MainContentWrapper from "@/components/pages/my-account/MainContentWrapper";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="bg-base-300 fixed top-0 left-0 right-0 h-5 md:h-20 z-40" />
      <SidebarWrapper />
      <MainContentWrapper>{children}</MainContentWrapper>
      <div className="bg-base-300 fixed bottom-0 left-0 top-0 hidden md:block w-24 z-40" />
    </div>
  );
}
