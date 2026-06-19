"use client";

import { useState } from "react";
import { ProfitCalculator } from "@/components/ProfitCalculator";

export function HomeActions() {
  const [calculatorOpen, setCalculatorOpen] = useState(false);

  return (
    <>
      <button className="btn btn-primary" onClick={() => (window.location.href = "/ai-audit")} type="button">
        Get Your Free AI Audit
      </button>
      <button className="btn btn-light" onClick={() => setCalculatorOpen(true)} type="button">
        Calculate AI Profit Potential
      </button>
      <ProfitCalculator open={calculatorOpen} onClose={() => setCalculatorOpen(false)} />
    </>
  );
}
