import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/image.png')} style={styles.logo} />
      <Text style={styles.title}>Moodify</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Diary')}>
        <Text style={styles.buttonText}>일기쓰러 가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    fontFamily: 'Pretendard-Bold',
    color: '#F9F9F9',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F0DEE0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 32,
    elevation: 6,
  },
  buttonText: {
    fontFamily: 'Pretendard-Bold',
    color: '#1a1a1a',
    fontSize: 16,
  },
});
