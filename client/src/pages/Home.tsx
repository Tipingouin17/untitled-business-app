import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Repeat, DollarSign } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-xl font-bold">Untitled Business</div>
          <div className="flex space-x-4">
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
            <SignInButton mode="modal">
              <Button>Start Your Free Trial</Button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gray-100 py-20">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4">Unlock Your Business Potential with Untitled Business</h1>
          <p className="text-lg mb-8">Streamline your operations and enhance customer engagement with our innovative SaaS solutions.</p>
          <SignInButton mode="modal">
            <Button size="lg">Start Your Free Trial Today!</Button>
          </SignInButton>
        </motion.div>
      </header>

      {/* Problem/Solution Section */}
      <section className="py-20">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-4">The Problem</h2>
          <p className="mb-8">Businesses struggle with inefficient operations and poor customer engagement.</p>
          <h2 className="text-3xl font-bold mb-4">Our Solution</h2>
          <p>Our SaaS platform provides the tools you need to streamline processes and boost customer satisfaction.</p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <motion.div
          className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <UserPlus className="w-8 h-8 mb-2" />
              <CardTitle>Effortless Customer Acquisition</CardTitle>
            </CardHeader>
            <CardContent>
              Harness powerful tools designed to attract and convert leads effortlessly. With our intuitive platform, you'll turn prospects into loyal customers in no time.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Repeat className="w-8 h-8 mb-2" />
              <CardTitle>Boost Customer Retention</CardTitle>
            </CardHeader>
            <CardContent>
              Our analytics-driven insights help you understand customer behavior, enabling you to tailor your offerings and keep your clients coming back for more. Say goodbye to churn!
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <DollarSign className="w-8 h-8 mb-2" />
              <CardTitle>Flexible Pricing Models</CardTitle>
            </CardHeader>
            <CardContent>
              We offer customizable pricing plans that fit your business needs, ensuring you only pay for what you use. Maximize your ROI while enjoying full access to our premium features.
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-4">Join Thousands of Satisfied Customers</h2>
          <p className="mb-8">“A game-changer for our operations!” - Happy Customer</p>
          <SignInButton mode="modal">
            <Button size="lg">Start Your Free Trial Today!</Button>
          </SignInButton>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Untitled Business. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}