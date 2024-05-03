import { create } from 'zustand';

const usePaymentModal = create((set) => ({
    isOpen: false,
    ticketId: null,
    onOpen: (payload) => set({ isOpen: true, ticketId: payload }),
    onClose: () => set({ isOpen: false, ticketId: null }),
}));

export default usePaymentModal;
