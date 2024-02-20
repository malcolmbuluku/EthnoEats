import { create } from 'zustand';


export interface Location {
    latitude: number;
    longitude: number;
    description: string;
}

export interface LocationState {
    location: Location;
    setLocation: (location: Location) => void;
    clearLocation: () => void;
}

const useLocationStore = create<LocationState>((set) => ({
    location: {
        latitude: 0,
        longitude: 0,
        description: '',
    },
    setLocation: (location) => set({ location }),
    clearLocation: () => set({ location: { latitude: 0, longitude: 0, description: '' } }),
}));


export default useLocationStore;