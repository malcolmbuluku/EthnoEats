import { View, StyleSheet} from 'react-native'
import React from 'react'
import { Image } from 'expo-image';

const Logo = () => {
  return (
    <View style={styles.imageContainer}>
      <Image alt='logo' source={require('@/assets/images/icon.png')} style={styles.image} />
    </View>
  )
}

export default Logo;

const styles = StyleSheet.create({
    imageContainer: {
        height: 50,
        width: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        height: 50,
        width: 50,
        contentFit: 'cover',
      
    }
})