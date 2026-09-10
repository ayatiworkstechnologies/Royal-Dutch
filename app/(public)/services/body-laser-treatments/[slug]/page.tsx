import ServiceDetail from "@/components/services/ServiceDetail";

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ServiceDetail categorySlug="body-laser-treatments" slug={slug} />;
}
