const db = uniCloud.database();
const collection = db.collection('notes');
const dbCmd = db.command;
exports.main = async (event, context) => {
	let {
		classid
	} = event;
	
	if (classid == -1) {
		return await collection.field({
			"_id": true,
			'title': true,
			'description': true,
			'posttime': true
		}).orderBy('posttime', 'desc').get();
	} else if (classid == 0) {
		return await collection.field({
			"_id": true,
			'title': true,
			'description': true,
			'posttime': true
		}).where(dbCmd.or([{
			classid: null
		},
		{
			classid: '0'
		}, {
			classid: '-1'
		}
	])).orderBy('posttime', 'desc').get();
	} else {
		return await collection.field({
			"_id": true,
			'title': true,
			'description': true,
			'posttime': true
		}).where({
			classid: `${classid}`
		}).orderBy('posttime', 'desc').get();
	}
};
