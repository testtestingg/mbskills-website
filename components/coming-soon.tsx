import React from "react"

export default function ComingSoon(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6 text-center">
      <div className="max-w-xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Coming soon</h1>
        <div className="flex items-center justify-center gap-3">
          <a
            className="inline-flex items-center px-5 py-3 rounded-md bg-sky-600 text-white font-medium hover:bg-sky-700"
            href="/contact"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  )
}
