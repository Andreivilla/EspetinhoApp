import { getQuery } from '../db';
import { getAll } from '../db';

export async function fetchNTables() {
  const sql = `SELECT COUNT(*) AS total FROM MESAS`;

  const result = await getQuery<{ total: number }>(sql);
  return result?.total;
}


/*--insere mesa
INSERT INTO MESAS (id)
SELECT COALESCE(MAX(id), 0) + 1 FROM MESAS;


--tira a ultima mesa 
DELETE FROM MESAS
WHERE id = (SELECT MAX(id) FROM MESAS);

--conta as mesas
SELECT COUNT(*) FROM MESAS */