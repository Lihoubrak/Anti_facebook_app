import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        // User is signed in, navigate to WelcomeScreen or other desired screen
        navigation.navigate("WelcomeScreen");
      }
    });

    // Cleanup function to unsubscribe the observer when the component unmounts
    return () => unsubscribe();
  }, [navigation]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorMessage = error.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (key, value) => {
    if (key === "email") {
      setEmail(value);
    } else if (key === "password") {
      setPassword(value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color="blue"
          animating
        />
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => onChange("email", text)}
          />
          <View style={styles.passwordInput}>
            <TextInput
              style={styles.password}
              placeholder="Enter your password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(text) => onChange("password", text)}
            />
            <TouchableOpacity
              style={styles.passwordVisibilityButton}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Text>{passwordVisible ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  formContainer: {
    width: "80%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  password: {
    flex: 1,
  },
  passwordVisibilityButton: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
});

export default LoginScreen;
