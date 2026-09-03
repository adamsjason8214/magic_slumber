import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a SlumberPod Rental | Magical Slumber Orlando",
  description: "Choose your dates and rent a SlumberPod, toddler mattress, fan, sound machine, or baby monitor delivered to your Orlando area resort.",
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
