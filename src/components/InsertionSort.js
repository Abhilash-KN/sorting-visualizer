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

function InsertionSort(props) {
	var t = 1;
	const time = 10;
	function insertionSort() {
		props.disableAll(true);
		props.disableSort(true);

		let a = [...props.newArray];
		let n = a.length;
		for (let i = 1; i < n; i++) {
			let key = a[i];
			let j = i - 1;
			while (j >= 0 && a[j] > key) {
				a[j + 1] = a[j];
				setTimeout(
					(a, indices) => {
						props.setNewArray(a);
						props.setIndices(indices);
					},
					t * time,
					[...a],
					[j + 1, i]
				);
				t++;
				j -= 1;
			}
			a[j + 1] = key;
			setTimeout(
				(a, indices) => {
					props.setNewArray(a);
					props.setIndices(indices);
				},
				t * time,
				[...a],
				[j + 1, i]
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
			onClick={insertionSort}
			disabled={props.sortDisabled}>
			Insertion Sort
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

export default connect(mapStateToProps, mapDispatchToProps)(InsertionSort);
