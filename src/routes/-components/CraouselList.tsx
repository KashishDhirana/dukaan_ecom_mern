import { Card, CardContent } from "@/shared/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/components/ui/carousel";

export function CarouselList() {
	return (
		<section className="p-4">
			<Carousel>
				<CarouselContent>
					{Array.from({ length: 10 }).map((_, index) => (
						<CarouselItem
							// biome-ignore lint/suspicious/noArrayIndexKey: This is going to change after attaching backend
							key={index}
							className="sm:basis-1/2 md:basis-1/4 lg:basis-1/7"
						>
							<Card className="shadow-none rounded-none">
								<CardContent className="flex items-center justify-center p-6">
									<span className="text-2xl font-semibold">{index + 1}</span>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute top-1/2 left-4" />
				<CarouselNext className="absolute top-1/2 right-4" />
			</Carousel>
		</section>
	);
}
