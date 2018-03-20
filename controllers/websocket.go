package controllers

import (
	"net/http"
	"sync"
	//	"time"

	. "github.com/soekchl/myUtils"
	"github.com/soekchl/websocket"
)

var (
	websocketList      []*websocket.Conn
	websocketListMutex sync.RWMutex
	wsPort             = ":8081"
)

func init() {
	http.Handle("/ws", websocket.Handler(websocketPorcess))

	go func() {
		Notice("监听 ", wsPort, " 端口.")
		err := http.ListenAndServe(wsPort, nil)
		if err != nil {
			Error(err)
		}
	}()

	//	go func() {
	//		for {
	//			time.Sleep(time.Second * 3)
	//			sendWebSocket(EncodeInt32(1))
	//		}
	//	}()
}

func websocketPorcess(ws *websocket.Conn) {
	websocketListMutex.Lock()
	websocketList = append(websocketList, ws)
	websocketListMutex.Unlock()

	defer func() {
		Notice("断开连接.")
		defer ws.Close()
	}()

	var (
		buff []byte
		err  error
	)

	Notice("接入进来 - ", name, code)
	co := code

	for {
		err = websocket.Message.Receive(ws, &buff)
		if err != nil {
			Error(err)
			break
		}
		Debug("接受数据：", buff)
		c := DecodeUint32(buff)
		if select_id[c] > 0 {
			Notice("退", select_id[c], c)
			select_id[c] = 0
		} else {
			select_id[c] = co
			Notice("点")
		}
		// 地址编号
		buff = append(buff, EncodeInt32(co)...)
		sendWebSocket(buff)
	}
}

func sendWebSocket(buff []byte) {
	websocketListMutex.RLock()
	for _, v := range websocketList {
		websocket.Message.Send(v, buff)
	}
	websocketListMutex.RUnlock()
}

func DecodeUint32(data []byte) uint32 {
	return (uint32(data[3]) << 24) | (uint32(data[2]) << 16) | (uint32(data[1]) << 8) | uint32(data[0])
}

func EncodeInt32(n int32) (b []byte) {
	b = make([]byte, 4)
	b[0] = byte(n & 0xFF)
	b[1] = byte((n >> 8) & 0xFF)
	b[2] = byte((n >> 16) & 0xFF)
	b[3] = byte((n >> 24) & 0xFF)
	return
}
