import axios, { AxiosError, AxiosResponse } from "axios";

export async function fetchData(url: string): Promise<any> {
  try {
    const response: AxiosResponse = await axios.get(url);

    return response.data;
  } catch (error: AxiosError) {
    if (error.response) {
      console.error(
        `Axios error: ${error.response.status} - ${error.response.statusText}`,
      );
    } else {
      console.error("Axios network error:", error.message);
    }
    return null;
  }
}

export async function postData<T>(url: string, data: T): Promise<any> {
  try {
    const response: AxiosResponse = await axios.post(url, data);

    return response.data;
  } catch (error: AxiosError) {
    if (error.response) {
      console.error(
        `Axios error: ${error.response.status} - ${error.response.statusText}`,
      );
    } else {
      console.error("Axios network error:", error.message);
    }
    return null;
  }
}
