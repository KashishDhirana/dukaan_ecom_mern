import { Link } from "@tanstack/react-router";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";

export function ProductsBentoGrid() {
	const grepedProducts: Record<string, string> = import.meta.glob(
		"../../assets/products/*.jpg",
		{
			eager: true,
			query: "?url",
			import: "default",
		},
	);
	// console.table(grepedProducts);

	const products = (Object.values(grepedProducts) as string[])
		.filter(Boolean)
		.sort()
		.map((val) => {
			const fileName = val.split("/").pop() ?? "";
			const baseName = fileName.split(".")[0] ?? "";
			return {
				val,
				title: `This is the title of ${baseName || " anything"}`,
			};
		});

	const slicedProducts: { val: string; title: string }[][] = [];
	for (let i = 1; i < products.length; i += 4) {
		slicedProducts.push([...products.slice(i, i + 4)]);
	}

	// console.log(products);

	// console.log(slicedProducts);

	return (
		<section className="bg-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 [&>div>div]:py-4 has-[&>div]:[&>div]:grid has-[&>div]:[&>div]:gap-4 [&>div]:grid-cols-2">
			<Card className="px-6 rounded-none shadow-none">
				<h2 className="col-span-2 text-xl font-bold">{products[0]?.title}</h2>
				<Link to="/product/sandals/1234" className="col-span-2">
					<img
						src={products[0]?.val}
						alt="Sandals"
						className="col-span-2 h-full object-cover"
					/>
				</Link>
				<Button variant={"link"} className="w-fit p-0 text-blue-500" asChild>
					<Link to="/product/sandals">Click Now</Link>
				</Button>
			</Card>
			{products.length !== 0 ? (
				slicedProducts.map((product, indx) => (
					<Card className="shadow-none rounded-none px-6" key={indx}>
						{product.map((prod) => (
							<div key={prod.val}>
								<img src={prod.val} alt="" />
								<span className="w-full">{prod.title}</span>
							</div>
						))}
					</Card>
				))
			) : (
				<h3>There's nothing to show at the moment</h3>
			)}
		</section>
	);
}
