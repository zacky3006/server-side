CREATE TABLE Product (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    price INT,
    color VARCHAR(255),
    gender INT NOT NULL,
    categories VARCHAR(255),
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES Category(category_id) 
);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('ZW COLLECTION WATER-REPELLENT TRENCH COAT', 'เสื้อโค้ทกันน้ำทำจากเส้นใยฝ้าย คอปกและแขนยาวพร้อมสายรัดที่ข้อมือที่สามารถปรับได้ กระเป๋าหน้า เข็มขัดปรับได้พร้อมสายรัด รายละเอียดที่ไหล่ มีการปิดกระดุมแบบดับเบิลบรัสเต็ดที่ด้านหน้า', 'Picture/1W.jpg', 4990, 'Brown', 1, 'Coats', 3);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('TRENCH COAT WITH BELT', 'เสื้อโค้ทมีเข็มขัด คอปกและแขนยาวพร้อมการปิดด้วยตะขอและกระดุม กระเป๋าหน้าทรงแบน การปิดกระดุมแบบดับเบิลบรัสเต็ดและเข็มขัดที่ตรงกัน', 'Picture/2W.jpg', 3790, 'Black', 1, 'Coats', 3);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('100% SUEDE LEATHER COAT ZW COLLECTION LIMITED EDITION', 'เสื้อโค้ททำจากหนังนุ่ม 100% คอปกตัดและแขนยาว กระเป๋าหน้าทรงแบน รายละเอียดการเย็บที่ตะเข็บแบบ Tonal เส้นด้ายที่ด้านใน ปิดกระดุมที่ด้านหน้า', 'Picture/3W.jpg', 8990, 'Brown', 1, 'Coats', 3);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('OVERSIZE SHORT SUEDE LEATHER TRENCH COAT', 'เสื้อโค้ทสั้นแบบโอเวอร์ไซส์ทำจากหนังนุ่ม 100% คอปกและแขนยาวพร้อมการออกแบบไหล่ตก กระเป๋าหน้าทรงแบน เข็มขัดปรับได้ในวัสดุเดียวกันพร้อมการปิดด้วยกระดุม', 'Picture/4W.jpg', 15990, 'Brown', 1, 'Coats', 3);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('ZW COLLECTION FAUX FUR COAT', 'เสื้อโค้ทแขนยาวพร้อมคอปก กระเป๋าหน้า การปิดด้วยตะขอซ่อน', 'Picture/5W.jpg', 5490, 'Grey', 1, 'Coats', 3);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('LEATHER EFFECT CROPPED BIKER JACKET', 'เสื้อแจ็กเก็ตสไตล์ไบค์เกอร์แบบครอป คอปกและแขนยาว พร้อมกระเป๋าหน้าพร้อมซิปโลหะ ซับในตรงกัน และการปิดด้วยซิปข้าม', 'Picture/6W.jpg', 2490, 'Brown', 1, 'Jacket', 2);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('SHIMMER EFFECT BIKER JACKET', 'เสื้อแจ็กเก็ตสั้นพร้อมคอปกและแขนยาวพร้อมซิปที่ข้อมือและปีกไหล่ กระเป๋าหน้าทรงแบนและเนื้อผ้ามันวาว ขอบเสื้อเสร็จสิ้นด้วยเข็มขัดปีกซิปโลหะที่ด้านหน้า', 'Picture/7W.jpg', 2490, 'Black', 1, 'Jacket', 2);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('SOFT PLACKET JACKET', 'เสื้อแจ็กเก็ตแขนยาวคอปกกลม รายละเอียดกระดุมหน้ากระเป๋าหน้า ปลายแขนยืดหยุ่น ซิปสีทองที่ด้านหน้า', 'Picture/8W.jpg', 2190, 'White', 1, 'Jacket', 2);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('CONTRAST 100% SUEDE LEATHER JACKET WITH PLEAT', 'เสื้อแจ็กเก็ตทำจากหนังนุ่ม 100% คอปกทอจากวัสดุเดียวกัน แขนยาวพร้อมกระดุมที่ข้อมือ กระเป๋าหน้า รายละเอียดการเย็บที่ตะเข็บและพับที่หลัง ซับใน การปิดด้วยซิปและกระดุมปุ่ม', 'Picture/9W.jpg', 8990, 'Brown', 1, 'Jacket', 2);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('SUEDE LEATHER JACKET', 'เสื้อแจ็กเก็ตทำจากหนังนุ่ม 100% คอสูงและแขนยาว กระเป๋าข้างและกระเป๋าหมอนที่อก ซับใน ปิดซิปที่ด้านหน้า', 'Picture/10W.jpg', 5490, 'Brown', 1, 'Jacket', 2);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('SLIM FIT T-SHIRT WITH SUPIMA® COTTON', 'เสื้อยืดทำจากเส้นใยฝ้าย 51% คอกลมและแขนสั้น', 'Picture/11W.jpg', 790, 'Black', 1, 'T-shirt', 1);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('CHECKED TULLE DRAPED T-SHIRT', 'เสื้อยืดจากผ้าทูลล์โปร่งใสพร้อมคอที่ไม่สมมาตรและแขนยาว รายละเอียดพลิ้วไหวที่ด้านหน้าและชายเสื้อที่ไม่สมมาตร', 'Picture/12W.jpg', 990, 'Brown', 1, 'T-shirt', 1);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('ENZYME WASH COTTON T-SHIRT', 'เสื้อยืดผ้าฝ้ายที่ผ่านการซักด้วยเอนไซม์ คอกลมและแขนสั้น', 'Picture/13W.jpg', 590, 'Grey', 1, 'T-shirt', 1);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('100% SOFT WOOL T-SHIRT', 'เสื้อยืดทำจากเส้นใยขนแกะ 100% คอกลมและแขนสั้น', 'Picture/14W.jpg', 590, 'Brown', 1, 'T-shirt', 1);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('TURTLENECK T-SHIRT', 'เสื้อยืดทำจากเส้นใยฝ้ายผสม มีกระดุมคอสูงและแขนยาว', 'Picture/15W.jpg', 790, 'White', 1, 'T-shirt', 1);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('WIDE-LEG TROUSERS WITH ELASTIC WAISTBAND', 'กางเกงเอวสูงพร้อมขอบยางยืดและเข็มขัดตรงกัน รายละเอียดรอยพับที่เด่นที่ด้านหน้า กระเป๋าข้างและกระเป๋าหลัง ซิปที่มีกระดุมและฮุกที่ด้านหน้า', 'Picture/16W.jpg', 1790, 'White', 1, 'Trousers', 4);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('EMBROIDERED TROUSERS', 'กางเกงขากลมทำจากเส้นใยฝ้าย เอวยางยืด กระเป๋าหน้า รายละเอียดโลโก้ปักที่ตัดกับสี', 'Picture/17W.jpg', 1790, 'White', 1, 'Trousers', 4);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('ZW COLLECTION CHINO TROUSERS', 'กางเกงทำจากเส้นใยผสมฝ้าย 17% ลินิน เอวกลางพร้อมห่วงเข็มขัด กระเป๋าหน้าและหลัง การเย็บแบบตัดที่ด้านหน้า ซิปที่มีกระดุมที่ด้านหน้า', 'Picture/18W.jpg', 2990, 'Brown', 1, 'Trousers', 4);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('DARTED TROUSERS', 'กางเกงเอวสูงพร้อมห่วงเข็มขัด รอยพับที่ด้านหน้า กระเป๋าข้างและกระเป๋าหลัง ซิปที่มีกระดุมที่ด้านหน้า', 'Picture/19W.jpg', 1990, 'Black', 1, 'Trousers', 4);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('STRAIGHT TROUSERS WITH DRAWSTRING', 'กางเกงเอวกลางพร้อมขอบยางยืดและเชือกผูกรอบ เอวและกระเป๋าหลัง', 'Picture/20W.jpg', 1690, 'White', 1, 'Trousers', 4);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('Z1975 HIGH-WAIST WIDE-LEG JEANS', 'ยีนส์เอวสูงพร้อมห่วงเข็มขัด กระเป๋าห้าจุด ปลายขากระจายออก ซิปที่มีกระดุมที่ด้านหน้า', 'Picture/21W.jpg', 1990, 'White', 1, 'Jeans', 5);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('ZW COLLECTION HIGH-WAIST BOOTCUT CROPPED JEANS', 'ยีนส์เอวสูงพร้อมห่วงเข็มขัด กระเป๋าห้าจุด ปลายขากระจายออก ซิปที่มีกระดุมที่ด้านหน้า', 'Picture/22W.jpg', 1990, 'White', 1, 'Jeans', 5);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('ZW COLLECTION WIDE-LEG MID-RISE JEANS', 'ยีนส์เอวกลางพร้อมห่วงเข็มขัด กระเป๋าห้าจุด ดีไซน์ฟอกสี ซิปที่มีกระดุมโลหะที่ด้านหน้า', 'Picture/23W.jpg', 1990, 'Grey', 1, 'Jeans', 5);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('TRF CURVED HIGH-WAIST JEANS', 'ยีนส์เอวสูงพร้อมห่วงเข็มขัดและกระเป๋าห้าจุด ซิปที่มีกระดุมโลหะที่ด้านหน้า', 'Picture/24W.jpg', 1990, 'Black', 1, 'Jeans', 5);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ('Z1975 HIGH-WAIST STRAIGHT-LEG DENIM JEANS', 'ยีนส์เอวสูงพร้อมห่วงเข็มขัดและกระเป๋าห้าจุด ซิปที่มีกระดุมโลหะที่ด้านหน้า', 'Picture/25W.jpg', 1690, 'Black', 1, 'Jeans', 5);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'LIMITED EDITION CONTRAST NECK T-SHIRT', 'เสื้อยืดทรงหลวมคอปกทรงกลม มีดีเทลคอปกสองชั้นที่ตัดสีต่างจากตัวเสื้อและแขนยาว', 'Picture\1M.jpg', 1690, 'Brown', 2, 'T-shirt', 1);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'LIMITED EDITION COTTON BLEND KNIT T-SHIRT', 'เสื้อยืดถักผสมฝ้ายและขนแกะ 15% มีคอปกทรงกลม แขนสั้น และขอบแขนถัก', 'Picture\2M.jpg', 2490, 'Grey', 2, 'T-shirt', 1);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'LIMITED EDITION STRIPED T-SHIRT', 'เสื้อยืดทรงหลวม ลายทาง คอปกทรงกลม และแขนยาว', 'Picture\3M.jpg', 1690, 'White', 2, 'T-shirt', 1);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'CROPPED FIT DENIM T-SHIRT', 'เสื้อยืดสั้นทรงพอดีตัวทำจากผ้ายีนส์ยืด คอปกทรงกลม แขนสั้น ดีเทลสีซีดและชายขอบหยาบ', 'Picture\4M.jpg', 1690, 'Black', 2, 'T-shirt', 1);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'STRIPED T-SHIRT', 'เสื้อยืดทรงหลวมทำจากผ้าผสมไลโอเซลล์ คอปกทรงกลม แขนยาว', 'Picture\5M.jpg', 1490, 'Grey', 2, 'T-shirt', 1);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'CROPPED TRENCHCOAT', 'เสื้อโค้ทยาวทรงหลวมทำจากผ้าผสมไลโอเซลล์ คอปกทรงกลม แขนยาว', 'Picture\6M.jpg', 4490, 'Black', 2, 'Jacket', 2);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'CROPPED FIT JACKET', 'แจ็กเก็ตทรงหลวมทำจากผ้าบางเบาผสมวิสโคส คอปกยาว แขนยาวมีดีเทลกระดุมที่ข้อมือ กระเป๋าหน้า ซิปด้านหน้า', 'Picture\7M.jpg', 3790, 'Black', 2, 'Jacket', 2);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'REGULAR FIT WATER-REPELLENT JACKET', 'แจ็กเก็ตทรงปกติทำจากผ้ากันน้ำที่ช่วยป้องกันน้ำฝนในระยะเวลาสั้นๆ', 'Picture\8M.jpg', 3190, 'Black', 2, 'Jacket', 2);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'VISCOSE BLEND OVERSHIRT', 'เสื้อเชิ้ตทรงปกติทำจากผ้าผสมวิสโคส คอปกยาว แขนยาวมีดีเทลกระดุมที่ข้อมือ กระเป๋าหน้า ซิปด้านหน้า', 'Picture\9M.jpg', 3190, 'White', 2, 'Jacket', 2);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'HERRINGBONE OVERSHIRT', 'เสื้อเชิ้ตทรงปกติ คอปกยาว แขนยาวพร้อมกระดุมที่ข้อมือและกระดุมที่หน้าเสื้อ', 'Picture\10M.jpg', 3790, 'Grey', 2, 'Jacket', 2);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( '2-IN-1 WATER-REPELLENT PARKA', 'พาร์กาทรงหลวมทำจากผ้าเทคนิคที่กันน้ำ ช่วยป้องกันการโดนน้ำฝนระยะเวลาสั้นๆ พร้อมซับในที่สามารถถอดออกได้', 'Picture\11M.jpg', 5490, 'Black', 2, 'Coats', 3);

INSERT INTO Product (name, description, image_url, price, color, gender, categories, category_id)
VALUES ( 'LIMITED EDITION RELAXED FIT TRENCH COAT', 'เสื้อโค้ททรงหลวมทำจากผ้าแข็งแรง คอปกทรงคอมป์แอคท ข้อมือปรับได้ ซิปที่หน้าเสื้อ', 'Picture\12M.jpg', 8990, 'Brown', 2, 'Coats', 3);
