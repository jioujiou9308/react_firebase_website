import React from 'react';
import { Menu, Form, Container, Message } from 'semantic-ui-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//如果沒有這個會出錯
import 'firebase/compat/auth';
import firebase from '../utils/firebase';

const Signin = () => {
	const navigate = useNavigate();
	const [activeItem, setActiveItem] = useState('register');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	//註冊、登入 的錯誤訊息處理
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	function onSubmit() {
		//剛進來等待畫面
		setIsLoading(true);
		// 從activeItem 去判斷現在是 註冊 還是 登入
		if (activeItem === 'register') {
			//可以使用這個function 創建一個使用者
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(() => {
					navigate('/');
					setIsLoading(false);
				})
				// 處理註冊寫錯誤訊息的處理
				.catch((error) => {
					switch (error.code) {
						case 'auth/email-already-in-use':
							setErrorMessage('信箱已存在');
							break;
						case 'auth/invalid-email':
							setErrorMessage('信箱格式不正確');
							break;
						case 'auth/weak-password':
							setErrorMessage('密碼強度不足');
							break;
						default:
					}
					setIsLoading(false);
				});
		} else if (activeItem === 'signin') {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					navigate('/');
					setIsLoading(false);
				})
				// 登入錯誤訊息處理
				.catch((error) => {
					switch (error.code) {
						case 'auth/invalid-email':
							setErrorMessage('信箱格式不正確');
							break;
						case 'auth/user-not-found':
							setErrorMessage('信箱不存在');
							break;
						case 'auth/wrong-password':
							setErrorMessage('密碼錯誤');
							break;
						default:
					}
					setIsLoading(false);
				});
		}
	}

	return (
		<>
			<Container>
				<Menu widths='2'>
					<Menu.Item
						active={activeItem === 'register'}
						onClick={() => {
							setActiveItem('register');
							setErrorMessage('');
						}}
					>
						註冊
					</Menu.Item>
					<Menu.Item
						active={activeItem === 'signin'}
						onClick={() => {
							setActiveItem('signin');
							setErrorMessage('');
						}}
					>
						登入
					</Menu.Item>
				</Menu>
				<Form onSubmit={onSubmit}>
					<Form.Input label='信箱' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='請輸入信箱' />
					<Form.Input label='密碼' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='請輸入密碼' type='password' />
					{/* 利用條件render 來顯示錯誤訊息*/}
					{errorMessage && <Message negative>{errorMessage}</Message>}
					{/* props 就是loading */}
					<Form.Button loading={isLoading}>
						{/* 當兩邊都是true 的時候顯示 右邊的值 */}
						{activeItem === 'register' && '註冊'}
						{activeItem === 'signin' && '登入'}
					</Form.Button>
				</Form>
			</Container>
		</>
	);
};
export default Signin;
