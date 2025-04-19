import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export const fetchJobType = async (token) => {
  const response = await axios.get(`${BASE_URL}/user_profile/job_type`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.data
}

export const createUserProfile = async (token, profileData) => {
  const response = await axios.post(
    `${BASE_URL}/user_profile/create`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )

  return response.data
}

export const fetchUserProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/user_profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const predictUserProfile = async (token) => {
  const response = await axios.post(`${BASE_URL}/user_profile/predict`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

// export const fetchUserData = async (token) => {
//   const response = await axios.get(`${BASE_URL}/api/users/me`, {
//     headers: { Authorization: `Bearer ${token}` },
//   })
//   return response.data.data
// }

// export const fetchWalletByUser = async (userId, token) => {
//   const response = await axios.get(`${BASE_URL}/api/wallets/user/${userId}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   })
//   return response.data.data
// }

// export const createWallet = async (userId, email, token) => {
//   const response = await axios.post(
//     `${BASE_URL}/api/wallets/${userId}`,
//     { email },
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )
//   return response.data.data
// }

// export const fetchTransactionHistory = async ({
//   walletId,
//   type,
//   time,
//   sortBy,
//   order,
//   token,
//   page,
//   size,
// }) => {
//   const reqType = type === 'All' ? null : type
//   const response = await axios.get(`${BASE_URL}/api/transactions/filter`, {
//     headers: { Authorization: `Bearer ${token}` },
//     params: {
//       walletId,
//       type: reqType,
//       timeRange: time,
//       startDate: getDateRange(time).startDate,
//       endDate: getDateRange(time).endDate,
//       sortBy,
//       order,
//       page,
//       size,
//     },
//   })
//   return response.data.data
// }