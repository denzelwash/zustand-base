import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface InitialState {
	count: number
}

interface Actions {
	inc: () => void
	dec: () => void
	set: (counter: number) => void
}

interface CounterState extends InitialState, Actions {}

const initialState: InitialState = {
	count: 0
}

const useCounterStore = create<CounterState>()(
	devtools((set) => ({
		...initialState,
		inc: () => set((state) => ({ count: state.count + 1 })),
		dec: () => set((state) => ({ count: state.count - 1 })),
		set: (counter) => set({ count: counter })
	}))
)

// Селекторы и экшены для идеального варика
const useCount = () => useCounterStore((state) => state.count)
const incCount = () => useCounterStore.getState().inc
const decCount = () => useCounterStore.getState().dec

export { useCounterStore, useCount, incCount, decCount }
