import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, Bell, Users, Baby } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 pb-20 px-6 bg-gradient-to-b from-pink-50/50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 text-sm font-bold tracking-wide uppercase">
              <Heart size={16} fill="currentColor" />
              Next-Gen Maternal Care
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-pink-600 leading-[0.9]">
              mumsy.ai
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Empowering mothers and health workers with AI-driven insights for a safer pregnancy and healthier childhood.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={() => {
                  console.log("Get Started clicked");
                  onStart();
                }}
                className="bg-pink-600 hover:bg-pink-700 text-white h-16 px-10 text-xl rounded-2xl shadow-xl shadow-pink-200 transition-all hover:scale-105 active:scale-95"
              >
                Get Started Now
              </Button>
              <Button 
                variant="outline" 
                onClick={onStart}
                className="h-16 px-10 text-xl rounded-2xl border-2 border-pink-100 text-pink-600 hover:bg-pink-50 transition-all"
              >
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-4 justify-center lg:justify-start pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-pink-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/user${i}/40/40`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-medium">Joined by 2,000+ mothers this month</p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-10 bg-pink-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="relative bg-white rounded-[3rem] p-4 border border-pink-100 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-white opacity-50"></div>
              <div className="relative z-10 w-full h-full p-8">
                 <img 
                  src="https://raw.githubusercontent.com/storyset/illustrations/master/illustrations/pana/Motherhood-pana.svg" 
                  alt="Motherhood Illustration" 
                  className="w-full h-full object-contain drop-shadow-xl"
                  referrerPolicy="no-referrer"
                 />
              </div>
              <div className="absolute bottom-10 left-10 right-10 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-pink-50 transform -rotate-2">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white">
                    <Heart fill="currentColor" size={24} />
                  </div>
                  <div>
                    <p className="text-pink-600 font-bold">AI Risk Analysis</p>
                    <p className="text-xs text-gray-500">Monitoring vitals in real-time</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-pink-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why choose mumsy.ai?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Designed to be accessible for everyone, ensuring no mother is left behind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="text-pink-500" size={32} />,
                image: "https://raw.githubusercontent.com/storyset/illustrations/master/illustrations/pana/Motherhood-pana.svg",
                title: "Risk Prediction",
                desc: "AI-powered alerts for preeclampsia and anemia based on your vitals."
              },
              {
                icon: <Baby className="text-blue-500" size={32} />,
                image: "https://raw.githubusercontent.com/storyset/illustrations/master/illustrations/pana/Baby-pana.svg",
                title: "Child Growth",
                desc: "Track your baby's weight, height, and health with AI-driven growth insights."
              },
              {
                icon: <Users className="text-pink-500" size={32} />,
                image: "https://raw.githubusercontent.com/storyset/illustrations/master/illustrations/pana/Community-pana.svg",
                title: "CHW Support",
                desc: "Simplified interface for Community Health Workers to assist in data entry."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-pink-100 space-y-6 flex flex-col"
              >
                <div className="w-full aspect-video bg-pink-50/30 rounded-2xl overflow-hidden flex items-center justify-center p-4">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <img 
              src="https://raw.githubusercontent.com/storyset/illustrations/master/illustrations/pana/Medical-care-pana.svg" 
              alt="Health Professional" 
              className="w-full max-w-md mx-auto"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 order-1 lg:order-2"
          >
            <h2 className="text-4xl font-bold text-gray-900">Simple for you, smart for your care.</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our platform uses advanced AI to monitor your vitals in real-time. 
              Whether you're at home or visiting a clinic, your data is securely 
              analyzed to ensure you and your baby are safe.
            </p>
            <ul className="space-y-4">
              {[
                "Easy data entry for all literacy levels",
                "Instant AI risk assessment",
                "Direct connection to your health provider",
                "Community support at your fingertips"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                    <Heart size={12} fill="currentColor" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-pink-100 text-center text-gray-400 text-sm">
        <p>© 2026 mumsy.ai - Empowering Maternal Health Everywhere</p>
      </footer>
    </div>
  );
}
