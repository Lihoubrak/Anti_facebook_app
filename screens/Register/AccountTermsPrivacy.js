import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { RegisterComponent } from "../../components";
import { COLORS } from "../../constants/theme";

const AccountTermsPrivacy = () => {
  return (
    <RegisterComponent
      title={"Finishing signing up"}
      subtitle={
        "By tapping Sign up, you agree to our Terms, Data Policy, and Cookies Policy"
      }
      titleBtn={"Next"}
      navigationText={"login"}
    >
      <View>
        <Text style={styles.contentText}>
          The Facebook company is now Meta. While our company name is changing,
          we are continuing to offer the same products, includingthe Facebook
          app from Meta. Our Data Policy and Terms of Service remain in effect,
          and this name change does not affect how we use or share data. Learn
          more about Meta and our vision for the metaverse.
        </Text>
      </View>
    </RegisterComponent>
  );
};

const styles = StyleSheet.create({
  contentText: {
    color: COLORS.dark,
    textAlign: "center",
    marginBottom: 50,
  },
});

export default AccountTermsPrivacy;
