import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white pt-16 pb-8 px-4 md:px-8 lg:px-16" id="contact">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and social media */}
          <div className="space-y-6">
            <img src={assets.logo} alt="Company Logo" className="w-32 h-auto" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos nobis
              perspiciatis vel doloribus exercitationem cumque similique, placeat
              at quibusdam consequatur quis odit quod tenetur tempora debitis.
              Sint, at. Earum, maxime!
            </p>
            <div className="flex space-x-4">
              <img 
                src={assets.facebook_icon} 
                alt="Facebook" 
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" 
              />
              <img 
                src={assets.twitter_icon} 
                alt="Twitter" 
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" 
              />
              <img 
                src={assets.linkedin_icon} 
                alt="LinkedIn" 
                className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" 
              />
            </div>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-orange-500">Company</h2>
            <ul className="space-y-3">
              {['Home', 'About us', 'Delivery', 'Privacy policy'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-400 hover:text-orange-500 transition-colors text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-orange-500">Get in touch</h2>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <span>+1-101-212-7890</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <span>Foodorder@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter (optional) */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-orange-500">Newsletter</h2>
            <p className="text-gray-400 text-sm">
              Subscribe to our newsletter for updates and offers.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-900 text-sm"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs">
          <p>Copyright © 2025 Company - All Rights Reserved</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;