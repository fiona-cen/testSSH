const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123',
	database: 'heros'
})


app.get('/',(req, res)=>{
	res.send('hi zyl')
})
app.get('/getallhero',(req,res)=>{
	const sql = 'select * from users'
	conn.query(sql, (err, result)=>{
		if (err) res.send({status: 500, msg: err.message, data: null})
		res.send({status:200, msg: 'ok', data: result})
	})
})
app.post('/addhero', (req, res)=>{
	const hero = req.body
	// hero.ctime = new Date()
	const dt = new Date()
	const y = dt.getFullYear()
	const m = (dt.getMonth() + 1).toString().padStart(2,'0')
	const d = (dt.getDate()).toString().padStart(2,'0')

	const hh = dt.getHours().toString().padStart(2,'0')
	const mm = dt.getMinutes().toString().padStart(2,'0')
	const ss = dt.getSeconds().toString().padStart(2,'0')
	hero.ctime = y + '-'+ m +'-'+d +' ' + hh +':'+ mm +':'+ ss

	const sql = 'insert into hero set ?'
	conn.query(sql, hero, (err, result)=>{
		if (err) res.send({status: 500, msg: err.message, data: null})
		res.send({status: 200, msg: 'ok', data: result})
	})
	
})
app.get('/gethero/:id',(req, res)=>{
	const id = req.parms.id
	const sql = 'select * from heros where id = ?'
	conn.query(sql,id,(err, result)=>{
		if (err) return res.send({status:500, msg: err.message, data: null})
		res.send({status: 200, msg: 'ok', data: result})
	})
})
app.post('/posthero:/id',(req, res)=>{
	consst id = req.parms.id
	const newInfo = req.body
	const sql = 'update heros set ? where id = ?'
	conn.query(sql,[newInfo, id])
})
app.listen(5001, ()=>{
	console.log('api server running at 127.0.0.1:5001')
})