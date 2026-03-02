CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS plants (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  species VARCHAR(255),
  image TEXT,
  watering_days INTEGER DEFAULT 3,
  description TEXT,
  watering_info TEXT,
  sunlight TEXT,
  toxicity TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
