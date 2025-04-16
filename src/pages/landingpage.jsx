import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import LandingLayout from '../components/layouts/landinglayout'

const dummyCards = [
  {
    title: 'BSI Deposito',
    content:
      'Simpan dana dengan tenang dan aman dijamin bank. Imbal hasil kompetitif, bebas riba, dan dikelola sesuai prinsip syariah. Cocok untuk kamu yang ingin cuan berkah!',
  },
  {
    title: 'Reksadana Syariah',
    content:
      'Mulai investasi dengan tenang, hasil stabil, bebas riba, dan sesuai prinsip syariah. Dana bisa dicairkan cepat, cocok buat kamu yang cari cuan halal dan berkah!',
  },
  {
    title: 'Emas Syariah',
    content:
      'Investasi emas dengan mudah, sesuai syariah, dan nilai yang terus bertumbuh. Ideal untuk jangka panjang!',
  },
  {
    title: 'Saham Syariah',
    content:
      'Pilih saham dari perusahaan yang sesuai prinsip syariah. Lebih aman dan berkah!',
  },
]

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % dummyCards.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + dummyCards.length) % dummyCards.length
    )
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % dummyCards.length)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setOpen(true)
  }

  return (
    <LandingLayout>
      <div className='flex flex-col items-end justify-end'>
        {/* Top Right Circle with Logo */}
        <div className='w-45 h-45 bg-white rounded-bl-full flex justify-center'>
          <div className='flex flex-col ml-8 mt-3'>
            <img
              src='/assets/halalina.svg'
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
            <div className='flex gap-4'>
              {[0, 1].map((offset) => {
                const index = (activeIndex + offset) % dummyCards.length
                const card = dummyCards[index]
                return (
                  <div
                    key={index}
                    onClick={() => handleCardClick(card)}
                    className='cursor-pointer p-6 w-64 bg-[rgba(19,106,94,0.5)] text-white border border-[#136A5E] rounded-lg shadow hover:bg-[#136A5E] transition-colors'
                  >
                    <h3 className='text-xl font-bold mb-2'>{card.title}</h3>
                    <p className='text-sm'>{card.content.slice(0, 100)}...</p>
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
          <button className='bg-[#136A5E] hover:bg-emerald-800 text-white px-6 py-2 rounded-lg shadow w-fit self-end mt-[5rem] mr-[3rem]'>
            Daftar Sekarang
          </button>
        </div>
      </div>

      {/* Modal */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className='fixed inset-0 z-50 flex items-center justify-center'
      >
        <div className='fixed inset-0 bg-black opacity-30' aria-hidden='true' />
        <div className='relative bg-white p-6 max-w-md mx-auto rounded-lg shadow-xl'>
          <Dialog.Title className='text-xl font-bold mb-4'>
            {selectedCard?.title}
          </Dialog.Title>
          <Dialog.Description className='text-gray-700'>
            {selectedCard?.content}
          </Dialog.Description>
          <button
            onClick={() => setOpen(false)}
            className='mt-4 text-emerald-700 hover:underline'
          >
            Tutup
          </button>
        </div>
      </Dialog>
    </LandingLayout>
  )
}
