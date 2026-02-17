-- LingoVision Seed Data: Vocabulary Lesson (Spanish)
-- Run this AFTER schema.sql in Supabase SQL Editor
-- Matches Michael's DayTwo.tsx hardcoded data exactly

-- Insert the demo unit
INSERT INTO units (id, title, description, language) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Vocabulary Lesson',
  'Learning Spanish through Images',
  'Spanish'
);

-- 11 cards matching frontend DayTwo.tsx LESSON_DATA
INSERT INTO cards (id, unit_id, position, english, spanish, image, pronunciation, sentence, situation_image) VALUES

('1', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 1,
 'Apple', 'Manzana', '/images/apple.svg', 'mahn-SAH-nah',
 'Ella come una manzana en el parque.', '/images/apple.svg'),

('2', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 2,
 'Cat', 'Gato', '/images/cat.svg', 'GAH-toh',
 'El gato duerme sobre el sofá.', '/images/cat.svg'),

('3', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 3,
 'Book', 'Libro', '/images/book.svg', 'LEE-broh',
 'Leo un libro interesante antes de dormir.', NULL),

('4', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 4,
 'House', 'Casa', '/images/house.svg', 'KAH-sah',
 'Nuestra casa tiene un jardín pequeño.', NULL),

('5', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 5,
 'Water', 'Agua', '/images/water.svg', 'AH-gwah',
 'Bebo agua después de correr.', NULL),

('6', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 6,
 'Flower', 'Flor', '/images/flower.svg', 'FLOHR',
 'La flor huele muy bien en el jardín.', NULL),

('7', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 7,
 'Sun', 'Sol', '/images/sun.svg', 'SOHL',
 'El sol brilla en un día de verano.', NULL),

('8', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 8,
 'Tree', 'Árbol', '/images/tree.svg', 'AHR-bohl',
 'Nos sentamos bajo el árbol cuando hace calor.', NULL),

('9', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 9,
 'Dog', 'Perro', '/images/dog.svg', 'PEH-rroh',
 'El perro corre feliz por la playa.', NULL),

('10', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 10,
 'Bread', 'Pan', '/images/bread.svg', 'PAHN',
 'Compré pan fresco en la panadería.', NULL),

('11', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', 11,
 'Watch out', 'Cuidado', '/images/snowboard.jpg', 'koo-ee-DAH-doh',
 '¡Cuidado, Eduardo!', '/images/snowboard.jpg');
