import { createFileRoute } from "@tanstack/react-router";
import { CarouselList, CarouselPlugin, ProductsBentoGrid } from "./-components";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <>
      <CarouselPlugin />
      <ProductsBentoGrid />
      <CarouselList />
    </>
  );
}
