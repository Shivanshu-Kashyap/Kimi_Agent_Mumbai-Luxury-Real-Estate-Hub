import { useState, useEffect, useRef } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X, 
  Building2, 
  Home, 
  Landmark,
  ChevronDown,
  CheckCircle2,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import './App.css'

// Project data
const projects = [
  {
    id: 1,
    name: "Lodha Marq",
    location: "Tardeo, South Mumbai",
    developer: "Lodha Group",
    config: "3, 4 & 5 BHK",
    price: "₹9.79 Cr - ₹19.93 Cr",
    image: "/project-1.jpg",
    category: "South Mumbai",
    description: "An ultra-luxury 33-storey tower with just 80 exclusive residences, offering stunning city views and premium interiors."
  },
  {
    id: 2,
    name: "Oberoi Three Sixty West",
    location: "Worli, Mumbai",
    developer: "Oberoi Realty",
    config: "4 & 5 BHK",
    price: "₹69.99 Cr onwards",
    image: "/project-2.jpg",
    category: "Worli",
    description: "Two iconic 90-floor towers offering unparalleled luxury with panoramic sea and city views."
  },
  {
    id: 3,
    name: "Piramal Aranya",
    location: "Byculla, South Mumbai",
    developer: "Piramal Realty",
    config: "2, 3 & 4 BHK",
    price: "₹3.72 Cr - ₹14.61 Cr",
    image: "/project-3.jpg",
    category: "South Mumbai",
    description: "A 7-acre development with 360° views of Rani Baug and Eastern Harbour, featuring 40+ lifestyle amenities."
  },
  {
    id: 4,
    name: "Kalpataru Prive",
    location: "Malabar Hill, South Mumbai",
    developer: "Kalpataru Group",
    config: "4 BHK & Duplexes",
    price: "₹33.89 Cr onwards",
    image: "/project-4.jpg",
    category: "Malabar Hill",
    description: "Exclusive gated community with panoramic sea and skyline views in Mumbai's most elite neighborhood."
  },
  {
    id: 5,
    name: "Godrej Trilogy",
    location: "Worli, South Mumbai",
    developer: "Godrej Properties",
    config: "3 & 4 BHK",
    price: "₹15 Cr onwards",
    image: "/project-5.jpg",
    category: "Worli",
    description: "Three iconic towers rising 44-76 storeys with sea-facing residences and 30+ lifestyle amenities."
  },
  {
    id: 6,
    name: "Piramal Mahalaxmi",
    location: "Mahalaxmi, South Mumbai",
    developer: "Piramal Realty",
    config: "2, 3 & 4 BHK",
    price: "₹4.81 Cr - ₹14.99 Cr",
    image: "/project-6.jpg",
    category: "Mahalaxmi",
    description: "Three landmark towers with lifetime views of Arabian Sea and Mahalaxmi Racecourse."
  },
  {
    id: 7,
    name: "Rustomjee Crown",
    location: "Prabhadevi, Mumbai",
    developer: "Rustomjee",
    config: "3, 4 & 5 BHK",
    price: "₹11.26 Cr - ₹26.05 Cr",
    image: "/project-7.jpg",
    category: "South Mumbai",
    description: "A distinguished address offering breathtaking views of skyline, shoreline and Bandra-Worli Sea Link."
  },
  {
    id: 8,
    name: "Kalpataru Azuro",
    location: "Nepean Sea Road, Mumbai",
    developer: "Kalpataru Group",
    config: "4 BHK & 4+ BHK",
    price: "₹35 Cr - ₹55.35 Cr",
    image: "/project-8.jpg",
    category: "Malabar Hill",
    description: "Ultra-luxury residences with large floor areas up to 3,777 sq ft and premium finishes."
  },
  {
    id: 9,
    name: "SD The Imperial Edge",
    location: "Tardeo, South Mumbai",
    developer: "SD Corporation",
    config: "3 BHK",
    price: "₹11.5 Cr onwards",
    image: "/project-9.jpg",
    category: "Tardeo",
    description: "Exclusive gated community with sea and skyline views in prime Tardeo location."
  },
  {
    id: 10,
    name: "The Manor",
    location: "Malabar Hill, Mumbai",
    developer: "Taksheel Developers",
    config: "4 & 6 BHK",
    price: "₹27.30 Cr onwards",
    image: "/project-10.jpg",
    category: "Malabar Hill",
    description: "Ultra-luxury residences with tall floor-to-ceiling heights and views of Hanging Gardens & sea."
  },
  {
    id: 11,
    name: "MICL Aaradhya Avaan",
    location: "Tardeo, South Mumbai",
    developer: "MICL Group",
    config: "3, 4 & 5 BHK",
    price: "₹9.8 Cr - ₹25.08 Cr",
    image: "/project-11.jpg",
    category: "Tardeo",
    description: "Twin 61-floor towers with sea & skyline views and 55+ lifestyle amenities."
  },
  {
    id: 12,
    name: "Raheja Modern Vivarea",
    location: "Mahalaxmi, Mumbai",
    developer: "K Raheja Corp",
    config: "3, 4 & 5 BHK",
    price: "₹14.5 Cr onwards",
    image: "/project-12.jpg",
    category: "Mahalaxmi",
    description: "IGBC Gold pre-certified project with sea, golf course & racecourse views."
  },
  {
    id: 13,
    name: "Raheja Imperia 2",
    location: "Worli/Lower Parel, Mumbai",
    developer: "Raheja Universal",
    config: "3, 4 & 4+ BHK",
    price: "₹15.79 Cr - ₹20.53 Cr",
    image: "/project-13.jpg",
    category: "Worli",
    description: "Large 5-acre development with multiple towers offering premium residences."
  },
  {
    id: 14,
    name: "Hiranandani Gardens",
    location: "Powai, Mumbai",
    developer: "Hiranandani Group",
    config: "1, 2, 3 & 4 BHK",
    price: "₹2.87 Cr - ₹3.99 Cr",
    image: "/project-14.jpg",
    category: "Powai",
    description: "250+ acre landmark township with 40% green spaces and integrated lifestyle."
  },
  {
    id: 15,
    name: "Marine Drive Residences",
    location: "Marine Drive, South Mumbai",
    developer: "Shapoorji Pallonji",
    config: "3 BHK",
    price: "₹12.5 Cr onwards",
    image: "/project-15.jpg",
    category: "South Mumbai",
    description: "Premium sea-facing apartments with direct views of Queen's Necklace."
  }
]

const developers = [
  "Lodha Group", "Oberoi Realty", "Piramal Realty", "Godrej Properties",
  "Kalpataru Group", "Rustomjee", "K Raheja Corp", "Hiranandani Group",
  "SD Corporation", "MICL Group", "Raheja Universal", "Adani Realty"
]

const categories = ["All", "South Mumbai", "Worli", "Malabar Hill", "Tardeo", "Mahalaxmi", "Powai"]

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")
  const [, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const [counters, setCounters] = useState({ projects: 0, value: 0, developers: 0, rera: 0 })
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  // Handle scroll for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection observer for projects
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleProjects((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const projectCards = document.querySelectorAll('.project-card')
    projectCards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [activeCategory])

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2000
          const steps = 60
          const interval = duration / steps
          
          let step = 0
          const timer = setInterval(() => {
            step++
            const progress = step / steps
            const easeOut = 1 - Math.pow(1 - progress, 3)
            
            setCounters({
              projects: Math.round(15 * easeOut),
              value: Math.round(500 * easeOut),
              developers: Math.round(50 * easeOut),
              rera: Math.round(100 * easeOut)
            })
            
            if (step >= steps) clearInterval(timer)
          }, interval)
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  const scrollToSection = (id: string) => {
    if (id === 'privacy-policy') {
      setShowPrivacyPolicy(true)
      setIsMobileMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (showPrivacyPolicy) {
      setShowPrivacyPolicy(false)
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsMobileMenuOpen(false)
  }

  // Privacy Policy Page Component
  if (showPrivacyPolicy) {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setShowPrivacyPolicy(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <Building2 className="w-8 h-8 text-[#d6ac8d]" />
                <span className="text-xl font-semibold tracking-tight text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Mumbai Luxury Homes
                </span>
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setShowPrivacyPolicy(false)
                      setTimeout(() => scrollToSection(item.toLowerCase()), 100)
                    }}
                    className="relative text-sm font-medium transition-colors hover:text-[#d6ac8d] text-gray-700"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d6ac8d] transition-all duration-300 hover:w-full" />
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:block">
                <Button 
                  onClick={() => {
                    setShowPrivacyPolicy(false)
                    setTimeout(() => scrollToSection('contact'), 100)
                  }}
                  className="bg-[#d6ac8d] hover:bg-gray-900 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Enquire Now
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="text-gray-900" />
                ) : (
                  <Menu className="text-gray-900" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl py-4 px-4">
              {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setShowPrivacyPolicy(false)
                    setTimeout(() => scrollToSection(item.toLowerCase()), 100)
                  }}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-[#d6ac8d] transition-colors"
                >
                  {item}
                </button>
              ))}
              <Button 
                onClick={() => {
                  setShowPrivacyPolicy(false)
                  setTimeout(() => scrollToSection('contact'), 100)
                }}
                className="w-full mt-4 bg-[#d6ac8d] hover:bg-gray-900 text-white"
              >
                Enquire Now
              </Button>
            </div>
          )}
        </nav>

        {/* Privacy Policy Content */}
        <section className="pt-32 pb-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <p className="text-[#d6ac8d] text-sm tracking-[0.2em] uppercase mb-4">Legal</p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Privacy Policy
              </h1>
              <p className="text-gray-600">Last updated: February 20, 2026</p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <p className="text-gray-700 leading-relaxed mb-0">
                  At Mumbai Luxury Homes, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  1. Information We Collect
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Personal details such as name, email address, and phone number</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Property preferences and budget information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Communication preferences and feedback</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Information about your interactions with our website and services</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  2. How We Use Your Information
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Provide you with personalized property recommendations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Respond to your inquiries and schedule property viewings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Send you marketing communications about new properties and exclusive offers (with your consent)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Improve our services and enhance your user experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Comply with legal obligations and protect our rights</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  3. Marketing Communications
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With your explicit consent, we may send you marketing communications through various channels including:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span><strong>SMS:</strong> Short text messages with property updates and offers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span><strong>RCS (Rich Communication Services):</strong> Enhanced messaging with images and interactive elements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span><strong>AI Bot:</strong> Automated chatbot interactions for quick assistance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span><strong>IVR (Interactive Voice Response):</strong> Automated phone calls with property information</span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  You can withdraw your consent for marketing communications at any time by contacting us or using the unsubscribe option in our messages.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  4. Data Security
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  5. Information Sharing
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Trusted developers and builders for property-related inquiries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Service providers who assist in our operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Legal authorities when required by law</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  6. Your Rights
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Access, correct, or delete your personal information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Withdraw consent for marketing communications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Object to processing of your personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d6ac8d] mt-1 flex-shrink-0" />
                    <span>Request data portability</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  7. Cookies and Tracking
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser preferences.
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  8. Updates to This Policy
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div className="bg-[#d6ac8d]/10 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Contact Us
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#d6ac8d]" />
                    <span>07935418538</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#d6ac8d]" />
                    <span>rajesh@propinvest.in</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#d6ac8d] mt-1" />
                    <span>Worli, Mumbai - 400018</span>
                  </p>
                </div>
              </div>

              {/* <div className="mt-8 text-center">
                <Button
                  onClick={() => {
                    setShowPrivacyPolicy(false)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="bg-gray-900 hover:bg-[#d6ac8d] text-white px-8 py-6 rounded-full transition-all duration-300"
                >
                  Back to Home
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div> */}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-8 h-8 text-[#d6ac8d]" />
                  <span className="text-xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Mumbai Luxury Homes
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Curating Mumbai's finest luxury residences since 2010. Your trusted partner in premium real estate.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-3">
                  {['Home', 'Projects', 'About Us', 'Contact', 'Privacy Policy'].map((link) => (
                    <li key={link}>
                      <button 
                        onClick={() => {
                          if (link === 'Privacy Policy') {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          } else {
                            setShowPrivacyPolicy(false)
                            setTimeout(() => scrollToSection(link.toLowerCase().replace(' ', '-')), 100)
                          }
                        }}
                        className="text-gray-400 hover:text-[#d6ac8d] transition-colors"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Projects</h4>
                <ul className="space-y-3">
                  {['South Mumbai', 'Worli', 'Malabar Hill', 'Tardeo', 'Mahalaxmi'].map((loc) => (
                    <li key={loc}>
                      <button 
                        onClick={() => {
                          setShowPrivacyPolicy(false)
                          setActiveCategory(loc)
                          setTimeout(() => scrollToSection('projects'), 100)
                        }}
                        className="text-gray-400 hover:text-[#d6ac8d] transition-colors"
                      >
                        {loc}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-400">
                    <Phone className="w-5 h-5 text-[#d6ac8d]" />
                    07935418538
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <Mail className="w-5 h-5 text-[#d6ac8d]" />
                    rajesh@propinvest.in
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-[#d6ac8d] mt-1" />
                    Worli, Mumbai - 400018
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                © 2024 Mumbai Luxury Homes. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map((social) => (
                  <button 
                    key={social}
                    className="text-gray-400 hover:text-[#d6ac8d] transition-colors text-sm"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <Building2 className={`w-8 h-8 ${isScrolled ? 'text-[#d6ac8d]' : 'text-white'}`} />
              <span className={`text-xl font-semibold tracking-tight ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`} style={{ fontFamily: 'Playfair Display, serif' }}>
                Mumbai Luxury Homes
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Projects', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative text-sm font-medium transition-colors hover:text-[#d6ac8d] ${
                    isScrolled ? 'text-gray-700' : 'text-white/90'
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d6ac8d] transition-all duration-300 hover:w-full" />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-[#d6ac8d] hover:bg-gray-900 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
              >
                Enquire Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className={isScrolled ? 'text-gray-900' : 'text-white'} />
              ) : (
                <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl py-4 px-4">
            {['Home', 'Projects', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-[#d6ac8d] transition-colors"
              >
                {item}
              </button>
            ))}
            <Button 
              onClick={() => scrollToSection('contact')}
              className="w-full mt-4 bg-[#d6ac8d] hover:bg-gray-900 text-white"
            >
              Enquire Now
            </Button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/hero-bg.jpg" 
            alt="Luxury Mumbai Real Estate"
            className="w-full h-full object-cover scale-105 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="overflow-hidden mb-4">
              <p className="text-[#d6ac8d] text-sm tracking-[0.3em] uppercase animate-slide-up">
                Premium Real Estate Collection
              </p>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              <span className="block italic font-light animate-slide-up" style={{ animationDelay: '0.1s' }}>Discover</span>
              <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>Mumbai's</span>
              <span className="block text-[#d6ac8d] animate-slide-up" style={{ animationDelay: '0.3s' }}>Finest Homes</span>
            </h1>
            
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Curated collection of the city's most prestigious addresses. Where architectural excellence meets unparalleled luxury.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <Button 
                onClick={() => scrollToSection('projects')}
                className="bg-[#d6ac8d] hover:bg-white hover:text-gray-900 text-white px-8 py-6 rounded-full text-lg transition-all duration-300 hover:scale-105 group"
              >
                Explore Projects
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg backdrop-blur-sm"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* Intro Quote Section */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-10 text-[200px] font-serif text-[#d6ac8d]/10 leading-none select-none">
          "
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 leading-relaxed mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Mumbai's luxury real estate market represents the pinnacle of architectural excellence and sophisticated living. From sea-facing penthouses to heritage-inspired residences, we present the city's most coveted addresses.
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-[#d6ac8d]" />
            <p className="text-[#d6ac8d] text-sm tracking-widest uppercase">The Mumbai Luxury Homes Collection</p>
            <div className="w-12 h-px bg-[#d6ac8d]" />
          </div>
        </div>
        <div className="absolute bottom-10 right-10 text-[200px] font-serif text-[#d6ac8d]/10 leading-none select-none rotate-180">
          "
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative group overflow-hidden rounded-2xl">
              <img 
                src="/featured-project.jpg" 
                alt="Lodha World Towers"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content */}
            <div className="lg:pl-8">
              <p className="text-[#d6ac8d] text-sm tracking-[0.2em] uppercase mb-4">Featured Project</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Lodha World Towers
              </h2>
              <p className="text-gray-500 text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#d6ac8d]" />
                Lower Parel, Mumbai
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                A 117-storey architectural marvel offering panoramic views of the Arabian Sea and Mumbai skyline. Experience ultra-luxury living with world-class amenities and interiors crafted by Armani/Casa.
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-500">Starting From</p>
                  <p className="text-2xl font-bold text-[#d6ac8d]">₹11.31 Cr</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-sm text-gray-500">Configuration</p>
                  <p className="text-lg font-semibold text-gray-900">3 & 4 BHK</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-lg font-semibold text-gray-900">Ready to Move</p>
                </div>
              </div>
              <Button 
                onClick={() => setSelectedProject(projects[0])}
                className="bg-gray-900 hover:bg-[#d6ac8d] text-white px-8 py-6 rounded-full transition-all duration-300 group"
              >
                View Project Details
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="projects" ref={projectsRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[#d6ac8d] text-sm tracking-[0.2em] uppercase mb-4">Our Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Exclusive Projects
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Handpicked residences that define Mumbai's luxury skyline
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#d6ac8d] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Dialog key={project.id}>
                <DialogTrigger asChild>
                  <div
                    data-index={index}
                    className={`project-card group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                      visibleProjects.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#d6ac8d] text-white text-xs px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white/80 text-sm">{project.developer}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {project.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-400">{project.config}</p>
                          <p className="text-[#d6ac8d] font-semibold">{project.price}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-400 group-hover:text-[#d6ac8d] transition-colors">
                          View <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-3xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {project.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      className="w-full h-80 object-cover rounded-xl mb-6"
                    />
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-gray-500 mb-2 flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-[#d6ac8d]" />
                          {project.location}
                        </p>
                        <p className="text-gray-500 mb-4 flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-[#d6ac8d]" />
                          {project.developer}
                        </p>
                        <p className="text-gray-700 leading-relaxed">{project.description}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500">Configuration</p>
                          <p className="text-lg font-semibold">{project.config}</p>
                        </div>
                        <div className="bg-[#d6ac8d]/10 p-4 rounded-xl">
                          <p className="text-sm text-gray-500">Price Range</p>
                          <p className="text-lg font-semibold text-[#d6ac8d]">{project.price}</p>
                        </div>
                        <Button 
                          onClick={() => scrollToSection('contact')}
                          className="w-full bg-gray-900 hover:bg-[#d6ac8d] text-white py-6 rounded-xl"
                        >
                          Enquire Now
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-[#d6ac8d] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {counters.projects}+
              </p>
              <p className="text-white/70">Premium Projects</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-[#d6ac8d] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                ₹{counters.value}+
              </p>
              <p className="text-white/70">Cr Total Value</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-[#d6ac8d] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {counters.developers}+
              </p>
              <p className="text-white/70">Developers</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-6xl font-bold text-[#d6ac8d] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {counters.rera}%
              </p>
              <p className="text-white/70">RERA Approved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#d6ac8d] text-sm tracking-[0.2em] uppercase mb-4">Partners</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Trusted by India's Finest
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We partner with Mumbai's most prestigious builders to bring you exclusive access to premium residences
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {developers.map((developer, index) => (
              <div 
                key={developer}
                className="group bg-gray-50 hover:bg-[#d6ac8d] p-6 rounded-xl transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <Landmark className="w-6 h-6 text-[#d6ac8d] group-hover:text-white transition-colors" />
                  <span className="font-medium text-gray-700 group-hover:text-white transition-colors">
                    {developer}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#d6ac8d] text-sm tracking-[0.2em] uppercase mb-4">About Us</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Your Trusted Partner in Luxury Real Estate
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                With over a decade of experience in Mumbai's premium real estate market, we have established ourselves as the go-to consultants for discerning homebuyers and investors.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our curated portfolio features only the finest properties from India's most reputable developers, ensuring that every home we present meets the highest standards of quality, design, and location.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: CheckCircle2, text: "RERA Certified Projects" },
                  { icon: Star, text: "Premium Locations" },
                  { icon: Home, text: "Verified Properties" },
                  { icon: Phone, text: "End-to-End Support" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-[#d6ac8d]" />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/project-4.jpg" 
                  alt="Luxury Interior"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                />
                <img 
                  src="/project-8.jpg" 
                  alt="Luxury Building"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#d6ac8d] text-white p-6 rounded-2xl shadow-xl">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm opacity-80">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-24 bg-[#d6ac8d] relative overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Ready to Find Your Dream Home?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Let our experts guide you through Mumbai's finest properties. Schedule a private viewing today.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Call Us</p>
                    <p className="text-white text-xl font-semibold">07935418538</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email Us</p>
                    <p className="text-white text-xl font-semibold">rajesh@propinvest.in</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Visit Us</p>
                    <p className="text-white text-xl font-semibold">Worli, Mumbai - 400018</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Send Enquiry
              </h3>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Name</label>
                    <Input placeholder="Your Name" className="w-full" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Phone</label>
                    <Input placeholder="+91" className="w-full" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Email</label>
                  <Input type="email" placeholder="your@email.com" className="w-full" />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Budget</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Budget Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5-10">₹5 Cr - ₹10 Cr</SelectItem>
                      <SelectItem value="10-20">₹10 Cr - ₹20 Cr</SelectItem>
                      <SelectItem value="20-50">₹20 Cr - ₹50 Cr</SelectItem>
                      <SelectItem value="50+">₹50 Cr+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Message</label>
                  <Textarea placeholder="Tell us about your requirements..." className="w-full h-32" />
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  <Checkbox id="consent" className="mt-1" />
                  <label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                    As I submit the contact information, I give my consent to the Company to send me Marketing Communication in the form of SMS, RCS, AI Bot and IVR
                  </label>
                </div>
                <Button className="w-full bg-gray-900 hover:bg-[#d6ac8d] text-white py-6 rounded-xl transition-all duration-300">
                  Send Enquiry
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-8 h-8 text-[#d6ac8d]" />
                <span className="text-xl font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Mumbai Luxury Homes
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Curating Mumbai's finest luxury residences since 2010. Your trusted partner in premium real estate.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'Projects', 'About Us', 'Contact', 'Privacy Policy'].map((link) => (
                  <li key={link}>
                    <button 
                      onClick={() => {
                        if (link === 'Privacy Policy') {
                          setShowPrivacyPolicy(true)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        } else {
                          scrollToSection(link.toLowerCase().replace(' ', '-'))
                        }
                      }}
                      className="text-gray-400 hover:text-[#d6ac8d] transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Projects */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Projects</h4>
              <ul className="space-y-3">
                {['South Mumbai', 'Worli', 'Malabar Hill', 'Tardeo', 'Mahalaxmi'].map((loc) => (
                  <li key={loc}>
                    <button 
                      onClick={() => {
                        setActiveCategory(loc)
                        scrollToSection('projects')
                      }}
                      className="text-gray-400 hover:text-[#d6ac8d] transition-colors"
                    >
                      {loc}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-[#d6ac8d]" />
                  07935418538
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-[#d6ac8d]" />
                  rajesh@propinvest.in
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-[#d6ac8d] mt-1" />
                  Worli, Mumbai - 400018
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Mumbai Luxury Homes. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map((social) => (
                <button 
                  key={social}
                  className="w-10 h-10 bg-gray-800 hover:bg-[#d6ac8d] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <span className="text-xs">{social[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
