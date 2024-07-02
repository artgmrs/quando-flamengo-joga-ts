import axios, { AxiosResponse } from "axios";
import { GameProp } from "../types/GameProp";

const url = 'https://flascrapper.vercel.app/api/nextgame';

async function getNextGame(): Promise<GameProp> {
  const response: AxiosResponse = await axios.get(url, {
    headers: {
      Accept: 'application/json', 
    },
  });

  return response.data
}

export default getNextGame;
