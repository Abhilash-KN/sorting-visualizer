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

function RadixSort(props) {
	var t = 1;
	const time = 10;
	function countingSort(a, p) {
		const n = a.length;
		let temp = [...a];
		let output = new Array(n).fill(0);
		let count = new Array(10).fill(0);
		for (let i = 0; i < n; i++) {
			let temp = Math.floor(a[i] / p);
			count[temp % 10]++;
		}
		for (let i = 1; i < 10; i++) count[i] += count[i - 1];
		for (let i = n - 1; i >= 0; i--) {
			let temp1 = Math.floor(a[i] / p);
			output[count[temp1 % 10] - 1] = a[i];
			temp[count[temp1 % 10] - 1] = a[i];
			setTimeout((a) => props.setNewArray(a), t * time, [...temp]);
			t++;
			count[temp1 % 10]--;
		}
		return output;
	}
	function radixSort() {
		props.disableAll(true);
		props.disableSort(true);

		let a = [...props.newArray];
		let m = Math.max(...a);
		let n = 1;
		while (Math.floor(m / n) > 0) {
			a = countingSort(a, n);
			n *= 10;
		}
		setTimeout((a) => props.setNewArray(a), t * time, [...a]);
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
			disabled={props.sortDisabled}
			onClick={radixSort}>
			Radix Sort
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

export default connect(mapStateToProps, mapDispatchToProps)(RadixSort);
