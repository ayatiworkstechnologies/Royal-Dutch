import Image from "next/image";

export default function ServiceBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/images/services-banner.png"
        alt="Dermatology and Aesthetic Services"
        width={1920}
        height={800}
        priority
        className="h-auto w-full object-cover"
      />
    </section>
  );
}