import { View, ScrollView, Pressable, StyleSheet, ToastAndroid } from 'react-native'
import React, {useState} from 'react'
import Logo from '@/Components/Logo';
import Colors from '@/constants/Colors';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import useRequest from '@/hooks/useRequest';

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let [passwordVisible, setpasswordVisible] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    let { withNoAuth } = useRequest();


    const handleSubmit = async () => {
      setisLoading(true);
      if (email === "" || password === "") {
        ToastAndroid.show('Please fill all fields', ToastAndroid.SHORT);
        setisLoading(false);
        return;
      }
        try {
          let response = await withNoAuth({
            URL: '/auth/login',
            method: 'POST',
            data: {
              email: email,
              password: password
            }
          });
          setisLoading(false);
          if (response.data.code === 401 ) {
            ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
            return;
          }
          router.replace('/home/');
        }
        catch (error) {
            console.log(error);
        }
    }

  return (
    <SafeAreaView style={{flex:1}}>
       <ScrollView contentContainerStyle={styles.container}>
        <View style={{ gap: 12 }}>
            <Logo />
            <View style={{ gap: 6 }}>
              <Text variant="headlineLarge" style={{ color: Colors.primary }}>Ready To Find Food?</Text>
              <Text variant='headlineLarge' style={{ color: Colors.green }}>In A Few</Text>
            </View>
            <Text>To Continue, Please enter your details</Text>
        </View>
        <View style={{ gap: 12 }}>
          <TextInput
            mode='outlined'
            keyboardType="email-address"
            value={email}
            onChangeText={function (text) {
              setEmail(text);
            }}
            placeholder="Email"
          />
          <TextInput
            //h={50}
            mode='outlined'
            onChangeText={function (text) {
              setPassword(text);
            }}
            value={password}
            label={passwordVisible ? "text" : "password"}
            placeholder="Password"
            />
          <Pressable style={{ alignSelf: 'flex-end' }} >
            <Text>
              Forgot Password?
            </Text>
          </Pressable>
          <Button loading={isLoading} mode="contained" buttonColor={Colors.primary} style={{ borderRadius: 4 }} onPress={handleSubmit}>Login</Button>
          <Text style={{ textAlign: 'center' }}>Or</Text>
          {/* <SocialAuth params='login' /> */}
          <View style={{ flexDirection: 'row', gap: 4, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Don't have an account</Text>
              <Button >Tap here</Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        padding: 24,
        justifyContent: 'space-between',
    },
  })