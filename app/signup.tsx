import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

export default function Signup() {
  const [countryCode, setCountryCode] = useState("+263");
  const [phoneNumber, setPhoneNumber] = useState("123456789");
  const router = useRouter();
  const {signUp} = useSignUp();

  async function onSignup() {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    router.push({pathname: `verify/${fullPhoneNumber}`, params: {fullPhoneNumber}});
    try {
        await signUp!.create({
            phoneNumber: fullPhoneNumber,
        });
        signUp!.preparePhoneNumberVerification();
        router.push({pathname: "/verify/[phone]", params: {fullPhoneNumber}});
    } catch (error) {
        console.log("Error signing up:", error); 
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={80}>
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>Let's get started!</Text>
      <Text style={defaultStyles.descriptionText}>
        Enter your phone number. We will send you a confirmation code there.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { width: 100 }]}
          placeholder="Country code"
          placeholderTextColor={Colors.gray}
          value={countryCode}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Mobile number"
          placeholderTextColor={Colors.gray}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <Link href={"/login"} replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
      <View style={{flex:1}}/>
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          phoneNumber !== "" ? styles.enabled : styles.disabled,
          {
            marginBottom: 20,
          },
        ]}
        onPress={onSignup}
        disabled={phoneNumber === ""}
      >
        <Text style={defaultStyles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
