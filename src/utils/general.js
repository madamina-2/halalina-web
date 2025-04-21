export const tnc_data = {
  title: 'Syarat dan Kondisi',
  content: `<h1><b>Kebijakan Privasi Data</b></h1>
  <p>
    Kami menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi data pribadi Anda saat menggunakan aplikasi kami, yang bertujuan memberikan rekomendasi investasi sesuai dengan profil pengguna.
  </p>

  <p><strong>1. Informasi yang Kami Kumpulkan</strong></p>
  <p>
    Kami mengumpulkan data pribadi yang Anda berikan secara sukarela saat mendaftar atau menggunakan aplikasi kami, yaitu:
  </p>
  <ul>
    <li>• Nama lengkap</li>
    <li>• Nomor HP</li>
    <li>• Alamat email</li>
    <li>• Informasi keuangan: kepemilikan utang dan saldo rekening</li>
    <li>• Umur</li>
  </ul>
  <p>Data ini dikumpulkan dengan tujuan untuk:</p>
  <ul>
    <li>• Membentuk profil risiko investasi Anda</li>
    <li>• Memberikan rekomendasi produk investasi yang sesuai dengan profil tersebut</li>
    <li>• Memastikan validitas dan keamanan dalam proses login dan komunikasi</li>
  </ul>

  <p><strong>2. Dasar Pemrosesan Data</strong></p>
  <p>
    Data pribadi Anda diproses berdasarkan persetujuan eksplisit yang Anda berikan saat menggunakan aplikasi kami. Anda dapat sewaktu-waktu menarik kembali persetujuan tersebut sebagaimana dijelaskan dalam bagian "Hak Anda".
  </p>

  <p><strong>3. Cara Kami Menggunakan Data Anda</strong></p>
  <p>Data yang dikumpulkan akan digunakan untuk:</p>
  <ul>
    <li>• Memberikan data input ke model machine learning untuk memberikan rekomendasi investasi yang sesuai</li>
    <li>• Melakukan segmentasi dan analisis untuk meningkatkan performa sistem</li>
    <li>• Mengirimkan pembaruan, notifikasi, atau informasi terkait fitur aplikasi (dengan persetujuan Anda)</li>
  </ul>
  <p>Kami tidak menggunakan data Anda untuk keperluan lain tanpa izin eksplisit.</p>

  <p><strong>4. Penyimpanan dan Keamanan Data</strong></p>
  <p>
    Data pribadi Anda akan disimpan secara terenkripsi di server yang telah dilindungi oleh sistem keamanan modern. Kami menerapkan prinsip data minimization dan least privilege dalam sistem kami.
  </p>
  <p>Kami melakukan:</p>
  <ul>
    <li>• Enkripsi data dalam penyimpanan dan saat transmisi</li>
    <li>• Pembatasan akses hanya kepada pihak yang berwenang</li>
    <li>• Monitoring dan audit berkala terhadap sistem keamanan</li>
  </ul>
  <p>Data akan disimpan selama akun Anda aktif atau selama diperlukan untuk tujuan pemrosesan.</p>

  <p><strong>5. Pengungkapan kepada Pihak Ketiga</strong></p>
  <p>
    Kami tidak menjual atau membagikan data pribadi Anda kepada pihak ketiga, kecuali:
  </p>
  <ul>
    <li>• Diwajibkan oleh hukum atau perintah pengadilan</li>
    <li>• Dengan persetujuan eksplisit dari Anda</li>
  </ul>

  <p><strong>6. Hak Anda atas Data Pribadi</strong></p>
  <p>Sebagai pemilik data, Anda memiliki hak sebagai berikut:</p>
  <ul>
    <li>• Hak untuk mengakses data pribadi Anda yang kami simpan</li>
    <li>• Hak untuk memperbaiki data yang tidak akurat atau sudah tidak berlaku</li>
    <li>• Hak untuk menarik persetujuan atas pemrosesan data Anda</li>
    <li>• Hak untuk menghapus data pribadi ("right to be forgotten")</li>
    <li>• Hak untuk membatasi pemrosesan atau menolak profil otomatis</li>
  </ul>
  <p>
    Untuk melaksanakan hak-hak ini, silakan hubungi kami melalui:<br />
    📧 Email: <a href="mailto:halalina@gmail.com">halalina@gmail.com</a><br />
    📞 Telepon/WhatsApp: 0895415495970
  </p>
  <p>
    Kami akan memproses permintaan Anda paling lambat 14 hari kerja setelah verifikasi identitas.
  </p>

  <p><strong>7. Perubahan Kebijakan Privasi</strong></p>
  <p>
    Kebijakan ini dapat diperbarui sewaktu-waktu. Kami akan memberi tahu Anda melalui aplikasi atau email apabila terdapat perubahan signifikan.
  </p>`,
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
