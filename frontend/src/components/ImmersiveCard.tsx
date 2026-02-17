import React, { useState, useEffect } from 'react'

interface CardData {
  id: string
  english: string
  spanish: string
  image: string
  sentence?: string
  situationImage?: string
  pronunciation: string
}


interface ImmersiveCardProps {
  card: CardData
  onNext: () => void
  onBack: () => void
  cardIndex: number
  totalCards: number
}

export default function ImmersiveCard({
  card,
  onNext,
  onBack,
  cardIndex,
  totalCards,
}: ImmersiveCardProps) {
  const [isTextRevealed, setIsTextRevealed] = useState(false)

  // Timers: speak word immediately, speak again after 20s, reveal text after 30s
  useEffect(() => {
    let playAgainTimer: ReturnType<typeof setTimeout> | null = null
    let revealTimer: ReturnType<typeof setTimeout> | null = null

    // Reset state for new card
    setIsTextRevealed(false)

    // speak immediately (prefer sentence when available)
    playAudio(card.sentence || card.spanish)

    // speak again after 20s
    playAgainTimer = setTimeout(() => {
      playAudio(card.sentence || card.spanish)
    }, 20000)

    // reveal after 30s (20s + 10s)
    revealTimer = setTimeout(() => {
      setIsTextRevealed(true)
    }, 30000)

    return () => {
      if (playAgainTimer) clearTimeout(playAgainTimer)
      if (revealTimer) clearTimeout(revealTimer)
    }
  }, [card.id])

  const playAudio = (text?: string) => {
    const toSpeak = text || card.spanish
    const utterance = new SpeechSynthesisUtterance(toSpeak)
    utterance.lang = 'es-ES'
    utterance.rate = 0.95 // comfortable pace
    speechSynthesis.speak(utterance)
  }

  const handleReplayAudio = () => {
    playAudio()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full max-w-2xl mx-auto px-4">
      {/* Progress indicator */}
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div
          className="bg-orange-500 h-1 rounded-full transition-all duration-300"
          style={{ width: `${((cardIndex + 1) / totalCards) * 100}%` }}
        ></div>
      </div>

      {/* Image section with rounded corners */}
      <div className="relative w-full h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <img
          src={card.image}
          alt={card.english}
          className="w-full h-full object-contain p-8"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/400x300?text=Image+Not+Available'
          }}
        />
      </div>

      {/* Optional situational image */}
      {card.situationImage && (
        <div className="w-full flex items-center justify-center mt-4">
          <img src={card.situationImage} alt="situation" className="w-40 h-24 object-cover rounded-lg shadow-sm" />
        </div>
      )}

      {/* Audio replay button - Babbel style */}
      <button
        onClick={handleReplayAudio}
        className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-md"
      >
        🔊 Hear Again
      </button>

      {/* Text reveal section */}
      <div className="text-center min-h-32 flex items-center justify-center w-full">
        {!isTextRevealed && (
          <div className="text-center">
            <p className="text-gray-500 text-lg font-medium mb-3">Listen and think...</p>
            <div className="flex gap-2 justify-center">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
        
        <div
          className={`transition-opacity duration-700 ${
            isTextRevealed ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-5xl font-bold text-orange-600 mb-2">{card.spanish}</p>
          <p className="text-gray-500 text-base mb-2">{card.pronunciation}</p>
          {card.sentence && (
            <p className="text-gray-700 text-lg mt-2 italic">{card.sentence}</p>
          )}
        </div>
      </div>

      {/* Navigation buttons - Babbel style */}
      <div className="flex gap-3 w-full justify-between">
        <button
          onClick={onBack}
          disabled={cardIndex === 0}
          className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={cardIndex === totalCards - 1}
          className="flex-1 px-4 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>

      {/* Card counter */}
      <p className="text-gray-500 text-sm font-medium">
        {cardIndex + 1} / {totalCards}
      </p>
    </div>
  )
}
