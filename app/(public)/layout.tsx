import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { BookingModalProvider } from "@/context/BookingModalContext";
import { BookingModal } from "@/components/ui/BookingModal";
import AiHelpButton from "@/components/ui/AiHelpButton";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BookingModalProvider>
      <Header />
      {children}
      <FloatingButtons />
      <AiHelpButton />
      <Footer />
      <BookingModal />
    </BookingModalProvider>
  );
}
