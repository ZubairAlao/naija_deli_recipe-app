import Link from 'next/link';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import NaijaDeli from './naija-deli';

const socialMedia = [
  { text: "Facebook", icon: GlobeAltIcon, link: '#' },
  { text: "Twitter", icon: GlobeAltIcon, link: '#' },
  { text: "Linkedin", icon: GlobeAltIcon, link: '#' },
];

export default function Footer() {
  return (
    <div className="mx-auto p-4 text-center md:text-left space-y-6 bg-green-200">
      <div className="gap-8 lg:gap-[11rem] flex flex-col md:flex-row items-center md:items-start justify-center">
        <div className="md:w-80">
          <div>
            <NaijaDeli />
          </div>
          <p className="mt-2">World of Nigerian Popular Tribal Dishes.</p>
          <div className="flex gap-4 mt-4 justify-center">
            {socialMedia.map((social, index) => (
              <Link href={social.link} key={index}>
                <div className="flex items-center">
                  <social.icon className="h-5 w-5" />
                  <span className="ml-2">{social.text}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-lg text-[#2E7D32] dark:text-[#ff6f00] font-semibold">Get in Touch</h1>
          <address className="mt-2">
            <p>No 13, Lagos Street,</p>
            <p>Ikeja, Lagos State,</p>
            <p>Nigeria</p>
          </address>
          <p className="mt-2">Email: <Link href="mailto:NaijaDeli@support.ng">NaijaDeli@support.ng</Link></p>
          <p>Phone: +234 800 123 4567</p>
        </div>

        <div>
          <h1 className="text-lg text-[#2E7D32] dark:text-[#ff6f00] font-semibold">Site Links</h1>
          <ul className="mt-2">
            <li><Link href="/">NaijaDeli</Link></li>
            <li><Link href="/categories">Categories</Link></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <p>&copy; NaijaDeli, 2024. All rights reserved.</p>
        <ul className="flex gap-4">
          <li><Link href="#">Terms & Conditions</Link></li>
          <li><Link href="#">Privacy Policy</Link></li>
        </ul>
      </div>
    </div>
  );
}
