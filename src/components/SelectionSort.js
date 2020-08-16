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

function SelectionSort(props) {
	var t = 1;
	const time = 10;
	function selectionSort() {
		props.disableAll(true);
		props.disableSort(true);

		let a = [...props.newArray];
		let n = a.length;
		for (let i = 0; i < n; i++) {
			let minIdx = i;
			for (let j = i + 1; j < n; j++) {
				if (a[minIdx] > a[j]) {
					minIdx = j;
				}
				setTimeout((indices) => props.setIndices(indices), t * time, [
					minIdx,
					j,
				]);
				t++;
			}
			let x = a[i];
			a[i] = a[minIdx];
			a[minIdx] = x;
			setTimeout(
				(a, indices) => {
					props.setNewArray(a);
					props.setIndices(indices);
				},
				t * time,
				[...a],
				[minIdx, i]
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
			onClick={selectionSort}
			disabled={props.sortDisabled}>
			Selection Sort
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectionSort);
