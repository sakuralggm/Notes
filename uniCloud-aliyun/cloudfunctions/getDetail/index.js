const db = uniCloud.database();
const collection = db.collection('notes');
exports.main = async (event, context) => {
	let {id} = event;
	return await collection.doc(id).get();
};