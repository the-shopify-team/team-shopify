import { Instagram, Youtube, Twitter } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
/*   const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }; */

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
          {/* Company */}
          <div className="md:col-span-1">
            <Link href="/" className="flex justify-start">
              <h1 className="text-[32px] font-bold">
                <span className="text-[#FF9F1C]">Ride</span>hiv
              </h1>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed w-[207px]">
              Discover the world from above at a time life is short book a trip
            </p>
            <div className="flex space-x-4">
                <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="hover:text-[#FF9F1C] transition-colors duration-300"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-telegram">
                    <path d="M22 2L11 13"></path>
                    <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                  </svg>
                </a>
                <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-[#FF9F1C] transition-colors duration-300"
                >
                  <Instagram />
                </a>
                <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="hover:text-[#FF9F1C] transition-colors duration-300"
                >
                  <Twitter />
                </a>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:ml-auto">
            <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  /* onClick={scrollToTop} */
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  How It Works
                </Link>
              </li>
                <li>
                  <Link
                    href="/about"
                    /* onClick={scrollToTop} */
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                
                <li>
                  <Link
                    href="/about"
                    /* onClick={scrollToTop} */
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
              

            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-6">Travel</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  /* onClick={scrollToTop} */
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Ghana
                </Link>
              </li>
              <li>
                <a
                  href="https://blog.ecomleads.io"
                  target="_blank"
                  rel="noopener"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Nigeria
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  /* onClick={scrollToTop} */
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Belgium
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  /* onClick={scrollToTop} */
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  France
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-6">Extra Link</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/terms"
                  /* onClick={scrollToTop} */
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Customer Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  /* onClick={scrollToTop} */
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Term and condition
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  /* onClick={scrollToTop} */
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          </div>
          {/* Product */}
          
        </div>

      </div>

    </footer>
  );
};
