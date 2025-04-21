
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const UBXCoinIcon = () => {
  return (
    <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-lg flex items-center justify-center select-none">
      {/* Outer rim */}
      <div className="absolute inset-0 rounded-full border-4 border-yellow-700 shadow-inner"></div>

      {/* Circuit pattern simplified */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 240"
        className="w-40 h-40 text-yellow-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        {/* Circuits & outer text outline (simplified) */}
        <circle cx="120" cy="120" r="110" stroke="goldenrod" strokeWidth="2"/>
        <path d="M70 40 L70 100 M170 40 L170 100 M70 140 L70 200 M170 140 L170 200" stroke="goldenrod" />
        <circle cx="120" cy="120" r="60" stroke="goldenrod" />
        <path d="M120 60 v120 M90 90 h60 M90 150 h60" stroke="goldenrod"/>
      </svg>

      {/* Center letter U shaped like Bitcoin B */}
      <div className="absolute text-yellow-100 text-7xl font-black drop-shadow-lg flex flex-col items-center leading-[0.75] pointer-events-none select-none">
        <span style={{ fontFamily: "'Courier New', Courier, monospace" }}>
          U
        </span>
        <span className="text-yellow-300" style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 900, fontSize: '3.5rem', lineHeight: 0.7 }}>
          BX
        </span>
      </div>
    </div>
  );
};

const UBXSection = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="rounded-xl p-8 border border-yellow-700 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200 shadow-lg flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="flex-1 max-w-lg text-yellow-900">
          <Badge variant="success" className="mb-4 text-yellow-600 border-yellow-600">
            WEB3 PAYMENTS
          </Badge>
          <h2 className="text-3xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-yellow-600 to-yellow-700 bg-clip-text text-transparent">
              UBX: The Token of Privacy
            </span>
          </h2>
          <p className="mb-8 text-yellow-900 text-lg leading-relaxed">
            Our Fantom-based UBX token powers secure, anonymous transactions across UberEscorts. Use UBX for payments, content access, and exclusive services.
          </p>
          <ul className="mb-8 space-y-4">
            <li className="flex items-start gap-3">
              <div className="inline-block rounded-full bg-yellow-600 p-1 shrink-0 mt-1 w-6 h-6 flex justify-center items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={3} 
                  stroke="yellow" 
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Zero Transaction Tracing</h4>
                <p className="text-yellow-800 text-sm">
                  Complete privacy for your financial interactions.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="inline-block rounded-full bg-yellow-600 p-1 shrink-0 mt-1 w-6 h-6 flex justify-center items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={3} 
                  stroke="yellow" 
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">No Wallet Installation</h4>
                <p className="text-yellow-800 text-sm">
                  Web3 technology simplified to regular credits.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="inline-block rounded-full bg-yellow-600 p-1 shrink-0 mt-1 w-6 h-6 flex justify-center items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={3} 
                  stroke="yellow" 
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Unified Payment System</h4>
                <p className="text-yellow-800 text-sm">
                  Use for appointments, tipping, content, and more.
                </p>
              </div>
            </li>
          </ul>
          <div className="flex flex-wrap gap-4">
            <Button
              className="gap-2 bg-yellow-500 text-yellow-900 hover:bg-yellow-600"
              asChild
            >
              <Link to="/wallet">Get Free Tokens</Link>
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-yellow-600 text-yellow-800 hover:bg-yellow-100"
              asChild
            >
              <Link to="/about/ubx">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center flex-1">
          <UBXCoinIcon />
        </div>
      </div>
    </section>
  );
};

export default UBXSection;

