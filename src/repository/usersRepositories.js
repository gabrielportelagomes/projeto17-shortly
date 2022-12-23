import connection from "../database/db.js";

export function insertUser(name, email, hashPassword) {
  return connection.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
    [name, email, hashPassword]
  );
}

export function selectUserInfos(userId) {
  return connection.query(
    `WITH url_table AS (SELECT urls.id AS "id", urls."shortUrl", urls.url, urls."visitCount" FROM urls WHERE urls."userId"=$1)
    SELECT users.id, users.name, SUM(COALESCE(urls."visitCount", 0)) AS "visitCount", 
    COALESCE(NULLIF(JSON_AGG(url_table.*)::TEXT, '[null]'), '[]'):: JSON AS "shortenedUrls" 
          FROM users 
          LEFT JOIN urls ON urls."userId"=users.id 
          LEFT JOIN url_table ON urls.id=url_table.id
          WHERE users.id=$1 GROUP BY users.id;`,
    [userId]
  );
}

export function selectRanking() {
  return connection.query(
    `SELECT users.id, users.name, COUNT(urls."shortUrl") AS "linksCount", SUM(COALESCE(urls."visitCount", 0)) AS "visitCount" 
        FROM users
        LEFT JOIN urls ON urls."userId"=users.id 
        GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10`
  );
}

export function selectUserByIdAndEmail(userId, userEmail) {
  return connection.query(`SELECT id FROM users WHERE id=$1 AND email=$2;`, [
    userId,
    userEmail,
  ]);
}

export function selectUserByEmail(email) {
  return connection.query(`SELECT * FROM users WHERE email=$1;`, [email]);
}
