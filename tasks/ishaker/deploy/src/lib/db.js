import Db from 'mysql2-async'
import matter from "gray-matter";
import glob from 'fast-glob'

// const conn = new Db({
//     host: "localhost",
//     user: "root",
//     password: process.env.MARIADB_ROOT_PASSWORD||"",
//     database: "ctf_blog",
//     waitForConnections: true,
// })

const conn = new Db({
    host: "mariadb",
    port: 3306,
    user: "fif",
    password: "sussykafifi0n",
    database: "fifdb",
    waitForConnections: true,
    connectionLimit: 10
})

const getPosts = async () => {
    try {
        return await conn.getall("SELECT * FROM posts LIMIT 3")
    } catch (e) {
        console.log(e)
        return []
    }
}

const getPost = async (id) => {
    try {
        return await conn.getrow(`SELECT * FROM posts WHERE id='${id}'`)
    } catch (e) {
        console.log(e)
        return {content: e.toString()}
    }
}

const preInit = async () => {
    await conn.execute('DROP TABLE IF EXISTS posts')
    await conn.execute(`
CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  img TEXT,
  content TEXT NOT NULL,
  PRIMARY KEY (id)
)
`)
    await conn.execute('DROP TABLE IF EXISTS flag')
    await conn.execute(`
CREATE TABLE flag (
  id INT NOT NULL AUTO_INCREMENT,
  flag TEXT,
  PRIMARY KEY (id)
)
  `)
    await conn.execute(`INSERT INTO flag (flag) VALUES ('vrnctf{F1F_S3RUM_INJ3CTI0N}')`)
    // read files from etc folder\
    const files = await glob('etc/*.md')
    for (const file of files) {
        console.log("reading",file)
        const {data:meta, content} = matter.read(file)
        await conn.execute(
            `INSERT INTO posts (title, author, img, content) VALUES (?, ?, ?, ?)`,
            [meta.title, meta.author, meta.img, content]
        )
    }
}

export {conn, getPosts, getPost, preInit}