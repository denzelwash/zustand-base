import { useCounterStore } from '../store'

const Value = () => {
	const count = useCounterStore((state) => state.count)

	return <h2>{count}</h2>
}

export default Value
