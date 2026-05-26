/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `price` (numeric, not null)
      - `category` (text, not null)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (product catalog is public)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  category text NOT NULL DEFAULT '',
  description text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);
