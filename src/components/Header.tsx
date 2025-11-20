import { Link } from "@tanstack/react-router";
import { CircleUser, Menu, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import logo from "@/logo.svg";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	// const [groupedExpanded, setGroupedExpanded] = useState<
	//   Record<string, boolean>
	// >({});

	return (
		<>
			{isOpen && (
				<aside className="absolute flex flex-col items-center z-10 size-full bg-black">
					<div className="flex justify-end w-full">
						<X
							onClick={() => setIsOpen(false)}
							className="text-zinc-200 m-4 cursor-pointer "
						/>
					</div>
					<div className="flex flex-col justify-center gap-y-2 items-center h-full w-[90%] max-w-2xl ">
						<Label htmlFor="aside-search" className="text-zinc-200 self-start">
							Search:{" "}
						</Label>
						{/*TODO: Debounce the search with and from backend */}
						<Input
							id="aside-search"
							className="bg-zinc-200"
							placeholder="Search..."
						/>
					</div>
				</aside>
			)}
			<header className="p-4 bg-gray-700">
				<nav className="flex justify-center relative md:grid md:grid-cols-[auto_60%] wrap md:justify-between">
					{/*Aside Menu*/}
					<Menu
						className="absolute left-0 text-zinc-200 md:hidden h-full cursor-pointer"
						onClick={() => setIsOpen(true)}
					/>
					{/*Logo*/}
					<Link to="/" className="md:ml-16">
						<img src={logo} className="invert" alt="Logo" />
					</Link>
					{/*Navigations*/}
					<div className="hidden md:flex gap-x-2 items-center">
						<Input
							alt="Search Products"
							placeholder="Search..."
							className="xl:w-xl bg-zinc-200"
						/>
						<Link className="flex gap-x-2 h-full items-center" to="/cart">
							<Button
								type="button"
								variant={"outline"}
								className="cursor-pointer bg-transparent text-white"
							>
								<ShoppingCart className="w-4" />{" "}
								<span className="hidden lg:inline">Cart</span>
							</Button>
						</Link>
						<Link className="flex gap-x-2 h-full items-center" to="/account">
							<Button
								type="button"
								variant={"outline"}
								className="cursor-pointer bg-transparent text-white"
							>
								<User className="w-4" />{" "}
								<span className="hidden lg:inline">Account</span>
							</Button>
						</Link>
						<Link
							className="flex gap-x-2 h-full items-center"
							to="/become-seller"
						>
							<Button
								type="button"
								variant={"outline"}
								className="cursor-pointer bg-transparent text-white"
							>
								<CircleUser className="w-4" />{" "}
								<span className="hidden lg:inline">Become Seller</span>
							</Button>
						</Link>
					</div>
				</nav>
			</header>
		</>
	);
}
