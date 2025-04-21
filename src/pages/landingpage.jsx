import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import LandingLayout from '../components/layouts/landinglayout'
import Modal from '../components/organisms/modal'
import { productData } from '../utils/products'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % productData.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + productData.length) % productData.length
    )
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % productData.length)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setOpen(true)
  }

  const handleToRegister = () => {
    navigate('/register')
  }

  return (
    <LandingLayout>
      <div className='flex flex-col items-end justify-end'>
        {/* Top Right Circle with Logo */}
        <div className='w-45 h-45 bg-white rounded-bl-full flex justify-center'>
          <div className='flex flex-col ml-8 mt-3'>
            <img
              src='/halalina.svg'
              alt='Halalina Logo'
              className='w-30 h-auto'
            />
          </div>
        </div>

        {/* Carousel Section */}
        <div className='flex flex-col mt-[5rem] mr-5'>
          <p className='text-white text-md font-bold mb-6 p-2 bg-[#136A5EB2] rounded-lg w-fit self-center'>
            Produk Investasi Kami
          </p>
          <div className='relative flex gap-4'>
            <button
              onClick={handlePrev}
              className='text-white hover:text-yellow-300'
            >
              <ChevronLeft size={32} />
            </button>
            <div className='flex max-sm:flex-col  gap-4'>
              {[0, 1].map((offset) => {
                const index = (activeIndex + offset) % productData.length
                const card = productData[index]
                return (
                  <div
                    key={index}
                    onClick={() => handleCardClick(card)}
                    className='cursor-pointer p-6 w-64 bg-[rgba(19,106,94,0.5)] text-white border border-[#136A5E] rounded-lg shadow hover:bg-[#136A5E] transition-colors'
                  >
                    <h3 className='text-xl font-bold mb-2 text-center'>
                      {card.title}
                    </h3>
                    <p className='text-sm'>{card.caption.slice(0, 100)}...</p>
                  </div>
                )
              })}
            </div>
            <button
              onClick={handleNext}
              className='text-white hover:text-yellow-300'
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* CTA Button */}
          <button
            className='bg-[#136A5E] hover:bg-emerald-800 text-white px-6 py-2 rounded-lg shadow w-fit self-end mt-[5rem] mr-[3rem]'
            onClick={() => handleToRegister()}
          >
            Mulai Sekarang
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        buttonText='Oke'
        open={open}
        data={selectedCard}
        bgImage={selectedCard?.image || null}
        onClose={() => setOpen(false)}
      />
    </LandingLayout>
  )
}
