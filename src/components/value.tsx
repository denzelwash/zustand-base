import { useCount } from '../stores/useCounterStore'

const Value = () => {
	const count = useCount()

	return <h2>{count}</h2>
}

export default Value
