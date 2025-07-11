import { SignIn } from '@clerk/nextjs';
import React from 'react'



function page() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Oneclickdrive Admin Dashboard
              </h2>
              <SignIn
                  routing="path"
                  path="/sign-in"
                  signUpUrl="/sign-up"
                  fallbackRedirectUrl="/dashboard"
                  appearance={{
                      elements: {
                          formButtonPrimary:
                              "bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded",
                          card: "bg-transparent shadow-none",
                          headerTitle: "hidden",
                          headerSubtitle: "hidden",
                      },
                  }}
              />
          </div>
      </div>
  );
}

export default page