
let socket = io.connect('http://10.0.82.68:81',{'connect timeout': 1000})
let name = '' // 全局名称
let k = 'order_name' // 保存cookie

init()

function init () {
  addBtn()

  getPrice()
}

socket.on('who', (data) => {
  console.log(data)
  name = getNames(data.name)

  document.getElementById('showName').innerHTML = '用户：' + name
  document.getElementById('online').innerHTML = '在线人数：'+ data.online +' 人'

  socket.emit('who', {name: name})
})

socket.on('init_data', (data) => {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item) {
      selectItem(i, item)
    }
  }
})

socket.on('select', (data) => {
  console.log(data)
  selectItem(data.id, data.name)
  document.getElementById('online').innerHTML = '在线人数：'+ data.online +' 人'
})

function selectItem (id, name) {
  console.log(id)
  if (name.length === 0) {
    document.getElementById('menu').appendChild(document.getElementById(id))
  } else {
    document.getElementById(id).innerText += '-' + name
    document.getElementById('pointed').appendChild(document.getElementById(id))
  }
  getPrice()
}

function havePointed (id) {
  var p = document.getElementById('pointed')
  var n = p.childElementCount
  for (let i = 1; i < n; i++) {
    if (p.children[i].id === id) {
      return true
    }
  }
  return false
}

function createBtn (id, btnName, price) {
  var btn = document.createElement('button')
  btn.innerText = btnName + ' [' + price + ']'
  btn.style = 'background:white; color : black ;margin:5px; font-size:20px; font-family:宋体;'
  btn.id = id
  btn.value = price
  document.getElementById('menu').appendChild(btn)
  btn.addEventListener('click', function () {
    if (havePointed(id)) {
      btn.innerText = btnName + ' [' + price + ']'
    }
    socket.emit('select', {id: id, name: name})
    console.log(id, socket)
  })
}

function getPrice () {
  var p = document.getElementById('pointed')
  var n = p.childElementCount
  var sum = 0
  for (let i = 1; i < n; i++) {
    sum += Number(p.children[i].value)
  }
  document.getElementById('price').innerHTML = '价格：' + sum + ' 元'
}

function getNames (dname) {
  let cName = getCookie(k)
  if (cName && cName.length > 0) {
    dname = cName
  } else {
    var newName = prompt('请输入您的尊称：', dname)
    if (newName != null && newName.length > 0) {
      setCookie(k, newName, 7)
      return newName
    }
  } 
  return dname
}

function changeName() {
  var newName = prompt('请输入您的尊称：', name)
    if (newName != null && newName.length > 0) {
      setCookie(k, newName, 365)
      document.getElementById('showName').innerHTML = '用户：' + newName
      name = newName
    }
}

// setCookie(key, value, day)
function setCookie (CooName, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = CooName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// getCookie(key) -> value
function getCookie (CooName) {
  if (document.cookie.length > 0) {
    let CooStart = document.cookie.indexOf(CooName + '=')
    if (CooStart !== -1) {
      CooStart = CooStart + CooName.length + 1
      let CooEnd = document.cookie.indexOf(';', CooStart)
      if (CooEnd === -1) {
        CooEnd = document.cookie.length
      }
      return unescape(document.cookie.substring(CooStart, CooEnd))
    }
  }
  return ''
}

function addBtn () {
  createBtn(32, '紫菜蛋花汤', 15)
  createBtn(33, '番茄炒蛋花', 15)

  createBtn(4, '酸辣土豆丝', 16)
  createBtn(1, '蒜泥生菜', 18)
  createBtn(2, '蒜泥空心菜', 18)
  createBtn(3, '清炒菠菜', 18)
  createBtn(5, '番茄炒蛋', 18)
  createBtn(6, '鱼香肉丝', 18)
  createBtn(11, '青椒炒鸡蛋', 18)
  createBtn(12, '青椒香干炒肉丝', 18)
  createBtn(14, '小葱炒蛋', 18)
  createBtn(18, '干过手撕包菜-微辣', 18)
  createBtn(23, '肉沫蒸蛋', 18)

  createBtn(22, '韭菜螺丝肉', 20)
  createBtn(7, '韭黄炒鸡蛋', 20)
  createBtn(8, '宫保鸡丁', 22)
  createBtn(19, '干锅千叶豆腐-微辣', 22)
  createBtn(15, '川香回锅肉', 22)
  createBtn(16, '酱爆猪肝', 22)
  createBtn(17, '干锅腐竹', 22)
  createBtn(20, '干锅有机花菜', 22)
  createBtn(21, '小炒肉-辣', 22)
  createBtn(9, '椒盐排条', 25)
  createBtn(13, '糖醋里脊肉', 25)
  createBtn(10, '孜然肥牛卷', 28)
  createBtn(24, '砂锅焖鸡', 28)
  createBtn(26, '黄焖鳊鱼', 28)
  createBtn(27, '咱家酸菜肉', 28)
  createBtn(28, '水煮肉片', 28)
  createBtn(35, '猪肚鸡锅仔', 28)
  createBtn(36, '三鲜锅', 28)
  createBtn(29, '水煮鱼片', 28)
  createBtn(25, '铁板泰味虾', 32)
  createBtn(30, '酸汤肥牛', 32)
  createBtn(31, '麻的跳鲜椒牛蛙', 38)
  createBtn(34, '红烧牛肉锅', 38)

  createBtn(37, '黄焖鸡米饭', 16)
  createBtn(38, '玉米排骨饭', 18)
  createBtn(39, '海带排骨饭', 18)
  createBtn(40, '千张排骨饭', 18)
  createBtn(41, '木耳排骨饭', 18)
  createBtn(42, '酱香排骨饭', 18)
}
