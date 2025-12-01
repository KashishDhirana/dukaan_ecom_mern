import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProductsBentoGrid() {
  const grepedProducts: Record<string, string> = import.meta.glob(
    "../../assets/products/*.jpg",
    {
      eager: true,
      query: "?url",
      import: "default",
    },
  );
  console.table(grepedProducts);

  const products = Object.values(grepedProducts).sort();

  console.log(products);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 [&>div>div]:py-4 has-[&>div]:[&>div]:grid [&>div]:grid-cols-2 **:outline">
      <Card>
        <h2 className="col-span-2 h-fit text-xl font-bold">
          This is title related to this image
        </h2>
        <Link to="/product/sandals/1234" className="col-span-2">
          {/*<img src={img1} alt="Sandals" className="col-span-2" />*/}
        </Link>
        <Button variant={"link"} className="w-fit p-0 text-blue-500" asChild>
          <Link to="/product/sandals">Click Now</Link>
        </Button>
      </Card>
      <Card>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Card>
      <Card>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Card>
      <Card>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Card>
      <Card>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Card>
      <Card>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Card>
      <Card>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Card>
      <Card>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Card>
    </section>
  );
}
