const db = uniCloud.database();
const collection = db.collection('notebooks');
exports.main = async (event, context) => {
	let {name, classid} = event;
	let res = await collection.add({
		name,
		classid
	});
	return res;
};
