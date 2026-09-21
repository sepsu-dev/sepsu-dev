import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Sepsu Dev for software engineering opportunities, collaborations, and project inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact - Sepsu Dev",
    description:
      "Get in touch with Sepsu Dev for software engineering opportunities, collaborations, and project inquiries.",
    url: "https://sepsu.dev/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Sepsu Dev",
    description:
      "Get in touch with Sepsu Dev for software engineering opportunities, collaborations, and project inquiries.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
