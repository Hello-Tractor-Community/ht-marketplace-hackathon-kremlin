"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { PrimaryButton } from "@/components/primary-button";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-6 w-full md:w-[90%] mx-auto">
      <header
        className={`sticky top-0 z-50 mx-4 transition-all duration-300 rounded-md bg-slate-100 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-md shadow-lg"
            : "bg-white/40 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* Desktop logo */}
              <Link href="#" className="text-xl font-bold text-gray-800">
                <Image
                  src="/HT_LOGO_ORANGE.png"
                  alt="Hello Tractor logo"
                  width={150}
                  height={150}
                  quality={80}
                  loading="lazy"
                  className="hidden md:block"
                />
              </Link>
              {/* Mobile logo */}
              <Link href="#" className="text-xl font-bold text-gray-800">
                <Image
                  src="/HT_LOGO_ORANGE.png"
                  alt="Hello Tractor logo"
                  width={100}
                  height={100}
                  quality={80}
                  loading="lazy"
                  className="block md:hidden"
                />
              </Link>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-4 text-sm ">
                <li>
                  <a href="#" className="nav-link ">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    Buy Your Tractor
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    Sell Your Tractor
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    Dealer Listings
                  </a>
                </li>
                <li>
                  <a href="#" className="nav-link">
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-800 transition-transform duration-300 ease-in-out"
              >
                {isMenuOpen ? (
                  <X className="animate-spin-once" />
                ) : (
                  <Menu className="hover:rotate-12 transition-transform" />
                )}
              </button>
            </div>
            <div className="md:flex items-center md:gap-3 hidden">
              <Link href="/auth/sign-up">Sign In/ Registration</Link>
              Sign In/ Registration
              <Link href="/listings">
                <PrimaryButton>
                  Buy A Tractor <ChevronDown />
                </PrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`md:hidden fixed top-24 left-0 right-0 transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="bg-white/70 backdrop-blur-md mx-4 px-4 pt-2 pb-4 rounded-3xl shadow-lg">
          <ul className="space-y-2">
            {[
              { title: "Home", route: "#" },
              { title: "Buy Your Tractor", route: "#" },
              { title: "Sell Your Tractor", route: "#" },
              { title: "Dealer Listings", route: "#" },
              { title: "Contact Us", route: "#" },
            ].map((item, index) => (
              <li
                key={item.title}
                className={`transform transition-all duration-300 delay-${index}`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <Link
                  href={item.route}
                  className="block text-gray-800 hover:text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <Link href="/sign-in">
              <PrimaryButton>
                Buy A Tractor <ChevronDown />
              </PrimaryButton>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
