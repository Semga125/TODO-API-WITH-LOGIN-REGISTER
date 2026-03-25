
const db = require("../db.js");
const bcrypt = require("bcrypt");

const postUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).send("Enter login and Password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO backend (login,password) VALUES (?,?)",
      [login, hashedPassword]
    );
    res.status(201).json({ message: "User created", id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "login already exists" });
    }
    console.error("DB error:", err);
    res.status(500).send("Server error");
  }
};

const getTasks = (req, res) => {
  res.send("Tasks route works!");
};

const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).send("Enter login and Password");
    }

    const [rows] = await db.query('SELECT * FROM backend WHERE login = ?', [login]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "wrong password" });
    }
    res.status(200).json({ message: "Login success" });

  } catch (err) {
    console.error("DB error:", err);
    res.status(500).send("Server error");
  }
};

const postTodo  = async (req, res) => {
    try {
        const { task } = req.body;

        if (!task) {
            return res.status(400).send("Task is required");
        }

        const [result] = await db.execute(
            "INSERT INTO tasks (task) VALUES (?)",
            [task]
        );

        
        res.json({
            id: result.insertId,
            task: task
        });

    } catch (err) {
        console.log(`помилка: ${err}`);
        res.status(500).send("Server error");
    }
};
const getTodo =  async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    console.error("Помилка при отриманні tasks:", err);
    res.status(500).send("Server error");
  }
};
const deleteTodo =  async (req, res) => {
    try{  const { id } = req.params;

  await db.execute("DELETE FROM tasks WHERE id = ?", [id]);

  res.send("Deleted");}
catch (err){
    console.log()
}
};






module.exports = {
  getTasks,
  postUser,
  loginUser,
  getTodo,
  postTodo,
  deleteTodo
};
