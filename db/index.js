const {Pool} = require('pg');

const PG_URI =
  'postgres://mvdripev:rt1LuFe_5KYSBHe6pk1-ODLBWm9fg8aA@kashin.db.elephantsql.com/mvdripev';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}