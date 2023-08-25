import React from "react";
import IcTwitter from "@assets/twitter.svg";
import IcFacebook from "@assets/facebook.svg";
import IcLinkedin from "@assets/linkedin.svg";
import IcLogo from "@assets/logo.svg";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto">
        <div className="py-10 space-y-5">
          <img src={IcLogo} alt="Logoipsum InterAktiv Technology" />
          <p className="text-neutral-200">
            We provide ways for you to help and <br /> give back for our
            community
          </p>
          <ul className="flex space-x-4 font-semibold">
            <li>
              <a href="#" className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Start Helping
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="container flex justify-between items-center border-t border-neutral-600 mt-10 pb-7 py-5">
          <p className="text-neutral-300">
            © {new Date().getFullYear()} InterAktiv Technology Pte Ltd. Test
            purposes.
          </p>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank">
              <img src={IcTwitter} />
            </a>
            <a href="https://facebook.com" target="_blank">
              <img src={IcFacebook} />
            </a>
            <a href="https://linkedin.com" target="_blank">
              <img src={IcLinkedin} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
