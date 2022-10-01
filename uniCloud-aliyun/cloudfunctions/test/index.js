'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let res = {
		msg:'hello uni-app + electron'
	}
	
	//返回数据给客户端
	return res
};
