import * as React from 'react';
import { Button, Image, View, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Make a Photo" color="#ff80ab" onPress={this._makeImage} />
        {
          image && 
          <View>
            <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 30 }} />
            <Button color="#ff80ab" title="Save to Camera Roll" onPress={this._saveImage} />
          </View>
        }
      </View>
    );
  }

  askForPermissions = async () => {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  )
  if (status !== 'granted') {
    Alert.alert('Error', 'Please, give permission ^-^')
    return false
  }
  return true
}

  _makeImage = async () => {
    try {
      const hasPermissions = await this.askForPermissions()

      if (!hasPermissions) {
        return
      }

      const img = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!img.cancelled) {
          this.setState({ image: img.uri });
        }

      console.log(img)
    } catch (E) {
      console.log(E);
    }
  }

  _saveImage = async () => {
    try {
      await MediaLibrary.saveToLibraryAsync(this.state.image);

      Alert.alert('Saved!')
    } catch (E) {
      console.log(E);
    }
  }
}