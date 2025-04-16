import React from 'react'
import GeneralLayout from '../../components/layouts/generallayout'
import InputField from '../../components/atoms/inputfield'
import { useState } from "react";
import ButtonPrimary from '../../components/atoms/buttonprimary'; 
import { Home, Wallet } from 'lucide-react';

const Profiling = () => {

  const [age, setAge] = React.useState('')
  const [balance, setBalance] = React.useState('')

  const formatRupiah = (value) => {
    if (!value) return ''; 
    return value
      .replace(/\D/g, '') 
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') 
      .replace(/(\..*)\./g, '$1'); 
  };

  const handleBalanceChange = (e) => {
    const formattedValue = formatRupiah(e.target.value);
    setBalance(formattedValue);
  };


  

  const handleAgeChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      setAge(value);
    }
  };

  return (
    <GeneralLayout>
      <div className="fixed inset-0 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg  w-[50%] max-w-4xl z-10 flex flex-col gap-4">
          
          {/* Logo + Heading */}
          <div className='flex flex-col items-center gap-2'>
            <img src="halalina.svg" alt="" className='h-[60px]' />
            <div className='text-center'>
              <h1 className='font-semibold text-xl sm:text-2xl'>Bantu kami kenal kamu lebih dekat yuk!</h1>
              <p className='text-[#434343] text-[10px] mt-1'>Yuk, isi profilmu untuk dapat rekomendasi investasi syariah yang sesuai!</p>
            </div>
          </div>

          {/* Form Input Section */}
          <div className="flex flex-col lg:flex-row  gap-8  mt-2 overflow-auto">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-1">Apa tipe pekerjaan mu?</label>
                <select className="border text-field border-gray-300 rounded-md px-2 py-1 w-full text-sm">
                  <option value="">Pilih Tipe Pekerjaan</option>
                  <option value="1">Pekerja</option>
                  <option value="2">Wirausaha</option>
                  <option value="3">Pelajar/Mahasiswa</option>
                  <option value="4">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium mb-1 mt-1">Berapa umur kamu?</label>
                <InputField 
                  type="text"
                  name="age"
                  placeholder="Umur"
                  value={age}
                  onChange={handleAgeChange}
                  className="text-field "
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-1 mt-1">Berapa jumlah saldo di tabungan kamu?</label>
                <InputField
                  type="text"
                  name="balance"
                  placeholder="Jumlah Saldo Tabungan"
                  value={balance}
                  onChange={handleBalanceChange}
                  className="text-field "
                />
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/2 flex flex-col  gap-3">
              <div>
                <label className="block text-[10px] font-medium text-gray-700 mb-1">Apa kamu sudah menikah?</label>
                <select className="text-field border border-gray-300 rounded-md px-2 py-1 w-full text-sm">
                  <option value="">Status</option>
                  <option value="1">Single</option>
                  <option value="2">Married</option>
                </select>
              </div>

              <div className='text-start'>
                <label className="block text-[10px] font-medium text-gray-700 mb-1 mt-1">Apakah kamu mempunya pinjaman?</label>
                <p className='text-[8px] text-gray-500 mb-1'>Abaikan jika tidak punya pinjaman</p>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <div className='flex gap-2 items-center'>
                      <Home size={16} />
                      <span className='text-sm'>KPR</span>
                    </div>
                    <input className="border-[1.5px] border-[#12B5A5]" type="checkbox" />
                  </li>

                  <li className="flex justify-between items-center">
                    <div className='flex gap-2 items-center'>
                      <Wallet size={16} />
                      <span className='text-sm'>Pinjaman</span>
                    </div>
                    <input className="border-[1.5px] border-[#12B5A5]" type="checkbox" />
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className='mt-3'>
            <ButtonPrimary>
              Temukan Rekomendasi Investasi Saya!
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </GeneralLayout>
  )
}

export default Profiling
