const db = uniCloud.database();
const collection = db.collection('notes');
exports.main = async (event, context) => {
	let {artObj} = event;
	let id = artObj._id;
	delete artObj._id;
	let res = await collection.doc(id).update(artObj);
	return res;
};
