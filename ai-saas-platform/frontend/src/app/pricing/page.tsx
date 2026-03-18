'use client'

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
const plans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for testing',
    features: ['3 generations/month', 'Basic templates', 'Email support'],
    buttonText: 'Get started free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19/month',
    description: 'Most popular',
    features: ['Unlimited generations', 'Premium templates', 'Priority support', 'Download PDFs'],
    buttonText: 'Choose Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99/month',
    description: 'For teams',
    features: ['Unlimited everything', 'Custom templates', 'API access', 'White-label', 'Dedicated support'],
    buttonText: 'Contact sales',
    popular: false,
  },
];

export default function Pricing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works for you. Cancel anytime.
          </p>
          {user && (
            <p className="text-green-600 font-semibold mt-4">
              You are on the Starter plan. Upgrade anytime!
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all border-2 bg-white ${
                plan.popular
                  ? 'border-primary ring-4 ring-primary/20 scale-105'
                  : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-2xl font-bold text-sm">
                  Most popular
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-3">{plan.name}</h3>
                <div className="text-4xl font-bold text-primary mb-2">{plan.price}</div>
                <p className="text-lg text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-900">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-200">
                <Link
                  href={plan.buttonText === 'Get started free' ? '/register' : '#'}
                  className={`block w-full text-center py-4 px-6 font-bold rounded-2xl text-lg transition-all shadow-xl ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-blue-700 hover:shadow-2xl'
                      : 'border-2 border-gray-300 text-gray-900 hover:border-gray-400'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <PaymentDetails />
        <div className="text-center mt-24">
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Not sure? <span className="font-semibold text-primary">Start with free plan</span> and upgrade anytime.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-bold text-lg rounded-2xl hover:bg-blue-700 hover:shadow-2xl transition-all shadow-xl"
          >
            Go to Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}

import PaymentDetails from '@/components/PaymentDetails';
