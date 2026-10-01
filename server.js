const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost') ? { rejectUnauthorized:false } : false });
app.use(express.json({limit:'100kb'}));
app.use(express.static(__dirname));
async function init(){await pool.query(`CREATE TABLE IF NOT EXISTS checklist_state (id INTEGER PRIMARY KEY, state JSONB NOT NULL DEFAULT '{}'::jsonb, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);await pool.query(`INSERT INTO checklist_state(id,state) VALUES(1,'{}'::jsonb) ON CONFLICT(id) DO NOTHING`)}
app.get('/api/state', async (req,res)=>{try{const r=await pool.query('SELECT state FROM checklist_state WHERE id=1');res.json(r.rows[0]?.state||{})}catch(e){console.error(e);res.status(500).json({error:'db'})}});
app.put('/api/state', async (req,res)=>{try{const state=req.body&&typeof req.body==='object'&&!Array.isArray(req.body)?req.body:{};await pool.query('UPDATE checklist_state SET state=$1::jsonb, updated_at=NOW() WHERE id=1',[JSON.stringify(state)]);res.json({ok:true})}catch(e){console.error(e);res.status(500).json({error:'db'})}});
app.use((req,res)=>res.sendFile(path.join(__dirname,'index.html')));
const port=process.env.PORT||3000;init().then(()=>app.listen(port,()=>console.log(`Listening on ${port}`))).catch(e=>{console.error(e);process.exit(1)});
