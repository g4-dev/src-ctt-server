import client from "../config/database.js";

class TranscriptRepo {
  create(transcript) {
    return client.query(
      "INSERT INTO beers (name, content, is_live, created_at) VALUES ($1, $2, $3, $4)",
      transcript.name,
      transcript.content,
      transcript.is_live,
      transcript.created_at || new Date('now')
    );
  }

  selectAll() {
    return client.query("SELECT * FROM beers ORDER BY id");
  }

  selectById(id) {
    return client.query(`SELECT * FROM beers WHERE id = $1`, id);
  }

  update(id, transcript) {
    var query = `UPDATE beers `;
    var hasSet = false;
    if (transcript.name !== undefined) {
      query +=
        ` SET name = '${transcript.name}'` + (transcript.content !== undefined ? "," : "");
      hasSet = true;
    }

    if (transcript.content !== undefined) {
      if (!hasSet) query += " SET ";
      query +=
        ` content = '${transcript.content}'` + (transcript.is_live !== undefined ? "," : "");
      hasSet = true;
    }

    if (transcript.is_live !== undefined) {
      if (!hasSet) query += " SET ";
      query += ` is_live = '${transcript.is_live}'`;
    }

    query += ` WHERE id = ${id}`;
    return client.query(query);
  }

  delete(id) {
    return client.query(`DELETE FROM beers WHERE id = $1`, id);
  }
}

export default new TranscriptRepo();