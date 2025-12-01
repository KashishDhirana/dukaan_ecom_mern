import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { CarouselPlugin } from "./-components/CarouselPlugin";
import { CrouselList } from "./-components/CraouselList";
import { ProductsBentoGrid } from "./-components/ProductsBentoGrid";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <ClientOnly
        fallback={<strong className="text-2xl">Loading the carousel</strong>}
      >
        <CarouselPlugin />
      </ClientOnly>
      <ProductsBentoGrid />
      <ClientOnly
        fallback={<strong className="text-2xl">Loading the carousel</strong>}
      >
        <CrouselList />
      </ClientOnly>
    </>
  );
}
