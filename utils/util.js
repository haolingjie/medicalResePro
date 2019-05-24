const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const app = getApp()
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var collectFormIds=function(formId) {
  let formIds = app.globalData.globalFormIds; // 获取全局推送码数组
  if (!formIds)
    formIds = [];
  let data = {
    formId: formId,
    expire: new Date().getTime() + 60480000 // 7天后的过期时间戳
  }
  formIds.push(data);
  app.globalData.globalFormIds = formIds;
}
module.exports = {
  collectFormIds: collectFormIds,
  formatTime: formatTime
}