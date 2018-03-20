function init() {
	createBtn(32,"紫菜蛋花汤",15)
	createBtn(33,"番茄炒蛋花",15)
	
	createBtn(4,"酸辣土豆丝",16)
	createBtn(1,"蒜泥生菜", 18)
	createBtn(2,"蒜泥空心菜",18)
	createBtn(3,"清炒菠菜",18)
	createBtn(5,"番茄炒蛋",18)
	createBtn(6,"鱼香肉丝",18)
	createBtn(11,"青椒炒鸡蛋",18)
	createBtn(12,"青椒香干炒肉丝",18)
	createBtn(14,"小葱炒蛋",18)
	createBtn(18,"干过手撕包菜-微辣",18)
	createBtn(23,"肉沫蒸蛋",18)


	createBtn(22,"韭菜螺丝肉",20)
	createBtn(7,"韭黄炒鸡蛋",20)
	createBtn(8,"宫保鸡丁",22)
	createBtn(19,"干锅千叶豆腐-微辣",22)
	createBtn(15,"川香回锅肉",22)
	createBtn(16,"酱爆猪肝",22)
	createBtn(17,"干锅腐竹",22)
	createBtn(20,"干锅有机花菜",22)
	createBtn(21,"小炒肉-辣",22)
	createBtn(9,"椒盐排条",25)
	createBtn(13,"糖醋里脊肉",25)
	createBtn(10,"孜然肥牛卷",28)
	createBtn(24,"砂锅焖鸡",28)
	createBtn(26,"黄焖鳊鱼",28)
	createBtn(27,"咱家酸菜肉",28)
	createBtn(28,"水煮肉片",28)
	createBtn(35,"猪肚鸡锅仔",28)
	createBtn(36,"三鲜锅",28)
	createBtn(29,"水煮鱼片",28)
	createBtn(25,"铁板泰味虾",32)
	createBtn(30,"酸汤肥牛",32)
	createBtn(31,"麻的跳鲜椒牛蛙",38)
	createBtn(34,"红烧牛肉锅",38)

	createBtn(37,"黄焖鸡米饭",16)
	createBtn(38,"玉米排骨饭",18)
	createBtn(39,"海带排骨饭",18)
	createBtn(40,"千张排骨饭",18)
	createBtn(41,"木耳排骨饭",18)
	createBtn(42,"酱香排骨饭",18)
	getPrice()
}

var normal = "background:white; color : black ;margin:5px; font-size:20px; font-family:宋体;"

function selectItem(id, code) {
	console.log(id)
	if (havePointed(id)) {
		document.getElementById("menu").appendChild(document.getElementById(id));
	} else {
		if (name_list[code]) {
			document.getElementById(id).innerText += '-'+name_list[code]	
		}
		document.getElementById("pointed").appendChild(document.getElementById(id));
	}
	getPrice()
}

function havePointed(id) {
	var p = document.getElementById("pointed")
	var n = p.childElementCount 
	var sum = 0
	for ( let i = 1; i<n;i++ ) {
		if (p.children[i].id == id ) {
			return true
		}
	}
	return false
}

function createBtn(id,name, price)
{
	var btn = document.createElement("button");
	btn.innerText = name + ' ['+price+']'
	btn.style=normal
	btn.id = id
	btn.value = price
	document.getElementById("menu").appendChild(btn);
	var flag = true
	btn.addEventListener("click", function(){
		if (havePointed(id)) {
			btn.innerText = name + ' ['+price+']'
		}
		ws.SendMsg(EncodeUint32(id))
	});
}

function getPrice() {
	var p = document.getElementById("pointed")
	var n = p.childElementCount 
	var sum = 0
	for ( let i = 1; i<n;i++ ) {
		sum += Number(p.children[i].value)
	}
	document.getElementById("price").innerHTML = '价格：'+sum + ' 元'
}