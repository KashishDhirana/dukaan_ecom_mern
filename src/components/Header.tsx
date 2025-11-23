import { Link, type LinkProps } from "@tanstack/react-router";
import { CircleUser, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import React, {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import logo from "@/logo.svg";
import { Button, type ButtonProps } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const placeholderItems = [
  "keyboard",
  "mouse",
  "cloths",
  "men's ware",
  "women wardrobe",
  "need and many more...",
];
const placeholderLength = placeholderItems.length;

interface LinkUpdatedProps extends LinkProps {
  icon: React.ReactNode;
  linkName: string;
}

type SearchComponentProps = {
  lableProps?: React.HTMLProps<HTMLLabelElement>;
  formProps?: React.HTMLProps<HTMLFormElement>;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  buttonProps?: ButtonProps;
};

type LinkComponentProps = {
  linkMenus: LinkUpdatedProps[];
  linkProps?: React.HTMLProps<HTMLAnchorElement>;
  buttonProps?: ButtonProps;
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Record<"search", string>>({
    search: "",
  });
  const [placeholder, setPlaceholder] = useState<string>(placeholderItems[0]);

  const linkMenus: LinkUpdatedProps[] = [
    {
      to: "/cart",
      linkName: "Cart",
      icon: <ShoppingCart />,
    },
    {
      to: "/profile",
      linkName: "Profile",
      icon: <User />,
    },
    {
      to: "/become-seller",
      linkName: "Become Seller",
      icon: <CircleUser />,
    },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholder((prev) => {
        const currentIndex = placeholderItems.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholderLength;
        return placeholderItems[nextIndex];
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {isOpen && (
        <aside className="absolute flex flex-col items-center z-10 size-full bg-black">
          <div className="flex justify-end w-full">
            <X
              onClick={() => setIsOpen(false)}
              className="text-zinc-200 m-4 cursor-pointer"
            />
          </div>
          <div className="grid grid-row-3 place-content-center h-full gap-y-2 w-[90%] max-w-2xl group aside-menu">
            <SearchComponent
              formProps={{
                onSubmit: submitForm,
              }}
              inputProps={{
                id: "search",
                name: "search",
                value: formData.search,
                onChange: handleChange,
                className: "bg-zinc-200",
                placeholder,
                autoFocus: true,
              }}
              lableProps={{
                htmlFor: "search",
                className:
                  "pb-4 text-zinc-200 hidden group-[.aside-menu]:block group-[.aside-menu]:text-4xl font-bold",
              }}
              buttonProps={{
                type: "submit",
                variant: "outline",
                className:
                  "absolute top-0 right-0 cursor-pointer bg-transparent",
              }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:place-items-center pt-4 w-full **:w-full gap-4">
              <LinkComponent
                linkMenus={linkMenus}
                linkProps={{
                  onClick: () => setIsOpen(false),
                }}
                buttonProps={{
                  type: "button",
                  variant: "outline",
                  className: "cursor-pointer bg-transparent text-white",
                }}
              />
            </div>
          </div>
        </aside>
      )}
      <header className="p-4 relative bg-gray-700 grid place-items-center">
        {/*TODO: Remove outline*/}
        <nav className="container flex justify-center md:grid md:grid-cols-[auto_auto] md:justify-between">
          {/*Aside Menu Icon*/}
          <Menu
            className="absolute h-full top-0 left-4 text-zinc-200 md:hidden cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
          {/*Logo*/}
          <Link to="/">
            <img src={logo} className="invert" alt="Logo" />
          </Link>
          {/*Navigations*/}
          <div className="hidden md:flex gap-x-2 items-center [&>div]:w-64">
            <SearchComponent
              formProps={{
                onSubmit: submitForm,
              }}
              inputProps={{
                id: "search",
                name: "search",
                value: formData.search,
                onChange: handleChange,
                className: "bg-zinc-200 pr-34",
                placeholder: `Search for ${placeholder}`,
              }}
              lableProps={{
                htmlFor: "search",
                className:
                  "pb-4 text-zinc-200 hidden group-[.aside-menu]:block group-[.aside-menu]:text-4xl font-bold",
              }}
              buttonProps={{
                type: "submit",
                variant: "outline",
                className:
                  "absolute top-0 right-0 cursor-pointer bg-transparent",
              }}
            />
            <LinkComponent
              linkProps={{
                onClick: () => setIsOpen(false),
              }}
              linkMenus={linkMenus}
              buttonProps={{
                type: "button",
                variant: "outline",
                className: "cursor-pointer bg-transparent text-white",
              }}
            />
          </div>
        </nav>
      </header>
    </>
  );
}

function SearchComponent({
  formProps,
  inputProps,
  lableProps,
  buttonProps,
}: SearchComponentProps) {
  return (
    <form {...formProps}>
      <Label {...lableProps}>Find what you need: </Label>
      {/*TODO: Debounce the search with and from backend */}
      <div className="relative">
        <Input {...inputProps} />
        <Button {...buttonProps}>
          <Search />
        </Button>
      </div>
    </form>
  );
}

function LinkComponent({
  linkMenus,
  linkProps,
  buttonProps,
}: LinkComponentProps) {
  return (
    <>
      {/*Navigations*/}
      {linkMenus.map((curr) => {
        return (
          <Link
            key={curr.to}
            className="h-full flex items-center"
            to={curr.to}
            onClick={linkProps?.onClick}
          >
            <Button {...buttonProps}>
              {curr.icon}{" "}
              <span className="group-[.aside-menu]:inline w-auto! hidden lg:inline">
                {curr.linkName}
              </span>
            </Button>
          </Link>
        );
      })}
    </>
  );
}
