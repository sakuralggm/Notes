const db = uniCloud.database();
const collection = db.collection('notebooks');
exports.main = async (event, context) => {
	let {classid} = event;
	let res = await collection.where({
		'classid': parseInt(classid)
	}).get();
	return res;
};
