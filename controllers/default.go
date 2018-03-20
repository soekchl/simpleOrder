package controllers

import (
	"strings"

	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

var (
	select_id = make(map[uint32]int32)
	ipMap     = make(map[string]int32)
	nameList  = []string{
		"",
		"Luke",
		"Phone",
		"Yang",
	}
	name = ""
	code = int32(0)
)

func init() {
	// IP地址 编号
	ipMap["10.0.82.68"] = 1
	ipMap["10.0.82.97"] = 2
	ipMap["10.0.82.100"] = 3
}

func (c *MainController) Get() {
	c.TplName = "index.tpl"
	c.Data["selectItem"] = select_id
	c.Data["nameList"] = nameList
	ip := c.Ctx.Request.RemoteAddr
	ips := strings.Split(ip, ":")
	code = ipMap[ips[0]]
	beego.Notice(ips[0])
	name = nameList[ipMap[ips[0]]]
}
