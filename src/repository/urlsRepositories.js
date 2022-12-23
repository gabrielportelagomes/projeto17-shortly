import connection from "../database/db.js";

export function insertUrl(id, url, shortUrl) {
  return connection.query(
    `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);`,
    [id, url, shortUrl]
  );
}

export function selectUrlInfos(id) {
  return connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id=$1;`, [
    id,
  ]);
}

export function selectUrl(shortUrl) {
  return connection.query(`SELECT url FROM urls WHERE "shortUrl"=$1;`, [
    shortUrl,
  ]);
}

export function updateVisitCount(shortUrl) {
  return connection.query(
    `UPDATE urls SET "visitCount"="visitCount"+1 WHERE "shortUrl"=$1;`,
    [shortUrl]
  );
}

export function deleteUrlById(urlId) {
  return connection.query(`DELETE FROM urls WHERE id=$1;`, [urlId]);
}

export function selectUrlByIdAndUserId(id, userId) {
  return connection.query(`SELECT * FROM urls WHERE id=$1 AND "userId"=$2;`, [
    id,
    userId,
  ]);
}
