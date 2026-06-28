import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { Link } from "wouter";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 bg-white shadow-md z-50">
        <div className="flex justify-between items-center px-4 md:px-8 lg:px-16 h-16">
          <div className="text-lg font-bold">Untitled Business</div>
          <nav className="hidden md:flex space-x-4">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white rounded-md h-10 px-6">
                Start Your Free Trial
              </button>
            </SignInButton>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <Link href="/dashboard" className="block px-4 py-2 text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
            <SignInButton mode="modal">
              <button className="block w-full text-left px-4 py-2 bg-blue-600 text-white">
                Start Your Free Trial
              </button>
            </SignInButton>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <section className="px-4 md:px-8 lg:px-16 py-16 bg-gray-100 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-5xl font-bold">
              Unlock Your Business Potential with Untitled Business
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Streamline your operations and enhance customer engagement with our innovative SaaS solutions.
            </p>
            <SignInButton mode="modal">
              <button className="mt-8 bg-blue-600 text-white rounded-md h-10 px-6">
                Start Your Free Trial Today!
              </button>
            </SignInButton>
          </motion.div>
        </section>

        <section className="px-4 md:px-8 lg:px-16 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
              Transform Your Ideas into Reality with Untitled Business
            </h2>
            <p className="text-center text-lg md:text-xl">
              Innovative Solutions Tailored to Your Unique Challenges
            </p>
          </motion.div>
        </section>

        <section className="px-4 md:px-8 lg:px-16 py-16 bg-gray-50">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Effortless Customer Acquisition</h3>
                <p>
                  Harness powerful tools designed to attract and convert leads effortlessly. With our intuitive platform, you'll turn prospects into loyal customers in no time.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Boost Customer Retention</h3>
                <p>
                  Our analytics-driven insights help you understand customer behavior, enabling you to tailor your offerings and keep your clients coming back for more. Say goodbye to churn!
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Flexible Pricing Models</h3>
                <p>
                  We offer customizable pricing plans that fit your business needs, ensuring you only pay for what you use. Maximize your ROI while enjoying full access to our premium features.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="px-4 md:px-8 lg:px-16 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
              Join Thousands of Satisfied Customers
            </h2>
            <p className="text-center text-lg md:text-xl">
              “A game-changer for our operations!” - Happy Customer
            </p>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Untitled Business. All rights reserved.</p>
      </footer>
    </div>
  );
}