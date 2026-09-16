import type { Metadata } from "next";
import AboutCanvas from "@/components/AboutCanvas";

export const metadata: Metadata = {
  title: "About - Oscar Bergman",
  description:
    "Based in Stockholm, usually working with one or two teams at a time, always with a notebook nearby even though everything ends up in Figma eventually.",
};

export default function AboutPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <AboutCanvas />
    </main>
  );
}
