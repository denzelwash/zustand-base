import { incCount, decCount } from '../stores/useCounterStore'

const ButtonsContainer = () => {
	return (
		<div className="card">
			<button onClick={incCount()}>Увеличить число</button>
			<button onClick={decCount()}>Уменьшить число</button>
		</div>
	)
}

export default ButtonsContainer
