import Image from 'next/image'
import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { features } from '@/constants/index';

export const HowItWork = () => {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="transition-all duration-1000">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How it  
              <span className="bg-[#FF9F1C] bg-clip-text text-transparent"> work</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Find e-commerce brands that are scaling fast and need fulfillment support. Ideal for 3PLs looking to reach operations managers, founders, and logistics leads.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`group relative border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white group-hover:from-purple-50/30 group-hover:to-blue-50/30 transition-all duration-500"></div>
              <CardContent className="relative p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#FF9F1C] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
