'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/AppIcon';

interface EMICalculatorProps {
  propertyPrice: number;
}

export default function EMICalculator({ propertyPrice }: EMICalculatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalPayment, totalInterest, loanAmount } = useMemo(() => {
    const dp = (downPaymentPct / 100) * propertyPrice;
    const loan = propertyPrice - dp;
    const monthlyRate = interestRate / 100 / 12;
    const months = tenure * 12;
    let emiVal = 0;
    if (monthlyRate > 0) {
      emiVal =
        (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    } else {
      emiVal = loan / months;
    }
    const total = emiVal * months;
    const interest = total - loan;
    return {
      emi: emiVal,
      totalPayment: total,
      totalInterest: interest,
      loanAmount: loan,
    };
  }, [propertyPrice, downPaymentPct, interestRate, tenure]);

  const fmt = (n: number) =>
    n >= 10000000
      ? `₹${(n / 10000000).toFixed(2)} Cr`
      : n >= 100000
        ? `₹${(n / 100000).toFixed(1)} L`
        : `₹${Math.round(n).toLocaleString('en-IN')}`;

  return (
    <div
      className="rounded-2xl border p-6"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: 'var(--accent-light)' }}
        >
          <Icon name="CalculatorIcon" size={20} style={{ color: 'var(--primary)' }} />
        </div>
        <div>
          <h2 className="font-display font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
            EMI Calculator
          </h2>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Estimate your monthly home loan payment
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Property Price (read-only display) */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Property Price
            </label>
            <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
              {fmt(propertyPrice)}
            </span>
          </div>
          <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
            <div
              className="h-full rounded-full"
              style={{ width: '100%', backgroundColor: 'var(--primary)' }}
            />
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Down Payment
            </label>
            <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
              {downPaymentPct}% ({fmt((downPaymentPct / 100) * propertyPrice)})
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            step={5}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full"
            aria-label="Down payment percentage"
          />
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <span>10%</span>
            <span>80%</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Interest Rate (p.a.)
            </label>
            <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
              {interestRate}%
            </span>
          </div>
          <input
            type="range"
            min={6}
            max={15}
            step={0.5}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full"
            aria-label="Interest rate"
          />
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <span>6%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Loan Tenure
            </label>
            <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
              {tenure} Years
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={30}
            step={5}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full"
            aria-label="Loan tenure in years"
          />
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <span>5 yrs</span>
            <span>30 yrs</span>
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl p-5 mt-2" style={{ backgroundColor: 'var(--primary)' }}>
          <p className="text-white/70 text-xs font-medium mb-1 uppercase tracking-wider">
            Monthly EMI
          </p>
          <p
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: '2rem', lineHeight: 1.1 }}
          >
            {fmt(emi)}/mo
          </p>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
            <div>
              <p className="text-white/60 text-xs mb-0.5">Loan Amount</p>
              <p className="text-white font-semibold text-sm">{fmt(loanAmount)}</p>
            </div>
            <div>
              <p className="text-white/60 text-xs mb-0.5">Total Interest</p>
              <p className="font-semibold text-sm" style={{ color: 'var(--accent)' }}>
                {fmt(totalInterest)}
              </p>
            </div>
            <div className="col-span-2 pt-3 border-t border-white/20">
              <p className="text-white/60 text-xs mb-0.5">Total Payment (Principal + Interest)</p>
              <p className="text-white font-semibold text-sm">{fmt(totalPayment)}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
          * EMI calculated for indicative purposes only. Actual rates may vary.
        </p>
      </div>
    </div>
  );
}
