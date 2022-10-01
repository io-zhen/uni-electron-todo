// 发送单条短信示例
'use strict';
exports.main = async (event, context) => {
	try {
		const res = await uniCloud.sendSms({
			appid: '__UNI__094153D',
			smsKey: '6d0fa52efa2881fa3f55c5d4d5fb9dee',
			smsSecret: '6a967873c8061ad39ae407578701b5c8',
			phone: '18989909995',
			templateId: '13278', // 请替换为自己申请的模板id
			data: {
				message: '王可昕学习时间到了'
			}
		})
		// 调用成功，请注意这时不代表发送成功
		return res
	} catch (err) {
		// 调用失败
		console.log(err.errCode)
		console.log(err.errMsg)
		return {
			code: err.errCode,
			msg: err.errMsg
		}
	}
};
