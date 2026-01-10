import Benefit from "@/components/expertise/benefit";
import Goal from "@/components/expertise/goal";
import Hero from "@/components/expertise/hero";
import Process from "@/components/expertise/process";
import Footer from "@/components/footer/footer";
import Overlap from "@/components/overlap";

export default function ExpertisePage() {
  return (
    <main>
      <Overlap>
        <div className="pane">
          <Hero />
        </div>
        <div className="pane">
          <Goal />
        </div>
        <div className="pane">
          <Benefit />
        </div>
        <div className="pane">
          <Process />
          <Footer />
        </div>
      </Overlap>
    </main>
  );
}
