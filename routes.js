const express = require('express');
const router = express.Router();
const db = require('./database')

//create table if it dosent exist and access data from it 
router.get('/tasks', async(req, res) => {
    let q = 'create table IF NOT EXISTs tasks(id INT AUTO_INCREMENT PRIMARY KEY,task_name varchar(50),completed BOOLEAN DEFAULT FALSE,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);';
    db.query(q, (err, result) => {
        if (err) throw err;
        db.query('select * from tasks', (err, result) => {
            if (err) throw err;
            console.log(result)
            res.status(200).json(result);
        })
        return;
    })
    
})

// insurt new  task in data base
router.post('/tasks', (req, res) => {
    const {task_name} = req.body;
    if(task_name){
    let q = 'INSERT INTO tasks (task_name) VALUES(?)'
    db.query(q, [task_name], (err, result) => {
        if (err) throw err;
        db.query('SELECT * FROM tasks WHERE id = ?',[result.insertId],(err, result)=>{
            if(err) throw err;
            res.status(200).json(result);
        })
        return;
    })
}else{
    res.json({error:"Please Enter task"});
}

})

router.patch('/tasks/:id', (req, res)=>{
    const q = 'UPDATE tasks SET completed= NOT completed WHERE id = ?';
    db.query(q,[req.params.id],(err, result)=>{
        if(err) throw err;
        db.query('select * from tasks WHERE id = ?',[req.params.id],(err, result)=>{
            if(err) throw err;
            console.log(result)
            res.status(200).json(result);
        })
        return;
    })
})
router.delete('/tasks/:id', (req, res)=>{
    const q = 'DELETE FROM tasks where id=?'
db.query(q,[req.params.id],(err, result)=>{
    if(err) throw err;
    res.status(200).json({massage:"task removed"});
    return;
})
})

module.exports = router;