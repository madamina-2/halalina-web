  import React from 'react'
  import ButtonPrimary from '../atoms/buttonprimary'
  import InputField from '../atoms/inputfield';
  import { useState } from "react";
  import { Link } from 'react-router-dom';

  const FormRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');

    return (
    
      <div className="flex justify-center lg:justify-end h-screen w-screen">
        <div className="w-full lg:w-2/5 min-h-screen flex items-center bg-[#f9f6f3]  px-6 sm:px-10 sm: ">
          <form className="w-full py-8 flex flex-col gap-6 max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <img
                src="halalina.png"
                className="w-[200px] sm:w-[240px] md:w-[275px] h-auto"
                alt="Logo Halalina"
              />
            </div>

            <div className="flex flex-col gap-4">
              <InputField
                    type="text"
                    name="fullname"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

              <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <InputField
                  type="password"
                  name="confirmPassword"
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <InputField
                  type="tel"
                  name="phone"
                  placeholder="Nomor Telepon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
            </div>

            <div className='flex gap-2'>
            <input className="border-[1.5px] border-[#E5E7EA]"  type="checkbox"  />
            <p className='text-[10px]'>Saya telah memahami dan menyetujui segala persyaratan dan kondisi</p></div>


            <div className="flex flex-col gap-4 mt-6">
              <ButtonPrimary>
                Dafar
              </ButtonPrimary>
              <p className="text-center text-sm">
                sudah mempunyai akun?
                <Link to="/login" className="text-[#136A5E] underline ml-1">
                Masuk
              </Link>
              </p>  
            </div>
          </form>
        </div>
      </div>
    
  );
  };

  export default FormRegister