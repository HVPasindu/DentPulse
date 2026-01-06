import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  DollarSign, 
  BarChart3, 
  Clock, 
  Shield, 
  Award,
  Building2,
  TrendingUp,
  Briefcase,
  UserCheck,
  Calendar,
  PieChart
} from "lucide-react";

const MarqueeItem = ({ items, from, to, isIcon = false }) => {
  return (
    <div className="flex overflow-hidden">
      {console.log("Rendering MarqueeItem Component with items:")}
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0"
      >
        {items.map((item, index) => {
          if (isIcon) {
            const IconComponent = item.icon;
            return (
              <div
                className="flex items-center justify-center h-16 pr-16 opacity-20 hover:opacity-40 transition-opacity duration-300"
                key={index}
              >
                <IconComponent className="w-12 h-12 text-primary-400" />
              </div>
            );
          }
          
          return (
            <div
              className={`flex items-center justify-center h-16 pr-16 whitespace-nowrap opacity-25 hover:opacity-50 transition-opacity duration-300 ${item.style}`}
              key={index}
            >
              {item.text}
            </div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0"
      >
        {items.map((item, index) => {
          if (isIcon) {
            const IconComponent = item.icon;
            return (
              <div
                className="flex items-center justify-center h-16 pr-16 opacity-20 hover:opacity-40 transition-opacity duration-300"
                key={index}
              >
                <IconComponent className="w-12 h-12 text-primary-400" />
              </div>
            );
          }
          
          return (
            <div
              className={`flex items-center justify-center h-16 pr-16 whitespace-nowrap opacity-25 hover:opacity-50 transition-opacity duration-300 ${item.style}`}
              key={index}
            >
              {item.text}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

const Marquee = () => {
  const upperMarquee = [
    { text: "EMPLOYEE MANAGEMENT", style: "text-4xl md:text-6xl font-bold text-primary-500 uppercase tracking-wider" },
    { text: "CoreHive", style: "text-5xl md:text-7xl font-light text-secondary-500 italic" },
    { text: "PAYROLL AUTOMATION", style: "text-4xl md:text-6xl font-semibold text-green-500 uppercase" },
    { text: "SRI LANKA", style: "text-4xl md:text-5xl font-extrabold text-orange-500 uppercase tracking-tight" },
    { text: "ATTENDANCE TRACKING", style: "text-4xl md:text-6xl font-medium text-blue-500 uppercase" },
    { text: "HR Solutions", style: "text-5xl md:text-7xl font-thin text-purple-500 capitalize" },
    { text: "LEAVE MANAGEMENT", style: "text-4xl md:text-6xl font-semibold text-teal-500 uppercase" },
    { text: "SME Focused", style: "text-4xl md:text-6xl font-bold text-indigo-500 capitalize tracking-wide" },
    { text: "PERFORMANCE REPORTS", style: "text-4xl md:text-6xl font-medium text-red-500 uppercase" },
    { text: "Digital HR", style: "text-5xl md:text-7xl font-extralight text-gray-600 capitalize" },
    { text: "CLOUD PLATFORM", style: "text-4xl md:text-6xl font-bold text-cyan-500 uppercase" }
  ];

  const lowerMarquee = [
    { text: "Workforce Analytics", style: "text-3xl md:text-5xl font-medium text-pink-500 capitalize" },
    { text: "TAX COMPLIANCE", style: "text-4xl md:text-6xl font-bold text-yellow-600 uppercase" },
    { text: "Employee Portal", style: "text-4xl md:text-6xl font-light text-emerald-500 capitalize" },
    { text: "DIGITAL PAYSLIPS", style: "text-4xl md:text-6xl font-semibold text-violet-500 uppercase" },
    { text: "HR Dashboard", style: "text-4xl md:text-5xl font-extrabold text-slate-600 capitalize" },
    { text: "AUTOMATED WORKFLOWS", style: "text-3xl md:text-5xl font-medium text-lime-500 uppercase tracking-wide" },
    { text: "Mobile Access", style: "text-4xl md:text-6xl font-thin text-rose-500 capitalize" },
    { text: "SECURE DATA", style: "text-4xl md:text-6xl font-bold text-amber-600 uppercase" },
    { text: "Real-time Updates", style: "text-3xl md:text-5xl font-semibold text-sky-500 capitalize" },
    { text: "INTEGRATION READY", style: "text-4xl md:text-6xl font-medium text-stone-600 uppercase" },
    { text: "Business Growth", style: "text-4xl md:text-6xl font-light text-neutral-600 capitalize" }
  ];

  const iconMarquee = [
    { icon: Users },
    { icon: DollarSign },
    { icon: BarChart3 },
    { icon: Clock },
    { icon: Shield },
    { icon: Award },
    { icon: Building2 },
    { icon: TrendingUp },
    { icon: Briefcase },
    { icon: UserCheck },
    { icon: Calendar },
    { icon: PieChart }
  ];

  return (
    <div className="container mx-auto overflow-hidden py-8 bg-gradient-to-r from-background-primary via-background-white to-background-primary">
    
      {/* Upper text marquee */}
      <MarqueeItem items={upperMarquee} from={0} to={"-100%"} />
      
      {/* Icon marquee */}
      <MarqueeItem items={iconMarquee} from={0} to={"-100%"} isIcon={true} />
      
      {/* Lower text marquee */}
      <MarqueeItem items={lowerMarquee} from={"-100%"} to={0} />
    </div>
  );
};

export default Marquee;
