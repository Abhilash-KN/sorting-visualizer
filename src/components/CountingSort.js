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

function CountingSort(props) {
	var t = 1;
	const time = 10;
	function countingSort() {
		props.disableAll(true);
		props.disableSort(true);

		let a = [...props.newArray];
		let temp = [...a];
		const m = Math.max(...a);
		const n = a.length;
		let count = new Array(m + 1).fill(0);
		let output = new Array(n).fill(0);
		for (let i = 0; i < n; i++) count[a[i]]++;
		for (let i = 1; i < m + 1; i++) count[i] += count[i - 1];
		for (let i = n - 1; i >= 0; i--) {
			output[count[a[i]] - 1] = a[i];
			temp[count[a[i]] - 1] = a[i];
			setTimeout((a) => props.setNewArray(a), t * time, [...temp]);
			t++;
			count[a[i]] -= 1;
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
		console.log(t);
	}
	return (
		<button
			className={props.sortDisabled ? styles.disabled : styles.button}
			onClick={countingSort}
			disabled={props.sortDisabled}>
			Counting Sort
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

export default connect(mapStateToProps, mapDispatchToProps)(CountingSort);
