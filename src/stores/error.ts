import type { CustomError, ExtendedPostgressError } from '@/types/error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgressError>(null)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError
    customCode: number
  }) => {
    if (typeof error === 'string') {
      activeError.value = Error(error)
      activeError.value.customCode = customCode
      return
    }

    activeError.value = error
    ;(activeError.value as ExtendedPostgressError).statusCode = customCode
  }

  return {
    activeError,
    setError,
  }
})
