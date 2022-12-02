import React from 'react';
import { Grid, Item, Image, Icon } from 'semantic-ui-react';
import Topics from '../component/Topics';
import { useEffect, useState } from 'react';

// import firebase from 'firebase/compat';
import firebase from '../utils/firebase';

const Posts = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		firebase
			.firestore()
			.collection('posts')
			.get()
			.then((collectionSnapshop) => {
				const data = collectionSnapshop.docs.map((docSnapshot) => {
					// 為了給list key
					const id = docSnapshot.id;
					return { ...docSnapshot.data(), id };
				});
				setPosts(data);
			});
	}, []);
	return (
		<Grid>
			<Grid.Row>
				<Grid.Column width={3}>
					<Topics />
				</Grid.Column>
				{/* 顯示標題 */}
				{/* <Grid.Column width={10}>
					{posts.map((post) => {
						return <p>{post.title}</p>;
					})}
				</Grid.Column> */}
				<Grid.Column width={10}>
					<Item.Group>
						{posts.map((post) => {
							return (
								<Item key={post.id}>
									<Item.Image src={post.imageUrl} />
									<Item.Content>
										<Item.Meta>
											{/* 使用者的大頭照，記得引入元件 */}
											{/* 如果沒有圖片就先用icon小圖示，記得也要引入 */}
											{post.author.photoURL ? <Image src={post.author.photoURL} /> : <Icon name='user circle' />}
											{post.topic}◆{post.author.displayName || '使用者 '}
										</Item.Meta>
										<Item.Header>{post.title}</Item.Header>
										<Item.Description>{post.content}</Item.Description>
										<Item.Extra>留言 0 。 按讚 0 </Item.Extra>
									</Item.Content>
								</Item>
							);
						})}
					</Item.Group>
				</Grid.Column>

				<Grid.Column width={3}>空白</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Posts;
