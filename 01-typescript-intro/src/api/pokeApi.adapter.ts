import axios from 'axios';
import { PokeapiResponse } from '../interfaces/pokeapi-response.interface.ts';

export class PokeAdapter {
  private readonly axios = axios
  async get<T>(url:string):Promise<T>{
    const { data } = await this.axios.get<T>(url);
    return data
  }

  async post(url:string, data:any){

  }
  
}