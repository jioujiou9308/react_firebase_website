import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Form, Header, Button, Image } from 'semantic-ui-react';
import firebase from '../utils/firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

import { useNavigate } from 'react-router-dom';

const NewPost = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [topics, setTopics] = useState([]);
	// 設定options 裡面的值要傳入使用
	const [topicName, setTopicName] = useState('');
	// 要更改圖片的設定
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	// 引入 firebase store資料
	useEffect(() => {
		firebase
			.firestore()
			.collection('topics')
			.get()
			.then((collectionSnapshot) => {
				const data = collectionSnapshot.docs.map((doc) => {
					return doc.data();
				});
				setTopics(data);
			});
	}, []);

	// 將topics的資料轉換成option 選項的格式
	const options = topics.map((topic) => {
		return {
			text: topic.name,
			value: topic.name,
		};
	});

	// 如果有上傳照片就與覽出來，如果沒有就是後面的網址圖片
	// URL.createObjectURL() 會自動轉化我們上傳圖片的網址
	const previewUrl = file ? URL.createObjectURL(file) : 'https://react.semantic-ui.com/images/wireframe/image.png';

	// 製作onSubmit 後要儲存的東西
	function onSubmit() {
		setIsLoading(true);
		//在firebase 新增一個post集合
		const documentRef = firebase.firestore().collection('posts').doc();
		//上傳圖片的功能
		const fileRef = firebase.storage().ref('post-images/' + documentRef.id);
		const metadata = {
			contentType: file.type,
		};
		fileRef.put(file, metadata).then(() => {
			fileRef.getDownloadURL().then((imageUrl) => {
				documentRef
					.set({
						title: title,
						content: content,
						topic: topicName,
						createdAt: firebase.firestore.Timestamp.now(),
						author: {
							displayName: firebase.auth().currentUser.displayName || '',
							photoURL: firebase.auth().currentUser.photoURL || '',
							uid: firebase.auth().currentUser.uid,
							email: firebase.auth().currentUser.email,
						},
						// 多傳入一個imageUrl
						imageUrl,
					})
					.then(() => {
						setIsLoading(false);
						navigate('/');
					});
			});
		});
	}

	return (
		<Container>
			<Header>發表文章</Header>
			{/* 製作"輸入標題"、"文章內容"、"下拉選單" */}
			<Form onSubmit={onSubmit}>
				{/* 製作上傳文章按鈕與預覽 */}
				<Image src={previewUrl} size='small' floated='left' />
				<Button basic as='label' htmlFor='post-image'>
					上傳文章圖片
				</Button>
				<Form.Input
					type='file'
					id='post-image'
					style={{ display: 'none' }}
					// 改變圖片 files陣列中的第0個
					onChange={(e) => setFile(e.target.files[0])}
				/>
				<Form.Input
					placeholder='輸入文章標題'
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<Form.TextArea
					placeholder='輸入文章內容'
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
				/>
				{/* 下拉式選單，以及呈現方式(option)，option裡面的物件從firebase store 裡面拉取*/}
				<Form.Dropdown
					placeholder='選擇文章主題'
					// 另外拉出來設定，因為資料是從firbase store裡面拉出來的
					options={options}
					// 樣式，可用可不用
					selection
					value={topicName}
					// option 傳入改變值的用法
					onChange={(e, { value }) => {
						setTopicName(value);
					}}
				/>
				<Form.Button isLoading={isLoading}>送出</Form.Button>
			</Form>
		</Container>
	);
};

export default NewPost;
