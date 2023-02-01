import { Item } from "./Item";

export interface Purchase {
    items: Item[];
    userId: string;
    datetime: string;
    total: number;
    currency: string;
  }
  