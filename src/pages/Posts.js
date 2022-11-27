import React from 'react';
import { Grid } from 'semantic-ui-react';
import Topics from '../component/Topics';

const Posts = () => {
	return (
		<Grid>
			<Grid.Row>
				<Grid.Column width={3}>
					<Topics />
				</Grid.Column>
				<Grid.Column width={10}>貼文列表</Grid.Column>
				<Grid.Column width={3}>空白</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Posts;
