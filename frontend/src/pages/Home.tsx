import React from 'react'
import ChatSkeleton from '../components/ChatSkeleton'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <section>
        <h1 className="text-2xl font-semibold">Welcome to BabbelClone</h1>
        <p className="text-gray-600 mt-2">Day one: skeleton chat UI, routing, and basic layout.</p>
      </section>

      <section className="mt-8">
        <ChatSkeleton />
      </section>
    </div>
  )
}
