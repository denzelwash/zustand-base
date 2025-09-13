import { create, type StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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

const counterStore: StateCreator<CounterState, [['zustand/devtools', never], ['zustand/persist', unknown]]> = (
	set
) => ({
	...initialState,
	inc: () => set((state) => ({ count: state.count + 1 }), undefined, 'inc'),
	dec: () => set((state) => ({ count: state.count - 1 }), undefined, 'dec'),
	set: (counter) => set({ count: counter })
})

const useCounterStore = create<CounterState>()(devtools(persist(counterStore, { name: 'counter-storage' })))

// Базовый вариант
// const useCounterStore = create<CounterState>()((set) => ({
// 	...initialState,
// 	inc: () => set((state) => ({ count: state.count + 1 })),
// 	dec: () => set((state) => ({ count: state.count - 1 })),
// 	set: (counter) => set({ count: counter })
// }))

// Селекторы и экшены для идеального варика
const useCount = () => useCounterStore((state) => state.count)
const incCount = () => useCounterStore.getState().inc
const decCount = () => useCounterStore.getState().dec

export { useCounterStore, useCount, incCount, decCount }
