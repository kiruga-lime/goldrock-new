import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/images/design-mode/image.png"
                alt="Goldrock Safaris"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-background/80 text-sm">
              Experience the wild beauty of East Africa with our expertly crafted safari adventures. Creating
              unforgettable memories across Uganda, Kenya, and Tanzania.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-background/60 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/60 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-background/60 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-background/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/itineraries" className="text-background/80 hover:text-accent transition-colors">
                  Safari Itineraries
                </Link>
              </li>
              <li>
                <Link href="/add-itinerary" className="text-background/80 hover:text-accent transition-colors">
                  Add Itinerary
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Safari Destinations */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Popular Destinations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-background/80 hover:text-accent transition-colors">
                  Bwindi Forest
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-accent transition-colors">
                  Queen Elizabeth Park
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-accent transition-colors">
                  Masai Mara
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/80 hover:text-accent transition-colors">
                  Serengeti
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-background/80">Stage 7, Luzira, Kampala, Uganda</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <div className="text-background/80">
                  <div>+256 759 536 866</div>
                  <div>+256 782 242 257</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <div className="text-background/80">
                  <div>info@goldrocksafaris.com</div>
                  <div>wwwgoldrocksafaris@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © 2025 Goldrock Safaris Ltd. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
