import { useCounterStore } from '../stores/useCounterStore'
import { useShallow } from 'zustand/shallow'

const ButtonsContainer = () => {
	const { inc, dec } = useCounterStore(
		useShallow((state) => ({
			inc: state.inc,
			dec: state.dec
		}))
	)

	return (
		<div className="card">
			<button onClick={inc}>Увеличить число</button>
			<button onClick={dec}>Уменьшить число</button>
		</div>
	)
}

export default ButtonsContainer
