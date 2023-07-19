const db = uniCloud.database();
const collection = db.collection('notebooks');
exports.main = async (event, context) => {
	let res = await collection.orderBy('classid', "desc").get();
	return res;
};
