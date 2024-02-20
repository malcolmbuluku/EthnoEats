import { create } from 'zustand';

export interface Notification {
    title: string;
    body: string;
}

export interface NotificationState {
    notification: Notification;
    pushToken: string;
    isGranted: boolean;
    setNotification: (notification: Notification) => void;
    setPushToken: (token: string) => void;
    setIsGranted: (isGranted: boolean) => void;
    clearNotification: () => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
    notification: {
        title: '',
        body: '',
    },
    pushToken: '',
    isGranted: false,
    setNotification: (notification) => set({ notification }),
    setPushToken: (pushToken) => set({ pushToken }),
    setIsGranted: (isGranted) => set({ isGranted }),
    clearNotification: () => set({ notification: { title: '', body: '' }, pushToken: '', isGranted: false}),
}));

export default useNotificationStore;