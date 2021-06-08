const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [{
    logo: 'A',
    url: 'https://www.acfun.cn'
  },
  {
    logo: 'B',
    url: 'https://www.bilibili.com'
  }
]

const simplifyUrl = (url) => {
  if (url !== null) {
    return url.replace('https://', '')
      .replace('http://', '')
      .replace('www.', '')
      .replace(/\/.*/, '') // 删除 / 开头的内容
  }
}
const render = () => {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    // console.log(node.url);
    const $li = $(`<li>
  <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class = "close">
          <svg class="icon">
              <use xlink:href="#icon-closewhite"></use>
            </svg>
          </div>
        </div>
  </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1),
        render()
    })
  })
}

render()

$('.addButton').on('click', () => {
  let url = window.prompt('请输入您要添加的网址')
  if (url !== null && url.indexOf('http') !== 0) {
    url = 'https://' + url
  }
  if (url) {
    hashMap.push({
      logo: simplifyUrl(url)[0].toUpperCase(),
      url: url
    })
    render()
  }

})
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
  const {
    key
  } = e // 等价于const key = e.key
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) { // 如果键盘按下的数字与logo小写内容相等
      window.open(hashMap[i].url)
    }

  }
})