import { getMe } from "@/actions/auth.action";
import AdminPannelMap from "@/components/pages/admin/AdminPannelMap";
import { IUser } from "@/interfaces/interfaces";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "سبزلرن | SabzLearn",
  description: "Generated by create next app",
  icons: {
    icon: "/logo/fav.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies()
  const token = cookiesStore.get("sabz-token")?.value
  const user = (await getMe(token as string)).user
  return (
    <div className="max-w-4xl p-6 mx-auto">
      <h2 className="font-bold  text-3xl">{user?.username} عزیز؛ خوش اومدی 🙌</h2>
      <AdminPannelMap/>
      {children}
    </div>
  );
}
