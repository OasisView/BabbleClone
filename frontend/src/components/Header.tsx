import React from 'react'

export default function Header() {
  return (
    <header className="flex items-center gap-3 px-4 py-2 border-b border-gray-200">
      <div className="font-bold text-lg">BabbelClone</div>
      <nav className="ml-auto">
        <a href="/" className="mr-3 hover:underline">Home</a>
      </nav>
    </header>
  )
}
