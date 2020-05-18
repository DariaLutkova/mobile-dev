import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Button, TextInput, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

export default function App() {
  const [data, setData] =  useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputSecondName, setInputSecondName] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const uploadContacts = async () => {
    const { status } = await  Contacts.requestPermissionsAsync()
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();

      if (data.length > 0) {
        // const contact = data[0];
        // console.log(data);
        setData(data);
      }
    }
  }

function Item({ name, phone, image, id }) {
  const removeItem = async (id) => {
    const res = await Contacts.removeContactAsync(id);
    uploadContacts();
    // console.log(res);
  };

  const updateItem = async (id) => {
    const res = await Contacts.presentFormAsync(id);
    uploadContacts();
  }

// console.log(data);
  return (
    <TouchableOpacity style={styles.item} onPress={() => updateItem(id)} onLongPress={() => removeItem(id)}>
      <Image source={image ? image : null} style={styles.image} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
    </TouchableOpacity>
  );
}

  useEffect(() => {
    uploadContacts();
  }, []);

  const onAddNewContact = async () => {
    const contact = {
    [Contacts.Fields.FirstName]: inputFirstName,
    [Contacts.Fields.LastName]: inputSecondName,
    [Contacts.Fields.PhoneNumbers]: [{
      label: 'work',
      number: inputPhone
    }],
  };
    console.log(contact);

    const contactId = await Contacts.addContactAsync(contact);
    // console.log(contactId);
    setInputFirstName('');
    setInputSecondName('');
    setInputPhone('');
    setIsAdding(false);
    uploadContacts();
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 25,
       }}>
       {
          !isAdding ? 
          <>
            <Button
              onPress={() => setIsAdding(true)}
              title="Add New Contact"
              color="#212121"
              accessibilityLabel="Add New Contact"
            />
            <FlatList 
              data={data}
              refreshing={isRefreshing}
              onRefresh={async () => {
                setIsRefreshing(true);
                await uploadContacts();
                setIsRefreshing(false);
              }}
              renderItem={({ item }) => <Item id={item.id} name={item.name} image={item.imageAvailable && item.image} phone={item.phoneNumbers && item.phoneNumbers[0].number} />}
              keyExtractor={item => item.id}
            />
          </>
          :
          <>
            <Text style={{alignSelf: 'center', fontSize: 16,}}>Adding New Contact</Text>
            <TextInput 
              style={styles.input}
              placeholder="First Name"
              onChangeText={text => setInputFirstName(text)}
              value={inputFirstName}
            />
            <TextInput 
              style={styles.input}
              placeholder="Last Name"
              onChangeText={text => setInputSecondName(text)}
              value={inputSecondName}
            />
            <TextInput 
              style={styles.input}
              placeholder="Phone Number"
              onChangeText={text => setInputPhone(text)}
              value={inputPhone}
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10,}}>
              <Button
                onPress={onAddNewContact}
                title="Create"
                color="#212121"
                accessibilityLabel="Create New Contact"
              />
              <Button
                onPress={() => setIsAdding(false)}
                title="Dismiss"
                color="#212121"
                accessibilityLabel="Dismiss Creating New Contact"
              />
            </View>
          </>
       }
    </View>
  );
}


const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderRadius: 2,
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#c7c7c7',
    marginRight: 15,
  },
  input: {
    height: 60,
    borderColor: '#c7c7c7',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginVertical: 8,
  }
});