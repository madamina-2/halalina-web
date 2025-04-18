export const tnc_data = {
  title: 'Syarat dan Kondisi',
  content: `Dengan mendaftar, Anda menyetujui hal-hal berikut:
    Layanan: Website ini memberikan informasi dan rekomendasi investasi sesuai prinsip syariah (bebas riba, gharar, dan bisnis haram).
    Pengguna: Berusia minimal 17 tahun, memberikan data yang benar, dan menggunakan layanan sesuai hukum dan etika Islam.
    Privasi: Data Anda aman dan tidak dibagikan ke pihak ketiga tanpa izin.
    Tanggung Jawab: Kami tidak menjamin hasil investasi dan tidak bertanggung jawab atas kerugian yang mungkin terjadi.
    Perubahan: Syarat dapat berubah sewaktu-waktu dan akan diinformasikan kepada pengguna.
    Dengan melanjutkan pendaftaran, Anda menyatakan setuju dengan ketentuan di atas.`,
}

export const convertInvestmentData = (rawData) => {
  const labelMap = {
    'Deposito Syariah': { name: 'BSI Deposito', color: '#FFA726' },
    'RDPU Syariah': {
      name: 'Reksadana Pasar Uang Syariah',
      color: '#00ACC1',
    },
    SBSN: { name: 'SBSN', color: '#26A69A' },
    'Tabungan Emas': { name: 'Tabungan Emas', color: '#FFEB3B' },
  }

  return Object.entries(rawData).map(([key, value]) => ({
    name: labelMap[key]?.name || key,
    value,
    color: labelMap[key]?.color || '#CCCCCC',
  }))
}

export const formatRupiahInput = (value) => {
  if (!value) return ''

  // Remove non-digit characters
  const numeric = value.replace(/\D/g, '')

  // Format with dots every 3 digits from the end
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export const handleChangeOnlyDigit = (value) => {
  // Only keep digits
  const raw = value.replace(/\D/g, '')
  return raw
}
