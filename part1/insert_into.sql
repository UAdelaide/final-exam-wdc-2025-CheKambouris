INSERT INTO Users
	(username, email, password_hash, role)
VALUES
	(alice123, alice@example.com, hashed123, 'owner'),
	(bobwalker, bob@example.com, hashed456, 'walker'),
	(carol123, carol@example.com, hashed789, 'owner'),
	(sploot, spoot@example.com, supersecure, 'walker'),
	(edgar, edgar@allen.poe, raven333, 'walker');
INSERT INTO
	Dogs (owner_id, name, size)
VALUES
	((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
	((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
	((SELECT user_id FROM Users WHERE username = 'sploot'), 'Tom', 'small'),
	((SELECT user_id FROM Users WHERE username = 'sploot'), 'Jerry', 'medium'),
	((SELECT user_id FROM Users WHERE username = 'sploot'), 'Sanders', 'large');
INSERT INTO WalkRequests
	(dog_id, requested_time, duration_minutes, location, status)
VALUES
	((SELECT dog_id FROM Dogs WHERE name = 'Max', '2025-06-10T08:00:00'), 30, 'Parklands', 'open'),
	((SELECT dog_id FROM Dogs WHERE name = 'Bella', '2025-06-10T09:30:00'), 45, 'Beachside Ave', 'accepted'),
	((SELECT dog_id FROM Dogs WHERE name = 'Tom', '2025-06-11T09:30:00'), 25, 'Burnside', 'cancelled'),
	((SELECT dog_id FROM Dogs WHERE name = 'Jerry', '2025-06-11T012:30:00'), 40, 'Burnside', 'open'),
	((SELECT dog_id FROM Dogs WHERE name = 'Sanders', '2025-06-11T014:30:00'), 120, 'Burnside', 'accepted');