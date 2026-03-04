import { Link } from "react-router-dom";
import {
  MapPin,
  BarChart3,
  Shield,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Package,
  Globe,
  Zap,
  Users,
  CheckCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

const heroImages = [
  { src: "/home_page/warehouse-1.jpg", alt: "Modern Warehouse Facility" },
  { src: "/home_page/port-1.jpg", alt: "Port Operations" },
  { src: "/home_page/cargo-1.jpg", alt: "Cargo Management" },
  { src: "/home_page/warehouse-3.jpg", alt: "Automated Warehouse" },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Image Carousel */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white overflow-hidden">
        {/* Background Image Slider */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-30" : "opacity-0"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-indigo-800/80 to-indigo-900/90"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-indigo-500/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-indigo-400/30">
                  Next-Generation Logistics Platform
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Streamline Your Logistics Operations with Confidence
              </h1>
              <p className="text-xl text-indigo-100 leading-relaxed">
                Manage your shipments, track deliveries, and optimize your
                supply chain with ease. Join thousands of businesses
                transforming their logistics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="inline-flex items-center justify-center bg-indigo-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-600/50 transition-all border border-indigo-400/30">
                  <Package className="mr-2 h-5 w-5" />
                  Request Demo
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2,500+</div>
                  <div className="text-sm text-indigo-200">Active Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50k+</div>
                  <div className="text-sm text-indigo-200">Shipments/Month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">99.8%</div>
                  <div className="text-sm text-indigo-200">On-Time Rate</div>
                </div>
              </div>
            </div>

            {/* Right Content - Image Carousel Display */}
            <div className="relative lg:block hidden">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ${
                      index === currentSlide
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="text-white text-xl font-semibold">
                        {image.alt}
                      </h3>
                    </div>
                  </div>
                ))}

                {/* Carousel Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 font-medium mb-8">
            Trusted by 2,500+ Growing Businesses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {[
              "GlobalTech",
              "NextWave",
              "SwiftCargo",
              "Union Freight",
              "EcoMove",
            ].map((company) => (
              <div
                key={company}
                className="flex items-center space-x-2 text-gray-400"
              >
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                <span className="text-lg font-semibold">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your logistics operations
              efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-Time Tracking
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track your shipments live with real-time updates. Know exactly
                where your packages are at any moment.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Analytics & Reports
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Gain insights with detailed performance analytics. Make
                data-driven decisions for your business.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure Client Portal
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access a protected portal for all your logistics needs.
                Enterprise-grade security for your data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Left-Aligned Image Section - Global Reach */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="relative group order-2 lg:order-1">
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/home_page/port-2.jpg"
                  alt="Global Port Operations"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-transparent to-transparent"></div>
                {/* Floating Stats Badge */}
                <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-xl p-4 backdrop-blur-sm bg-white/95">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Globe className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        150+
                      </div>
                      <div className="text-sm text-gray-600">
                        Countries Served
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-block">
                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">
                  Global Network
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Connect Your Business to the World
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our extensive global network ensures your shipments reach any
                destination quickly and reliably. With strategic partnerships
                across 150+ countries, we provide seamless logistics solutions
                for businesses of all sizes.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      24/7 Support
                    </h3>
                    <p className="text-gray-600">
                      Round-the-clock assistance for all your logistics needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Fast Delivery
                    </h3>
                    <p className="text-gray-600">
                      Express shipping options available worldwide
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Dedicated Team
                    </h3>
                    <p className="text-gray-600">
                      Professional logistics experts at your service
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Shipping Globally
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                <img
                  src="/home_page/warehouse-2.jpg"
                  alt="Create Account"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-white text-indigo-600 rounded-full text-2xl font-bold flex items-center justify-center shadow-lg">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Create Account
              </h3>
              <p className="text-gray-600 text-center">
                Sign up and set up your profile in minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                <img
                  src="/home_page/port-2.jpg"
                  alt="Add Shipments"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-white text-indigo-600 rounded-full text-2xl font-bold flex items-center justify-center shadow-lg">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Add Shipments
              </h3>
              <p className="text-gray-600 text-center">
                Enter shipment details and destinations with ease.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                <img
                  src="/home_page/bus-1.jpg"
                  alt="Monitor & Optimize"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 bg-white text-indigo-600 rounded-full text-2xl font-bold flex items-center justify-center shadow-lg">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Monitor & Optimize
              </h3>
              <p className="text-gray-600 text-center">
                Track and manage your deliveries efficiently in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Center-Aligned Image Section - Technology Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold">
                Advanced Technology
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              State-of-the-Art Warehouse Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of logistics with our cutting-edge automated
              warehouses and intelligent inventory systems
            </p>
          </div>

          {/* Center Image */}
          <div className="relative max-w-5xl mx-auto mb-12">
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/home_page/cargo-1.jpg"
                alt="Advanced Warehouse Technology"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Overlay Stats */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      99.9%
                    </div>
                    <div className="text-xs sm:text-sm text-white/90">
                      Accuracy Rate
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      50%
                    </div>
                    <div className="text-xs sm:text-sm text-white/90">
                      Faster Processing
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      24/7
                    </div>
                    <div className="text-xs sm:text-sm text-white/90">
                      Operations
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      AI
                    </div>
                    <div className="text-xs sm:text-sm text-white/90">
                      Powered
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Smart Analytics
                </h3>
                <p className="text-gray-600">
                  Real-time insights and predictive analytics for optimal
                  decision-making
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Automated Systems
                </h3>
                <p className="text-gray-600">
                  Cutting-edge automation reduces errors and increases
                  efficiency
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Secure & Reliable
                </h3>
                <p className="text-gray-600">
                  Enterprise-grade security with redundant systems for maximum
                  uptime
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/home_page/warehouse-4.jpg"
            alt="Warehouse Operations"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-800/90"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Simplify Your Logistics?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Start managing your shipments with ease today.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-xl"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-semibold text-white">
                  Acme Logistics
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Smart Shipment. Seamless Delivery.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2026 Acme Logistics. All rights reserved.</p>
            <p>An MDD Production</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
