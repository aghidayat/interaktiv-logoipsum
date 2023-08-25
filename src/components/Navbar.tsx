import React from "react";
import { Button } from ".";
import { buttonVariants } from "./Button";
import IcLogo from "@assets/logo.svg";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-row gap-x-10 items-center">
          <div className="text-white font-semibold text-lg">
            <Link to="/">
              <img src={IcLogo} alt="Logoipsum InterAktiv Technology" />
            </Link>
          </div>
          <ul className="flex gap-x-8">
            <li>
              <Link to="/" className="nav-item">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/#start-helping"
                className="nav-item active font-semibold">
                Start Helping
              </Link>
            </li>
            <li>
              <Link to="/#about-us" className="nav-item">
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <Button className={buttonVariants({ variant: "warning" })}>
          Contact Us
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
