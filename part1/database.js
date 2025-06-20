const mysql = require('mysql2/promise');

let db;

(async () => {
  try {
    // Connect to MySQL without specifying a database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '' // Set your MySQL root password
    });

    // Assume that the database has been setup

    // Now connect to the created database
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });
  await insertData();

  } catch (err) {
    console.error('Error setting up database. Ensure Mysql is running: service mysql start', err);
  }
})();

async function insertData() {
  // Insert data if table is empty
    let [rows] = await db.execute('SELECT COUNT(*) AS count FROM Users');
    if (rows[0].count === 0) {
      await db.execute(
      `INSERT INTO Users
          (username, email, password_hash, role)
        VALUES
          ('alice123', 'alice@example.com', 'hashed123', 'owner'),
          ('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
          ('carol123', 'carol@example.com', 'hashed789', 'owner'),
          ('sploot', 'spoot@example.com', 'supersecure', 'walker'),
          ('edgar', 'edgar@allen.poe', 'raven333', 'walker');`
);
    }

    [rows] = await db.execute('SELECT COUNT(*) AS count FROM Dogs');
    if (rows[0].count === 0) {
      await db.execute(
      `INSERT INTO
          Dogs (owner_id, name, size)
        VALUES
          ((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
          ((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
          ((SELECT user_id FROM Users WHERE username = 'sploot'), 'Tom', 'small'),
          ((SELECT user_id FROM Users WHERE username = 'sploot'), 'Jerry', 'medium'),
          ((SELECT user_id FROM Users WHERE username = 'sploot'), 'Sanders', 'large');`
);
    }

    [rows] = await db.execute('SELECT COUNT(*) AS count FROM WalkRequests');
    if (rows[0].count === 0) {
      await db.execute(
      `INSERT INTO WalkRequests
        (dog_id, requested_time, duration_minutes, location, status)
      VALUES
        ((SELECT dog_id FROM Dogs WHERE name = 'Max'), '2025-06-10T08:00:00', 30, 'Parklands', 'open'),
        ((SELECT dog_id FROM Dogs WHERE name = 'Bella'), '2025-06-10T09:30:00', 45, 'Beachside Ave', 'accepted'),
        ((SELECT dog_id FROM Dogs WHERE name = 'Tom'), '2025-06-11T09:30:00', 25, 'Burnside', 'cancelled'),
        ((SELECT dog_id FROM Dogs WHERE name = 'Jerry'), '2025-06-11T012:30:00', 40, 'Burnside', 'open'),
        ((SELECT dog_id FROM Dogs WHERE name = 'Sanders'), '2025-06-11T014:30:00', 120, 'Burnside', 'accepted');`
);
    }
}

module.exports = db;
