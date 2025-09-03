insert into products (slug, name, price, category, rating, eta_mins, desc, img) values
('pepperoni-slice','Pepperoni Slice',4.5,'savory',4.7,18,'Cheesy late-night classic with spicy pepperoni.','https://images.unsplash.com/photo-1548365328-9f547fb09554?q=80&w=1200&auto=format&fit=crop'),
('crispy-fries','Crispy Fries',3.2,'savory',4.6,14,'Golden shoestring fries with sea salt.','https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop'),
('choco-cookie','Warm Choco Cookie',2.8,'sweet',4.8,12,'Fresh-baked, gooey center.','https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop'),
('cola-can','Cola Can',1.9,'drinks',4.5,10,'Chilled, fizzy, and refreshing.','https://images.unsplash.com/photo-1587385789090-0383d1b13d14?q=80&w=1200&auto=format&fit=crop'),
('movie-night-box','Movie Night Box',11.5,'boxes',4.6,22,'Popcorn, cookies, gummies, and a cola.','https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?q=80&w=1200&auto=format&fit=crop');
insert into addons (product_id, name, price) select p.id, 'Extra Cheese', 0.8 from products p where p.slug='pepperoni-slice';
insert into addons (product_id, name, price) select p.id, 'Garlic Dip', 0.6 from products p where p.slug='pepperoni-slice';
