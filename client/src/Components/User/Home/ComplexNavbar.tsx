import React from "react";
import {
  Navbar,
  MobileNav,
  Typography, IconButton
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/outline";
import { ProfileMenu } from "./NavBar";

// </ul>
// );
// }
export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div className="flex w-screen bg-deep-purple-100 fixed z-50">
      {/* <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 mt-2 bg-light-blue-200 "> */}
      <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 mt-2 bg-light-blue-200">
        <div className="relative mx-auto flex items-center text-blue-gray-900 justify-center">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
            WellConnect 
          </Typography>
          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            {/* <NavList /> */}
          </div>


          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <ProfileMenu />
        </div>
        <MobileNav open={isNavOpen} className="overflow-scroll">
          {/* <NavList /> */}
        </MobileNav>
      </Navbar>
    </div>
  );
}
