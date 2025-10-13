import Image from 'next/image'
import React from 'react'

export const HowItWork = () => {
  return (
    <div className="py-16 sm:py-24 lg:py-20 bg-muted/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <h2 className="text-2xl sm:text-5xl lg:text-4xl font-bold text-foreground tracking-tight">
                    How It Work
                  </h2>
                  <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 text-muted-foreground">
                    <p className="text-sm sm:text-base leading-relaxed">
                      Lorem ipsum dolor sit amet consectetur. Sem ut neque risus convallis at. Nibh euismod pellentesque aliquet natoque fringilla. at. Nibh euismod pellentesque aliquet natoque fringilla. at. Nibh euismod pellentesque aliquet natoque fringilla. at. Nibh euismod pellentesque aliquet natoque fringilla. 
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed">
                      Lorem ipsum dolor sit amet consectetur. Sem ut neque risus convallis at. Nibh euismod pellentesque aliquet
                    </p>
                  </div>
                </div>
                <div className="order-1 lg:order-2 bg-none flex flex-col sm:flex-row rounded-xl p-4 sm:p-8 gap-4 sm:gap-7">
                  <div className='overflow-hidden rounded-xl w-full sm:w-[70%] h-48 sm:h-80 lg:h-96 mx-auto bg-slate-400 relative'>
                    <Image
                      src="/images/merc-car.jpg"
                      alt="How it works main"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className='overflow-hidden flex flex-col w-full sm:w-[80%] h-52 sm:h-80 lg:h-96 mx-auto gap-4 sm:gap-7'>
                    <div className='h-[30%] bg-slate-900 rounded-xl flex flex-col justify-center text-center relative'>
                      <h1 className='text-5xl text-white font-bold'>+10 Years</h1>
                      <p className='text-2xl text-white'>Experience</p>
                    </div>
                    <div className='h-[70%] bg-slate-900 rounded-xl relative'>
                      <Image
                        src="/images/por-car.jpg"
                        alt="Step 2"
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}
