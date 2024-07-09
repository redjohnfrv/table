import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const toastError = (error: AxiosError) => {
  if (error.response) {
    const errors = error.response?.data?.message;

    if (Array.isArray(errors) && errors?.length) {
      toast(errors.join(",\n"), {
        type: "error",
      });
    } else {
      toast(errors, {
        type: "error",
      });
    }
  } else {
    toast(error.message, {
      type: "error",
    });
  }
};

export async function fetchData(url: string): Promise<any> {
  try {
    const response: AxiosResponse = await axios.get(url);

    return response.data;
  } catch (error: AxiosError) {
    toastError(error);

    return null;
  }
}

export async function postData<T>(url: string, data: T): Promise<any> {
  try {
    const response: AxiosResponse = await axios.post(url, data);

    return response.data;
  } catch (error: AxiosError) {
    toastError(error);

    return null;
  }
}
