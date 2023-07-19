const db = uniCloud.database();
const collection = db.collection('notes');
const dbCmd = db.command;
exports.main = async (event, context) => {
	let {
		keyword
	} = event;
	let res = await collection.field({
		"_id": true,
		'title': true,
		'text': true,
		'posttime': true
	}).where(dbCmd.or([{
			'title': new RegExp(keyword, 'gi')
		},
		{
			'text': new RegExp(keyword, 'gi')
		}
	])).orderBy('posttime', 'desc').get();
	
	return res;

};
