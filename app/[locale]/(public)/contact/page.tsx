"use client";
import ContactUs from "@/components/contact/contact-us";
import Hero from "@/components/contact/hero";
import Location from "@/components/contact/location";
import Footer from "@/components/footer/footer";
import Overlap from "@/components/overlap";

export default function ContactPage() {
  return (
    <main>
      <Overlap>
        <div className="pane">
          <Hero />
        </div>
        <div className="pane">
          <ContactUs />
        </div>
        <div className="pane">
          <Location />
          <Footer />
        </div>
      </Overlap>
    </main>
  );
}
