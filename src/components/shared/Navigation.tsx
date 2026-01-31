import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { BookOpen, Mailbox, NotebookPen, PenIcon } from "lucide-react";

const navLinks = [
    {
        name: "Read",
        link: "/read",
    },
    {
        name: "Write",
        link: "/write",
    },
];

function Navigation() {
    return (
        <NavigationMenu className="flex justify-between min-w-full py-4">
            <a
                className="flex items-center font-mono gap-2 text-2xl font-bold hover:bg-accent hover:shadow px-4 py-1 rounded-full duration-300"
                href="/"
            >
                <Mailbox size={50} /> <span>Blogbuster</span>
            </a>
            <NavigationMenuList className="gap-8">
                {navLinks.map((item) => (
                    <NavigationMenuLink
                        className="hover:text-black items-center gap-2 flex-row hover:shadow px-4 py-2 rounded-full"
                        href={item.link}
                        key={item.link}
                    >
                        {item.name === "Read" ? (
                            <BookOpen className="size-6" />
                        ) : (
                            <NotebookPen className="size-6" />
                        )}
                        <span className="text-xl">{item.name}</span>
                    </NavigationMenuLink>
                ))}
            </NavigationMenuList>
            <div>
                <p>Theme toggle</p>
            </div>
        </NavigationMenu>
    );
}

export default Navigation;
