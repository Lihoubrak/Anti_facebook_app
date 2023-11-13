import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import db from '../Database';
export default function StudentInfo() {
  const [name, setName] = useState('');
  const [addr, setAddr] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [gpa, setGPA] = useState('');
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    createTable();
    loadStudents();
  }, []);

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Students (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, addr TEXT, class TEXT, gpa REAL)',
        []
      );
    });
  };

  const addStudent = () => {
    if (name && addr && studentClass && gpa) {
      if (editingStudent) {
        db.transaction((tx) => {
          tx.executeSql(
            'UPDATE Students SET name = ?, addr = ?, class = ?, gpa = ? WHERE id = ?',
            [name, addr, studentClass, gpa, editingStudent.id],
            () => {
              console.log('Student has been updated.');
              setEditingStudent(null);
              clearFields();
              loadStudents();
            },
            (error) => {
              console.error('Error updating student:', error);
            }
          );
        });
      } else {
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO Students (name, addr, class, gpa) VALUES (?, ?, ?, ?)',
            [name, addr, studentClass, gpa],
            () => {
              console.log('Student has been added to the database.');
              clearFields();
              loadStudents();
            },
            (error) => {
              console.error('Error adding student:', error);
            }
          );
        });
      }
    }
  };

  const loadStudents = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Students',
        [],
        (_, results) => {
          const students = results.rows._array;
          setStudents(students);
        },
        (error) => {
          console.error('Error fetching student list:', error);
        }
      );
    });
  };

  const clearFields = () => {
    setName('');
    setAddr('');
    setStudentClass('');
    setGPA('');
  };

  const editStudent = (student) => {
    setName(student.name);
    setAddr(student.addr);
    setStudentClass(student.class);
    setGPA(student.gpa);
    setEditingStudent(student);
  };

  const deleteStudent = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM Students WHERE id = ?',
        [id],
        () => {
          console.log('Student has been deleted.');
          clearFields();
          setEditingStudent(null);
          loadStudents();
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={addr}
        onChangeText={(text) => setAddr(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Class"
        value={studentClass}
        onChangeText={(text) => setStudentClass(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="GPA"
        value={gpa}
        onChangeText={(text) => setGPA(text)}
      />
      <Button
        title={editingStudent ? 'Update Student' : 'Add Student'}
        onPress={addStudent}
      />

      <Text style={styles.title}>List of Students:</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text>
              {item.name} - {item.addr} - {item.class} - GPA: {item.gpa}
            </Text>
            <TouchableOpacity onPress={() => editStudent(item)}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteStudent(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  editButton: {
    color: 'blue',
    marginRight: 8,
  },
  deleteButton: {
    color: 'red',
  },
});
