import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing, ScrollView, Image } from 'react-native';
import { Text, Divider } from 'react-native-paper';

const MiPantalla = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const avatars = [
    { id: 1, image: 'https://corazon-huasteco.com/assets/lalo-f7cbb327.jpg' },
    { id: 2, image: 'https://corazon-huasteco.com/assets/josa-4d1c1783.jpg' },
    { id: 3, image: 'https://corazon-huasteco.com/assets/elder-7c4e93b0.jpg' },
    { id: 4, image: 'https://corazon-huasteco.com/assets/einar-0c00beb4.jpg' },
    { id: 5, image: 'https://corazon-huasteco.com/assets/chino-daf0060a.jpg' },
  ];

  const handleAvatarPressIn = (avatarId) => {
    setSelectedAvatar(avatarId);
  };

  const handleAvatarPressOut = () => {
    setSelectedAvatar(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="displaySmall" style={{ marginBottom: 0, fontWeight: '700' }}>
        Nuestro equipo
      </Text>

      <Divider style={styles.dividerStyle} />

      <View style={styles.avatarContainer}>
        {avatars.map((avatar) => (
          <TouchableOpacity
            key={avatar.id}
            onPressIn={() => handleAvatarPressIn(avatar.id)}
            onPressOut={handleAvatarPressOut}
          >
            <Animated.Image
              source={{ uri: avatar.image }}
              style={[
                styles.avatarImage,
                selectedAvatar === avatar.id && {
                  transform: [
                    {
                      rotate: '10deg',
                    },
                  ],
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  dividerStyle: {
    backgroundColor: '#b5b5b5',
  },
  avatarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
});

export default MiPantalla;
