import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function MainScreen({userScore, robotScore, yourTurn, firstDice, secondDice, isRolledByUser, onUserPress}) {
  return (
    <View style={styles.block}>
      <View style={styles.topBlock}>
        <Text style={styles.rulesTitle}>Game Rules</Text>
        <Text style={styles.rules}>1. You role the dice. {'\n'}2. Get the score from 1-6 on two dices. {'\n'}3. The Robot rolls the dice and gets his score. {'\n'}4. Whoever get to <Text style={{fontWeight: 'bold',}}>100</Text> first - wins!!!</Text>
      </View>
      <View style={styles.gameField}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreTitle}>Your score</Text> 
          <Text style={styles.score}>{userScore}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreTitle}>Robot's score</Text> 
          <Text style={styles.score}>{robotScore}</Text>
        </View>
      </View>
      <Text style={{fontSize: 16,}}>{isRolledByUser ? 'You' : 'Robot'} Got</Text>
      <View style={styles.dices}>
        <Text style={styles.dice}>{firstDice}</Text>
        <Text style={styles.dice}>{secondDice}</Text>
      </View>
      <Button title="Press Me To Win" color="#560027" disabled={!yourTurn} onPress={onUserPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  topBlock: {
    flex: 2,
    paddingTop: 30,
  },
  rulesTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#880e4f',
    borderStyle: 'solid',
  },
  rules: {
    fontSize: 18,
    paddingTop: 10
  },
  gameField: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scoreBox: {
    alignItems: 'center',
  },
  scoreTitle: {
    fontSize: 24,
  },
  score: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  dices: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dice: {
    fontSize: 30,
    borderWidth: 1,
    padding: 20,
    marginBottom: 40,
    borderColor: 'black',
    borderStyle: 'solid',
  }
})