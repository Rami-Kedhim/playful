
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Phone, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-400">UberEscorts</h3>
            <p className="text-gray-300 mb-4">
              Premium escort services platform, connecting verified escorts with clients in a safe and secure environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/escorts" className="text-gray-300 hover:text-white">Find Escorts</Link>
              </li>
              <li>
                <Link to="/verification" className="text-gray-300 hover:text-white">Verification</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-300 hover:text-white">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-300 hover:text-white">Disclaimer</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2" />
                <a href="mailto:support@uberescorts.com" className="hover:text-white">
                  support@uberescorts.com
                </a>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Globe size={16} className="mr-2" />
                <span>Available Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {currentYear} UberEscorts. All Rights Reserved. For adults 21+
          </p>
          <p className="text-center text-gray-500 text-xs mt-2">
            This platform connects consenting adults. We do not promote illegal activities.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
