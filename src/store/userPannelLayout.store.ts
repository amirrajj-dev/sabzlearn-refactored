import { create } from "zustand";

interface UserPannelProps {
    isTablet : boolean,
    setIsTablet : (value : boolean)=>void
    isExpanded : boolean,
    setIsExpanded : (value : boolean)=>void
}

export const UseUserPannelStore = create<UserPannelProps>((set , get)=>({
    isExpanded : false,
    isTablet : false,
    setIsExpanded(value) {
        set({isExpanded : value})
    },
    setIsTablet(value) {
        set({isTablet : value})
    },
}))