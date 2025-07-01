/*
  # Seed Data for VillageFresh

  1. Sample Products
    - Add sample products across different categories
    - Include grocery, fashion, and beauty items

  2. Admin User
    - Create a default admin user (will need to be updated with real auth user ID)
*/

-- Insert sample products
INSERT INTO products (id, name, price, original_price, image, category, unit, description, brand, rating, reviews) VALUES
-- Grocery items
('550e8400-e29b-41d4-a716-446655440001', 'Fresh Tomatoes', 40, 50, ARRAY['https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=300'], 'vegetables', '1 kg', 'Fresh local tomatoes, perfect for cooking', 'Local Farm', 4.5, 127),
('550e8400-e29b-41d4-a716-446655440002', 'Green Onions', 25, NULL, ARRAY['https://images.pexels.com/photos/928251/pexels-photo-928251.jpeg?auto=compress&cs=tinysrgb&w=300'], 'vegetables', 'per bunch', 'Fresh green onions from local farms', 'Local Farm', 4.2, 89),
('550e8400-e29b-41d4-a716-446655440003', 'Fresh Potatoes', 30, NULL, ARRAY['https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=300'], 'vegetables', '1 kg', 'High quality potatoes for all your cooking needs', 'Local Farm', 4.3, 156),
('550e8400-e29b-41d4-a716-446655440004', 'Fresh Carrots', 45, NULL, ARRAY['https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=300'], 'vegetables', '1 kg', 'Sweet and crunchy carrots, rich in vitamins', 'Local Farm', 4.4, 98),

-- Fruits
('550e8400-e29b-41d4-a716-446655440005', 'Fresh Apples', 120, 140, ARRAY['https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300'], 'fruits', '1 kg', 'Crisp and sweet apples, perfect for snacking', 'Premium Fruits', 4.6, 234),
('550e8400-e29b-41d4-a716-446655440006', 'Ripe Bananas', 60, NULL, ARRAY['https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=300'], 'fruits', 'per dozen', 'Sweet and ripe bananas, rich in potassium', 'Local Farm', 4.1, 178),
('550e8400-e29b-41d4-a716-446655440007', 'Fresh Oranges', 80, NULL, ARRAY['https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=300'], 'fruits', '1 kg', 'Juicy oranges packed with vitamin C', 'Citrus Fresh', 4.3, 145),

-- Dairy
('550e8400-e29b-41d4-a716-446655440008', 'Fresh Milk', 55, NULL, ARRAY['https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=300'], 'dairy', 'per liter', 'Pure and fresh milk from local dairy farms', 'Village Dairy', 4.7, 289),
('550e8400-e29b-41d4-a716-446655440009', 'Farm Eggs', 6, NULL, ARRAY['https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=300'], 'dairy', 'per piece', 'Fresh farm eggs, rich in protein', 'Village Farm', 4.5, 167),

-- Grains
('550e8400-e29b-41d4-a716-446655440010', 'Basmati Rice', 180, NULL, ARRAY['https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=300'], 'grains', '1 kg', 'Premium quality basmati rice', 'Golden Grain', 4.8, 345),
('550e8400-e29b-41d4-a716-446655440011', 'Wheat Flour', 45, NULL, ARRAY['https://images.pexels.com/photos/1117386/pexels-photo-1117386.jpeg?auto=compress&cs=tinysrgb&w=300'], 'grains', '1 kg', 'Fresh ground wheat flour for rotis and bread', 'Mill Fresh', 4.4, 198),

-- Beauty products
('550e8400-e29b-41d4-a716-446655440020', 'Himalaya Face Wash', 149, 199, ARRAY['https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300'], 'skincare', '100ml', 'Neem face wash for clear skin', 'Himalaya', 4.5, 1234),
('550e8400-e29b-41d4-a716-446655440021', 'Lakme Lipstick', 299, 399, ARRAY['https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=300'], 'makeup', '3.6g', 'Matte finish lipstick', 'Lakme', 4.3, 856),
('550e8400-e29b-41d4-a716-446655440022', 'L''Oreal Shampoo', 249, 329, ARRAY['https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=300'], 'haircare', '340ml', 'Anti-dandruff shampoo', 'L''Oreal', 4.4, 567),

-- Fashion products
('550e8400-e29b-41d4-a716-446655440030', 'Cotton Kurta Set', 1299, 1599, ARRAY['https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300'], 'men', 'L', 'Comfortable cotton kurta for men', 'Village Wear', 4.5, 234),
('550e8400-e29b-41d4-a716-446655440031', 'Handloom Saree', 2499, 3199, ARRAY['https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=300'], 'women', 'One Size', 'Beautiful handloom saree', 'Traditional Craft', 4.8, 156),
('550e8400-e29b-41d4-a716-446655440032', 'Kids Ethnic Wear', 899, 1199, ARRAY['https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=300'], 'kids', 'Age 5-6', 'Cute ethnic wear for kids', 'Little Angels', 4.6, 89)

ON CONFLICT (id) DO NOTHING;