const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_restaurants_table_sql = "DELETE FROM restaurants;"

db.execute(delete_restaurants_table_sql);

const delete_subjects_table_sql = "DELETE FROM subjects;"

db.execute(delete_subjects_table_sql);