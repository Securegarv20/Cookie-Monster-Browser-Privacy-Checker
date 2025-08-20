"use client";

import Image from 'next/image';

export function CookieMonsterHeader() {
  return (
    <div className="text-center mb-8">
      <div className="relative">
        {/* Cookie Monster Image */}
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <Image
              src="https://res.cloudinary.com/del3zgpaw/image/upload/v1755531852/Cookie_pnteti.png"
              alt="Cookie Monster"
              width={150}
              height={150}
              className="rounded-full border-4 border-blue-300 shadow-lg"
              priority
            />
            <div className="absolute -top-2 -right-2 text-3xl animate-pulse">🍪</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce">✨</div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">
          <span className="font-comic-sans">Cookie Monster</span>
          <br />
          <span className="text-2xl md:text-3xl text-blue-600">Privacy Checker</span>
        </h1>
        
        <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-4 max-w-2xl mx-auto">
          <p className="text-lg text-blue-700 font-comic-sans">
            "ME WANT TO EAT ALL COOKIES! But first, let Cookie Monster teach you about cookie safety! 🍪📚"
          </p>
        </div>
      </div>
    </div>
  );
}