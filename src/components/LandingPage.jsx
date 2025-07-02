import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Shield,
  Clock,
  Award,
  CreditCard,
  Users,
  Lock,
  Star,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

// ✅ Import local images
import bankLogo from "../images/bank-logo.avif";
import heroImg from "../images/hero-img.avif";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description:
        "Your money and data are protected with military-grade encryption and advanced security protocols.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Access your account anytime, anywhere. Our services are available round the clock for your convenience.",
    },
    {
      icon: Award,
      title: "Trusted Excellence",
      description:
        "Award-winning banking services trusted by millions of customers worldwide for over two decades.",
    },
    {
      icon: CreditCard,
      title: "Smart Banking",
      description:
        "Innovative digital banking solutions that make managing your finances simple and efficient.",
    },
    {
      icon: Users,
      title: "Personal Support",
      description:
        "Dedicated customer service team ready to assist you with personalized banking solutions.",
    },
    {
      icon: Lock,
      title: "Secure Transactions",
      description:
        "Every transaction is secured with multi-factor authentication and real-time fraud monitoring.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      message:
        "Dev Thakur Bank has transformed how I manage my business finances. Their digital platform is intuitive and their customer service is exceptional.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      message:
        "The security features and mobile app are outstanding. I feel completely confident managing my finances with Dev Thakur Bank.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      message:
        "From personal banking to investment advice, they've been my trusted financial partner for over 5 years. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <img src={bankLogo} alt="Dev Thakur Bank Logo" className="h-10 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-black transition-colors">Services</a>
              <a href="#testimonials" className="text-gray-700 hover:text-black transition-colors">Testimonials</a>
              <a href="#contact" className="text-gray-700 hover:text-black transition-colors">Contact</a>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-black">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <a href="#services" className="text-gray-700 hover:text-black transition-colors">Services</a>
                <a href="#testimonials" className="text-gray-700 hover:text-black transition-colors">Testimonials</a>
                <a href="#contact" className="text-gray-700 hover:text-black transition-colors">Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-none">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Dev Thakur Bank
            </span>
          </h1>
          <p className="text-2xl md:text-3xl mb-12 text-gray-100 font-light tracking-wide">
            Secure. Trusted. Always Available.
          </p>
          <button
            onClick={() => navigate("/user-login")}
            className="bg-gradient-to-r from-white to-gray-100 text-black px-12 py-5 text-xl font-bold rounded-full hover:from-gray-100 hover:to-white transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Log in to your account
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-black mb-6 tracking-tight">Why Choose Dev Thakur Bank</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto font-light">
              Experience banking that puts your needs first with cutting-edge technology and personalized service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-black mb-6 tracking-tight">What Our Customers Say</h2>
            <p className="text-2xl text-gray-600 font-light">Trusted by thousands of satisfied customers worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-10 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">"{testimonial.message}"</p>
                <div>
                  <p className="font-bold text-black text-xl">{testimonial.name}</p>
                  <p className="text-gray-600 font-medium">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Dev Thakur Bank</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Your trusted financial partner providing secure, innovative banking solutions for individuals and
                businesses worldwide.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3">
                <div className="flex items-center"><Mail className="w-5 h-5 mr-3 text-gray-400" /><span className="text-gray-300">contact@devthakurbank.com</span></div>
                <div className="flex items-center"><Phone className="w-5 h-5 mr-3 text-gray-400" /><span className="text-gray-300">+1 (555) 123-4567</span></div>
                <div className="flex items-center"><MapPin className="w-5 h-5 mr-3 text-gray-400" /><span className="text-gray-300">123 Banking St, Finance City</span></div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} Dev Thakur Bank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
