import { create } from "zustand";

interface TxnsTableState {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
}

// const formatNewDate = (date: string, stateDate: string): boolean => {...}
/**
 * type FormatNewDate = (date: string, stateDate: string) => boolean;
 * const formatNewDate: FormatNewDate = (date, stateDate) => {...}
 */
const formatNewDate: (date: string, stateDate: string) => boolean = (date, stateDate) => {
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) {
        return false;
    }

    const currentDate = new Date(stateDate);
    if (isNaN(currentDate.getTime())) {
        return true;
    }

    if (newDate === currentDate) {
        return false;
    }

    return true;
};

export const useTxnsTableStore = create<TxnsTableState>((set, get) => ({
    startDate: '',
    endDate: '',
    setStartDate: (date) => {
        if (formatNewDate(date, get().startDate)) {
            set({ startDate: date });
        }
    },
    setEndDate: (date) => {
        if (formatNewDate(date, get().endDate)) {
            set({ endDate: date });
        }
    },
}));
