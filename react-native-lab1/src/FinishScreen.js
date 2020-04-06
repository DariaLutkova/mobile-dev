import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

export default function FinishScreen({winner, restart}) {
  return (
    <View style={styles.finishScreen}>
      {
        winner === 'user' && renderUserWinner()
      }
      {
        winner === 'robot' && renderRobotWinner()
      }
      {
        winner === 'draw' && renderBothWinner()
      }
      <Button style={styles.btn} title='Want to Play Again ?' color="#880e4f" onPress={restart} />
    </View>
  )
}

const renderUserWinner = () => (
    <View>
      <Image style={styles.finishImg} source={require('../assets/goblet.png')} />
      <Text style={styles.finishText}>
          YOU WON! CONGRATS
      </Text>
    </View>
)

const renderRobotWinner = () => (
    <View>
      <Image style={styles.finishImg} source={require('../assets/loser.png')} />
      <Text style={styles.finishText}>
          Sorry, But You Lost This Round
      </Text>
    </View>
)

const renderBothWinner = () => (
    <View>
      <Image style={styles.finishImg} source={require('../assets/winwin.png')} />
      <Text style={styles.finishText}>
          Seems Like Its a Draw
      </Text>
    </View>
)

const styles = StyleSheet.create({
  finishScreen: {
    flex: 1,
    paddingTop: 50,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  finishImg: {
    width: 150,
    height: 150
  },
  finishText: {
    fontSize: 32,
    paddingTop: 15,
  },
})