import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Mailbox } from "lucide-react";

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
            <NavigationMenuList>
                {navLinks.map((item) => (
                    <NavigationMenuLink asChild>
                        <a href={item.link}>{item.name}</a>
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
