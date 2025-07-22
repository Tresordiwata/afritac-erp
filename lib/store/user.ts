import { create } from 'zustand';

interface UserState {
  user: {
    name: string;
    email: string;
    avatar: string;
  } | null;
  setUser: (user: UserState['user']) => void | undefined;
}

export type CurrentUser={
  id:string | null;
  nom:string | null;
  role:string | null;
  status:string | null;
  
}

type Action = {
  setCurrentUser:(CurrentUser:CurrentUser)=>void;
}
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
export const currentUserStore=create<CurrentUser & Action>((set)=>({
  id:null,
  nom:null,
  role:null,
  status:null,
  setCurrentUser:(data)=>set(()=>({id:data?.id,nom:data?.nom,role:data?.role,status:data?.status}))
}))