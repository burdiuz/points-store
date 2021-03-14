DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS points;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE points (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  amount INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  amount INTEGER NOT NULL DEFAULT 0,
  title TEXT NOT NULL,
  description TEXT,

  /* TYPE - "debet", "credit", "fine" */
  type TEXT NOT NULL,
  duration INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  salt TEXT NOT NULL,

  /* ROLE - "sender", "receiver", "admin" */
  role TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  task_id INTEGER,
  comment TEXT,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users (id),
  FOREIGN KEY (receiver_id) REFERENCES users (id),
  FOREIGN KEY (task_id) REFERENCES tasks (id)
);

INSERT INTO users (
  username,
  password,
  salt,
  role
) VALUES (
  "admin",
  /* Default password: admin */
  "e77f0b9cfe436d3217ab9868f466a004f6322f78d61fa53f33ece3191b726cdbdaa249eb2c3f03d7fe3ef1428185150dab06158e0d344ca968649d36e3856384",
  "69cb36f790524d588c3362785c1b10de",
  "admin"
);

INSERT INTO points (user_id, amount) VALUES (1, 0);
