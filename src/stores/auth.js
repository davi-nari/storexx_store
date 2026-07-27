import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { http } from '@/api/http.js'

const TOKEN_KEY = 'access_token'
const USER_KEY = 'auth_user'
const OTP_EMAIL_KEY = 'otp_email'

function readStoredUser() {
  const value = localStorage.getItem(USER_KEY)

  if (!value) {
    return null
  }

  try {
    return JSON.parse(value)
  } catch {
    localStorage.removeItem(USER_KEY)
    return null
  }
}

function getApiError(error, fallbackMessage) {
  return error.response?.data?.message || error.message || fallbackMessage
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem(TOKEN_KEY))
  const user = ref(readStoredUser())
  const otpEmail = ref(sessionStorage.getItem(OTP_EMAIL_KEY) || '')

  const isLoading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => Boolean(accessToken.value))
  const isAdmin = computed(() => user.value?.is_admin === true)

  async function requestOtp(email) {
    isLoading.value = true
    error.value = ''

    try {
      const normalizedEmail = email.trim().toLowerCase()

      const { data } = await http.post('/api/auth/otp/request', {
        email: normalizedEmail,
      })

      if (!data.success) {
        throw new Error(data.message || 'Не удалось отправить код')
      }

      otpEmail.value = normalizedEmail
      sessionStorage.setItem(OTP_EMAIL_KEY, normalizedEmail)

      return data
    } catch (requestError) {
      error.value = getApiError(
        requestError,
        'Не удалось отправить код подтверждения',
      )

      throw requestError
    } finally {
      isLoading.value = false
    }
  }

  async function verifyOtp(code) {
    isLoading.value = true
    error.value = ''

    try {
      if (!otpEmail.value) {
        throw new Error('Email не найден. Запросите код повторно')
      }

      const { data } = await http.post('/api/auth/otp/verify', {
        email: otpEmail.value,
        code,
      })

      if (!data.success || !data.access_token) {
        throw new Error(data.message || 'Не удалось подтвердить код')
      }

      accessToken.value = data.access_token
      user.value = data.user

      localStorage.setItem(TOKEN_KEY, data.access_token)
      localStorage.setItem(USER_KEY, JSON.stringify(data.user))

      sessionStorage.removeItem(OTP_EMAIL_KEY)

      return data
    } catch (requestError) {
      error.value = getApiError(requestError, 'Неверный или просроченный код')

      throw requestError
    } finally {
      isLoading.value = false
    }
  }

  function logout() {
    accessToken.value = null
    user.value = null
    otpEmail.value = ''
    error.value = ''

    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(OTP_EMAIL_KEY)
  }

  return {
    accessToken,
    user,
    otpEmail,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    requestOtp,
    verifyOtp,
    logout,
  }
})
