// Функция для выполнения GET запросов
import { User } from "./dto.ts";
import axios, { AxiosError, AxiosResponse } from "axios";

const api = "http://dev.it-svoboda.ru:8096";

async function fetchData(url: string): Promise<any> {
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

export async function getUsersFromApi(): Promise<User[]> {
  const url = `${api}/verified-users`;

  try {
    const users = await fetchData(url);
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}
