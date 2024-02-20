import { View, ScrollView, Image, Pressable, StyleSheet } from 'react-native'
import { ActivityIndicator, Button, Text } from 'react-native-paper'
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors';
import Logo from '@/Components/Logo';
import useNotification from '@/hooks/useNotification';

const Launcher = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    //TODO: Check if notification permission is granted

    let {getNotificationPermission, requestForPermissions } = useNotification();

    useEffect(function () {
        getNotificationPermission();
      }, []);

    //   if (isloaded && !permissionGranted) {
    //     return (
    //       <NotificationPreloader requestForPermissions={requestForPermissions} />
    //     );
    //   }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={{ gap: 12, width: '100%', marginTop:30 }}>
            <Logo />
            <View style={{ gap: 6 }}>
                <Text variant="headlineLarge" style={{ color: Colors.primary }} >Find Cuisines</Text>
                <Text variant='headlineLarge' style={{ color: Colors.primary }} >Near <Text style={{ color: Colors.green }}>You</Text></Text>
          </View>
        </View>
        <View style={styles.mainContentView}>
          {isLoading ? <ActivityIndicator /> :
          <>
                <View style={{ gap: 12, alignItems: 'center', width: '100%' }}>
                  <Button style={{ width: '100%', borderRadius: 4 }} mode='contained' buttonColor={Colors.primary} onPress={()=> router.push('/auth/login')}>Sign in to your Account</Button>
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Text style={{ color: Colors.black }}>It's fast and easy.</Text>
                    <Pressable><Text style={{ textDecorationLine: 'underline', color: Colors.black }}>Need help?</Text></Pressable>
                  </View>
                </View>
                <Button mode='outlined' style={{ width: '100%', borderColor: Colors.black,  borderRadius: 4 }} textColor={Colors.black} >Don't have an account? Sign up</Button>
              </>
            }
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 30 }}>
            <Pressable ><Text style={styles.underlinedText}>Terms of Use</Text></Pressable>
            <Pressable ><Text style={styles.underlinedText}>Privacy and Cookies</Text></Pressable>
          </View>
        </View>
    </ScrollView>   
  )
}

export default Launcher

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: '#F1F1F1',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 36
    },
    mainContentView: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      width: '100%'
    },
  
    bottomContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10
    },
    underlinedText: {
      textDecorationLine: 'underline',
      color: 'gray'
    }
  })