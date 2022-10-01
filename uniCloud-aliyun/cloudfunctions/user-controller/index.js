'use strict';
const uniIDs = require('uni-id')
exports.main = async (events, context) => {
	//event为客户端上传的参数
	const uniID = uniIDs.createInstance({ // 创建uni-id实例，其上方法同uniID
		context: context,
		// config: {} // 完整uni-id配置信息，使用config.json进行配置时无需传此参数
	})
	let event = events.action ? events:JSON.parse(events.body)
	// 不需要鉴权的
	let noCheckAction = ['register', 'checkToken', 'logout', 'login', 'loginByEmail', 'sendCodeEmail']
	// 获取前端传过来的数据
	let params = event.params || {}
	// 获取处理的方法
	const action = event.action || ''
	// 初始化返回数据
	let res = {};
	// 判断是否拦截
	if (!noCheckAction.includes(action)) {
		if (!event.uniIdToken) {
			return {
				code: 403,
				msg: '缺少token'
			}
		}
		// 检验token是否错误和过期
		let payload = await uniID.checkToken(event.uniIdToken, {
			needPermission: true
		})
		// 错误处理
		if (payload.code && payload.code > 0) {
			return payload
		}
		params.uid = payload.uid
	}
	switch (event.action) {
		case 'logout': {
			res = await uniID.logout(event.uniIdToken)
			break;
		}
		case 'login': {
			// 解构赋值
			const {
				username,
				password
			} = params;
			res = await uniID.login({
				username,
				password,
				queryField: ['username', 'email']
			})
			break;
		}
		case 'register': {
			const {
				username,
				password
			} = params;
			res = await uniID.register({
				username,
				password,
			})
			break;
		}
		default: {
			res = {
				code: 403,
				msg: '非法访问'
			}
			break;
		}
	}
	//返回数据给客户端
	return res
};
