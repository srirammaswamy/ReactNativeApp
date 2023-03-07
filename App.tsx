/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

import {
  Alert,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import realm, {addUser, getUser, getAllUsers} from './Database/Database';
import {TextField} from 'react-native-material-textfield';

export default function App() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState();
  const [password, setPassword] = useState('');
  const [age, setAge] = useState();

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [username1, setUsername1] = useState('');
  const [password1, setPassword1] = useState('');

  const [usernameError1, setUsernameError1] = useState('');
  const [passwordError1, setPasswordError1] = useState('');

  const usernameRef = React.createRef();
  const firstnameRef = React.createRef();
  const lastnameRef = React.createRef();
  const passwordRef = React.createRef();
  const ageRef = React.createRef();

  const usernameRef1 = React.createRef();
  const passwordRef1 = React.createRef();

  // reset username and password fields
  const resetPartialFields = () => {
    setUsername('');
    setPassword('');
    usernameRef.current.clear();
    passwordRef.current.clear();
  };

  // reset all fields
  const resetAllFields = () => {
    setUsername('');
    setPassword('');
    setFirstname('');
    setLastname(undefined);
    setAge(undefined);
    usernameRef.current.clear();
    passwordRef.current.clear();
    firstnameRef.current.clear();
    lastnameRef.current.clear();
    ageRef.current.clear();
  };

  // create new user
  const createAccount = () => {
    // check if the username already exists
    let results = getUser(username);

    // for debugging
    console.log('Results : ', results);

    if (results.length > 0) {
      resetPartialFields();
      setUsernameError('Username already exists!');
      return;
    }
    addUser(username, firstname, lastname, password, age);
  };

  // login existing user
  const loginAccount = () => {
    let users = getAllUsers();
    console.log('users');
    console.log(users);
    // let user = getUser(username1);

    // // for debugging
    // console.log('User : ', user);

    // if (user.length == 0) {
    //   alert('Username does not exist :(');
    //   return;
    // }
    // alert('Username exists :)');
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Text style={styles.headingText}>Sign-up</Text>
          <TextField
            ref={usernameRef}
            value={username}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onChangeText={setUsername}
            returnKeyType="next"
            label="Username"
            error={usernameError}
          />

          <TextField
            ref={firstnameRef}
            value={firstname}
            autoCorrect={true}
            enablesReturnKeyAutomatically={true}
            onChangeText={setFirstname}
            returnKeyType="next"
            label="First Name"
          />

          <TextField
            ref={lastnameRef}
            value={lastname}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onChangeText={setLastname}
            returnKeyType="next"
            label="Last Name"
          />

          {/* <TextField
          defaultValue={defaultEmail}
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onFocus={this.onFocus}
          onChangeText={this.onChangeText}
          onSubmitEditing={this.onSubmitEmail}
          returnKeyType='next'
          label='Email Address'
          error={errors.email}
        /> */}

          <TextField
            ref={passwordRef}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            clearTextOnFocus={true}
            onChangeText={setPassword}
            returnKeyType="done"
            label="Password"
            error={passwordError}
            title="Choose wisely"
            maxLength={30}
            characterRestriction={20}
          />

          <TextField
            ref={ageRef}
            defaultValue={age}
            label="Age"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={createAccount} title="create account" color="blue" />
        </View>

        <Text style={styles.headingText}>Login</Text>
        <TextField
          ref={usernameRef1}
          value={username1}
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onChangeText={setUsername1}
          returnKeyType="next"
          label="Username"
          error={usernameError}
        />

        <TextField
          ref={passwordRef1}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          clearTextOnFocus={true}
          onChangeText={setPassword1}
          returnKeyType="done"
          label="Password"
          error={passwordError1}
          title="Choose wisely"
          maxLength={30}
          characterRestriction={20}
        />

        <View style={styles.buttonContainer}>
          <Button onPress={loginAccount} title="login" color="blue" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  scroll: {
    backgroundColor: 'transparent',
  },

  container: {
    margin: 8,
    marginTop: Platform.select({ios: 8, android: 32}),
    flex: 1,
  },

  contentContainer: {
    padding: 8,
  },

  buttonContainer: {
    paddingTop: 8,
    margin: 8,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },

  headingText: {
    textAlign: 'center',
    color: '#232323',
    fontSize: 20,
    fontWeight: 'bold',
  },
};
