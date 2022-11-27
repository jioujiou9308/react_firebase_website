import React from 'react';
import { useEffect, useState } from 'react';
import firebase from '../utils/firebase';
// 如果要引用firesbase store 裡面的內容 ，要引入 import 'firebase/compat/firestore'; 但為了之後方便是不是可以把檔案丟到 utils/firebase.js檔案裡
import 'firebase/compat/firestore';
import { List } from 'semantic-ui-react';

const Topics = () => {
	const [topics, setTopics] = useState([]);
	useEffect(() => {
		firebase
			// 要使用firestore 裡面的資料要引入import 'firebase/compat/firestore';
			.firestore()
			// 收集firestore裡名叫topics的資料
			.collection('topics')
			.get()
			// 是primise所以用.then
			.then((collectionSnapshot) => {
				const data = collectionSnapshot.docs.map((doc) => {
					return doc.data();
				});
				setTopics(data);
			});
	}, []);
	return (
		<List animated selection>
			{topics.map((topic, index) => {
				return <List.Item key={index}>{topic.name}</List.Item>;
			})}
		</List>
	);
};

export default Topics;
