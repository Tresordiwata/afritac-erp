import { create } from 'zustand';
import { Client } from './../interfaces/client';

interface ClientStore {
  clients: Client[];
  addClient: (client: Client) => void;
  updateClient: (id: string, client: Client) => void;
  deleteClient: (id: string) => void;
}

export const useClientStore = create<ClientStore>((set) => ({
  clients: [],
  addClient: (client) =>{
    set((state) => ({ clients: [...state.clients, client] }))},
  updateClient: (id, updatedClient) =>
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === id ? updatedClient : client
      ),
    })),
  deleteClient: (id) =>
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== id),
    })),
}));