const db = uniCloud.database();
const collection = db.collection('notes');

exports.main = async (event, context) => {
	let {artObj} = event;
	let res = await collection.add(artObj);
	return res;
};
