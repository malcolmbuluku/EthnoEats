import { View,  StyleSheet, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Button, Text, } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useNavigation } from 'expo-router'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const profile = () => {
    const navigation = useNavigation()
    const router = useRouter()

 

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Profile',
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Colors.lightGrey,
                
            },
            headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Ionicons name="arrow-back" size={28} color={Colors.primary} />
                </TouchableOpacity>
              ),
        })
    }, [])

  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={{ flex: 1, }}>
                <View style={{paddingTop: 20, alignItems:'center'}}>
                    <Avatar.Image size={150} source={require('../../assets/images/defaultImang.png')} />
                </View>
                <View style={{alignItems:'flex-start', padding: 5}}>
                    <Text variant='titleLarge' style={{fontWeight:'bold'}}>User Details</Text>
                    <Text variant='titleLarge' >Name: Mathew Smith</Text>
                    <Text variant='titleLarge'>Email: mathew@gmail.com</Text>
                </View>
                <View style={{gap: 10, top: 25}}>
                    <Button mode="contained" onPress={() => console.log('Pressed')}>
                        Edit Profile
                    </Button>
                    <Button mode="contained" style={{}} buttonColor={Colors.primary} onPress={() => router.replace('/')}>
                        Logout
                    </Button>
                </View>
            </View>
        </View>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        flex: 1,
    },
})

export default profile