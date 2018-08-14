/*
包含n个工具函数的模块
 */
/*
得到跳转的路由路径
/dashen
/laoban
/dasheninfo
/laobaninfo
 */
export function getRedirectPath(type, header) {
  let path = ''

  if (type==='dashen') {
    path = '/dashen'
  } else {
    path = '/laoban'
  }

  // 可能要加info
  if(!header) {
    path += 'info'
  }

  return path
}