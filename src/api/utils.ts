import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const toastError = (error: any) => {
  if (error.response) {
    const errors = error.response?.data?.message

    if (Array.isArray(errors) && errors?.length) {
      toast(errors.join(',\n'), {
        type: 'error',
      })
    } else {
      toast(errors, {
        type: 'error',
      })
    }
  } else {
    toast(error.message, {
      type: 'error',
    })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchData(url: string): Promise<any> {
  try {
    const response: AxiosResponse = await axios.get(url)

    return response.data

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toastError(error)

    return null
  }
}

export async function postData<T>(
  url: string,
  data: T,
  successMessage?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  try {
    const response: AxiosResponse = await axios.post(url, data)

    toast(successMessage, {
      type: 'success',
    })

    return response.data

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toastError(error)

    return null
  }
}

export async function deleteData(
  url: string,
  successMessage?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  try {
    const response: AxiosResponse = await axios.delete(url)

    toast(successMessage, {
      type: 'success',
    })

    return response.data

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toastError(error)

    return null
  }
}

export async function patchData<T>(
  url: string,
  data: T,
  successMessage?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  try {
    const response: AxiosResponse = await axios.patch(url, data)

    toast(successMessage, {
      type: 'success',
    })

    return response.data

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toastError(error)

    return null
  }
}
