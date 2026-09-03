import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upgrade Your Rental | Magical Slumber Orlando",
  robots: { index: false, follow: false },
};

export default function UpgradeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
