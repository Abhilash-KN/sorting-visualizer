import React from 'react';
import styles from './Styles.module.css';

import { connect } from 'react-redux';

import {
	setSameArray,
	setNewArray,
	disableAll,
	disableSort,
	setIndices,
} from '../redux';

function BubbleSort(props) {
	var t = 1;
	const time = 10;
	function bubbleSort() {
		props.disableAll(true);
		props.disableSort(true);
		let a = [...props.newArray];
		let n = a.length;
		for (let i = 0; i < n; i++)
			for (let j = 0; j < n - i - 1; j++) {
				if (a[j] > a[j + 1]) {
					let x = a[j];
					a[j] = a[j + 1];
					a[j + 1] = x;
				}
				setTimeout(
					(a, indices) => {
						props.setNewArray(a);
						props.setIndices(indices);
					},
					t * time,
					[...a],
					[j, j + 1]
				);
				t++;
			}
		setTimeout(() => {
			props.setIndices([]);
			let indices = [];
			let i = 0;
			for (i = 0; i < props.newArray.length; i++) {
				indices.push(i);
				setTimeout((indices) => props.setIndices(indices), i * time, [
					...indices,
				]);
			}
			setTimeout(() => {
				props.disableAll(false);
				props.setIndices([]);
			}, i * time);
		}, t * time);
	}
	return (
		<button
			className={props.sortDisabled ? styles.disabled : styles.button}
			onClick={bubbleSort}
			disabled={props.sortDisabled}>
			Bubble Sort
		</button>
	);
}

const mapStateToProps = (state) => {
	return {
		sameArray: state.sameArray,
		newArray: state.newArray,
		allDisabled: state.allDisabled,
		sortDisabled: state.sortDisabled,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSameArray: (arr) => dispatch(setSameArray(arr)),
		setNewArray: (arr) => dispatch(setNewArray(arr)),
		disableAll: (state) => dispatch(disableAll(state)),
		disableSort: (state) => dispatch(disableSort(state)),
		setIndices: (indices) => dispatch(setIndices(indices)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BubbleSort);
