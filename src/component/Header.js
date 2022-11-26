import React from 'react';
import { useEffect, useState } from 'react';
import { Menu, Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase';

const Header = () => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		// 呼叫 firebase.auth()的onAuth這個function 裡面有一個callback 可以拿到user的資訊
		//就是這個header 渲染完後，就可以透過useEffect 去執行這個監聽，只要有登入登出就會執行裡面的callback function ， 所以我們要做一個state
		firebase.auth().onAuthStateChanged((currentUser) => {
			setUser(currentUser);
		});
	});
	return (
		<Menu>
			<Menu.Item>
				<Link to='/'>Social Website</Link>
			</Menu.Item>
			<Menu.Item>
				<Search />
			</Menu.Item>
			<Menu.Menu position='right'>
				{user ? (
					<>
						<Menu.Item>
							<Link to='/new-post'>發表文章</Link>
						</Menu.Item>
						<Menu.Item>
							<Link to='/my'>會員</Link>
						</Menu.Item>
						<Menu.Item onClick={() => firebase.auth().signOut()}>登出</Menu.Item>
					</>
				) : (
					<>
						<Menu.Item>
							<Link to='/signin'>註冊/登入</Link>
						</Menu.Item>
					</>
				)}
			</Menu.Menu>
		</Menu>
	);
};

export default Header;
