-- Active: 1692708691359@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL,
    role TEXT NOT NULL, 
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    creator_name TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER NOT NULL,
    deslikes INTEGER NOT NULL,
    comments INTEGER NOT NULL, 
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
      ON UPDATE CASCADE
	    ON DELETE CASCADE
);

CREATE TABLE likeDeslikePost(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
      ON UPDATE CASCADE
	  ON DELETE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts(id)
      ON UPDATE CASCADE
	  ON DELETE CASCADE
);

CREATE TABLE comments(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    post_id TEXT NOT NULL,
    comment TEXT NOT NULL,
    likes INTEGER NOT NULL,
    deslikes INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
      ON UPDATE CASCADE
	    ON DELETE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts(id)
      ON UPDATE CASCADE
	    ON DELETE CASCADE
);

CREATE TABLE likeDeslikeComments(
    comments_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
      ON UPDATE CASCADE
	    ON DELETE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts(id)
      ON UPDATE CASCADE
	    ON DELETE CASCADE
    FOREIGN KEY (comments_id) REFERENCES comments(id)
      ON UPDATE CASCADE
	    ON DELETE CASCADE
);
