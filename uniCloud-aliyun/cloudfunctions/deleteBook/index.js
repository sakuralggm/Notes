const db = uniCloud.database();
const collection = db.collection('notebooks');
exports.main = async (event, context) => {
	let {classid} = event;
	return await collection.where({
		classid
	}).remove();
};
