import React, { useEffect } from 'react';
import styles from './Styles.module.css';

import { connect } from 'react-redux';

import BubbleSort from './BubbleSort';
import SelectionSort from './SelectionSort';
import InsertionSort from './InsertionSort';
import CountingSort from './CountingSort';
import RadixSort from './RadixSort';
import MergeSort from './MergeSort';
import QuickSort from './QuickSort';
import HeapSort from './HeapSort';

import { setSameArray, setNewArray, disableAll, disableSort } from '../redux';

function Visualizer(props) {
	useEffect(() => {
		generateNewArray();
		//eslint-disable-next-line
	}, []);

	function generateNewArray() {
		let arr = [];
		for (let i = 0; i < 100; i++)
			arr.push(Math.floor(Math.random() * 190) + 10);
		props.setNewArray([...arr]);
		props.setSameArray([...arr]);
	}
	return (
		<div className={styles.container}>
			<div className={styles.cover}>
				Screen size is too small to view this content
				<br />
				Please open in laptop/desktop
				<br />
				or in any other larger screen
			</div>
			<div className={styles.buttons}>
				<button
					className={
						props.allDisabled ? styles.disabled : styles.button
					}
					disabled={props.allDisabled}
					onClick={() => {
						props.setNewArray([...props.sameArray]);
						props.disableSort(false);
					}}>
					Load same data
				</button>
				<button
					className={
						props.allDisabled ? styles.disabled : styles.button
					}
					disabled={props.allDisabled}
					style={{ marginBottom: '38px' }}
					onClick={() => {
						generateNewArray();
						props.disableSort(false);
					}}>
					Generate new Array
				</button>
				<BubbleSort />
				<SelectionSort />
				<InsertionSort />
				<CountingSort />
				<RadixSort />
				<MergeSort />
				<QuickSort />
				<HeapSort />
			</div>
			<div className={styles.visualizer}>
				<div className={styles.box}>
					{props.newArray.map((value, index) => (
						<div
							key={index}
							className={styles.bars}
							style={{
								height: `${(value / 200) * 570}px`,
								background: props.indices.includes(index)
									? '#f66d12'
									: '#1283f6',
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		sameArray: state.sameArray,
		newArray: state.newArray,
		allDisabled: state.allDisabled,
		sortDisabled: state.sortDisabled,
		indices: state.indices,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSameArray: (arr) => dispatch(setSameArray(arr)),
		setNewArray: (arr) => dispatch(setNewArray(arr)),
		disableAll: (state) => dispatch(disableAll(state)),
		disableSort: (state) => dispatch(disableSort(state)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
