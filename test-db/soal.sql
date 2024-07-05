USE school;

-- Soal 1
SELECT students.name AS students_name, classes.name AS classes, teachers.name AS teachers_name
FROM students
LEFT JOIN classes ON students.class_id=classes.id
LEFT JOIN teachers ON classes.teacher_id=teachers.id;

-- Soal 2
SELECT classes.name AS classes
FROM classes
WHERE classes.teacher_id IN (
	SELECT classes.teacher_id
    FROM classes
	GROUP BY classes.teacher_id
	HAVING COUNT(*) > 1
);

-- Soal 3
CREATE VIEW soal_3 AS
	SELECT students.name AS students_name, classes.name AS classes, teachers.name AS teachers_name
	FROM students
	LEFT JOIN classes ON students.class_id=classes.id
	LEFT JOIN teachers ON classes.teacher_id=teachers.id;

-- Soal 4
DELIMITER //
CREATE PROCEDURE get_soal_4()
BEGIN
	SELECT students.name AS students_name, classes.name AS classes, teachers.name AS teachers_name
	FROM students
	LEFT JOIN classes ON students.class_id=classes.id
	LEFT JOIN teachers ON classes.teacher_id=teachers.id;
END//
DELIMITER ;

-- Soal 5
DELIMITER //
DROP PROCEDURE IF EXISTS custom_error//
CREATE PROCEDURE custom_error(IN error_text VARCHAR(50))
BEGIN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT=error_text;
END//
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS update_classes_table//
CREATE PROCEDURE update_classes_table(IN name_i VARCHAR(50), IN teacher_id_i INT)
BEGIN
	IF EXISTS (SELECT 1 FROM classes WHERE classes.name=name_i AND classes.teacher_id=teacher_id_i) THEN
		CALL custom_error("Duplicated!");
    ELSE
		INSERT INTO classes (name, teacher_id) VALUES (name_i, teacher_id_i);
	END IF;
END//
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS update_teachers_table//
CREATE PROCEDURE update_teachers_table(IN name_i VARCHAR(100), IN subject_i VARCHAR(50))
BEGIN
	IF EXISTS (SELECT 1 FROM teachers WHERE teachers.name=name_i AND teachers.subject=subject_i) THEN
		CALL custom_error("Duplicated!");
    ELSE
		INSERT INTO teachers (name, subject) VALUES (name_i, subject_i);
	END IF;
END//
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS update_students_table//
CREATE PROCEDURE update_students_table(IN name_i VARCHAR(100), IN age_i INT, IN class_id_i INT)
BEGIN
	IF EXISTS (SELECT 1 FROM students WHERE students.name=name_i AND students.age=age_i AND students.class_id=class_id_i) THEN
		CALL custom_error("Duplicated!");
    ELSE
		INSERT INTO students (name, age, class_id) VALUES (name_i, age_i, class_id_i);
	END IF;
END//
DELIMITER ;

-- Testing
CALL update_classes_table('Kelas 10A', 1); -- An Error should be raised because duplicated
CALL update_teachers_table('Pak Anton', 'Matematika'); -- An Error should be raised because duplicated
CALL update_students_table('Budi', 16, 1); -- An Error should be raised because duplicated
