import { Link } from "@tanstack/react-router";

export default function MenuBar() {
  const menuItems = [
    {
      key: 1,
      name: "Mobiles",
      link: "/product/mobiles",
    },
    {
      key: 2,
      name: "Tablets",
      link: "/product/tablets",
    },
    {
      key: 3,
      name: "Today's Deals",
      link: "/product/today-deals",
    },
    {
      key: 4,
      name: "Home Furnitures",
      link: "/product/home-furnitures",
    },
    {
      key: 5,
      name: "Electronics",
      link: "/product/electronics",
    },
    {
      key: 6,
      name: "TV & Appliances",
      link: "/product/tv-appliances",
    },
  ];

  return (
    <div
      style={{ scrollbarWidth: "thin" }}
      className="flex bg-gray-600 justify-start lg:justify-center gap-x-4 overflow-y-auto"
    >
      {menuItems.map((val) => (
        <Link
          key={val.key}
          to={val.link}
          className="whitespace-nowrap text-zinc-200 p-2 hover:bg-gray-800"
        >
          {val.name}
        </Link>
      ))}
    </div>
  );
}
