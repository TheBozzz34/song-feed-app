import { User } from './user';

export type Song = {
    id: string;
    title: string;
    artist: string;
    url: string;
    coverArt: string;
    createdAt: string;
    slug: string;
    user: User;
  };