import React, { useState } from 'react'
import ImmersiveCard from '../components/ImmersiveCard'

interface CardData {
  id: string
  english: string
  spanish: string
  image: string
  sentence?: string
  situationImage?: string
  pronunciation: string
}

const LESSON_DATA: CardData[] = [
  {
    id: '1',
    english: 'Apple',
    spanish: 'Manzana',
    image: '/images/apple.svg',
    situationImage: '/images/apple.svg',
    sentence: 'Ella come una manzana en el parque.',
    pronunciation: 'mahn-SAH-nah',
  },
  {
    id: '2',
    english: 'Cat',
    spanish: 'Gato',
    image: '/images/cat.svg',
    situationImage: '/images/cat.svg',
    sentence: 'El gato duerme sobre el sofá.',
    pronunciation: 'GAH-toh',
  },
  {
    id: '3',
    english: 'Book',
    spanish: 'Libro',
    image: '/images/book.svg',
    sentence: 'Leo un libro interesante antes de dormir.',
    pronunciation: 'LEE-broh',
  },
  {
    id: '4',
    english: 'House',
    spanish: 'Casa',
    image: '/images/house.svg',
    sentence: 'Nuestra casa tiene un jardín pequeño.',
    pronunciation: 'KAH-sah',
  },
  {
    id: '5',
    english: 'Water',
    spanish: 'Agua',
    image: '/images/water.svg',
    sentence: 'Bebo agua después de correr.',
    pronunciation: 'AH-gwah',
  },
  {
    id: '6',
    english: 'Flower',
    spanish: 'Flor',
    image: '/images/flower.svg',
    sentence: 'La flor huele muy bien en el jardín.',
    pronunciation: 'FLOHR',
  },
  {
    id: '7',
    english: 'Sun',
    spanish: 'Sol',
    image: '/images/sun.svg',
    sentence: 'El sol brilla en un día de verano.',
    pronunciation: 'SOHL',
  },
  {
    id: '8',
    english: 'Tree',
    spanish: 'Árbol',
    image: '/images/tree.svg',
    sentence: 'Nos sentamos bajo el árbol cuando hace calor.',
    pronunciation: 'AHR-bohl',
  },
  {
    id: '9',
    english: 'Dog',
    spanish: 'Perro',
    image: '/images/dog.svg',
    sentence: 'El perro corre feliz por la playa.',
    pronunciation: 'PEH-rroh',
  },
  {
    id: '10',
    english: 'Bread',
    spanish: 'Pan',
    image: '/images/bread.svg',
    sentence: 'Compré pan fresco en la panadería.',
    pronunciation: 'PAHN',
  },
  {
    id: '11',
    english: 'Watch out',
    spanish: 'Cuidado',
    image: '/images/snowboard.jpg',
    situationImage: '/images/snowboard.jpg',
    sentence: '¡Cuidado, Eduardo!',
    pronunciation: 'koo-ee-DAH-doh',
  },
]

export default function DayTwo() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [lessonStarted, setLessonStarted] = useState(false)
  const [lessonCompleted, setLessonCompleted] = useState(false)

  const currentCard = LESSON_DATA[currentCardIndex]

  const handleStartLesson = () => {
    setLessonStarted(true)
  }

  const handleNext = () => {
    if (currentCardIndex === LESSON_DATA.length - 1) {
      setLessonCompleted(true)
    } else {
      setCurrentCardIndex(currentCardIndex + 1)
    }
  }

  const handleBack = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
    }
  }

  const handleRestartLesson = () => {
    setCurrentCardIndex(0)
    setLessonStarted(false)
    setLessonCompleted(false)
  }

  if (lessonCompleted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="text-center space-y-8">
          <div className="text-7xl">🎉</div>
          <h1 className="text-5xl font-bold text-orange-600">
            ¡Felicitaciones!
          </h1>
          <p className="text-xl text-gray-700 max-w-xl mx-auto">
            You've completed the lesson! You've learned 10 Spanish words through visual-first immersion.
          </p>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200">
            <p className="text-lg font-semibold text-orange-900 mb-6">
              Vocabulary Mastered:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {LESSON_DATA.map((card) => (
                <div key={card.id} className="bg-white p-4 rounded-xl shadow-sm">
                  <p className="font-bold text-orange-600 text-lg">{card.spanish}</p>
                  <p className="text-xs text-gray-500 mt-1">{card.english}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-lg">
            Ready for the next lesson?
          </p>

          <button
            onClick={handleRestartLesson}
            className="px-10 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors text-lg shadow-md"
          >
            Review Lesson Again
          </button>
        </div>
      </div>
    )
  }

  if (!lessonStarted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="text-center space-y-10">
          <h1 className="text-5xl font-bold text-gray-800">Vocabulary Lesson</h1>
          <p className="text-xl text-gray-600">Learning Spanish through Images</p>

          <div className="bg-gradient-to-br from-orange-50 to-white p-10 rounded-2xl border border-orange-200">
            <p className="text-lg text-gray-800 mb-8 font-medium">
              Here's how this lesson works:
            </p>

            <div className="space-y-6 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <span className="text-4xl">1️⃣</span>
                <div>
                  <p className="font-bold text-lg text-gray-800">See the Image</p>
                  <p className="text-gray-600 mt-1">
                    Look at a picture and hear the Spanish word
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-4xl">2️⃣</span>
                <div>
                  <p className="font-bold text-lg text-gray-800">Think (2 seconds)</p>
                  <p className="text-gray-600 mt-1">
                    Your brain connects the image and sound
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-4xl">3️⃣</span>
                <div>
                  <p className="font-bold text-lg text-gray-800">See the Word</p>
                  <p className="text-gray-600 mt-1">
                    The Spanish word appears to confirm your thinking
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-900 font-medium">
                💡 No Translations: You learn to think in Spanish, not translate from English
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            You'll learn 10 common Spanish words. Take your time and let your brain make the visual associations!
          </p>

          <button
            onClick={handleStartLesson}
            className="px-12 py-4 bg-orange-500 text-white text-lg font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
          >
            Start Learning →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <ImmersiveCard
          card={currentCard}
          onNext={handleNext}
          onBack={handleBack}
          cardIndex={currentCardIndex}
          totalCards={LESSON_DATA.length}
        />
      </div>
    </div>
  )
}
