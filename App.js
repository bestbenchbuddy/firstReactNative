import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { search } from './mockData';


const HomeScreen = (props) => {

  const [searchField, setsearchField] = useState('');

  const [data, setData] = useState(search.Search)

  const handleSearchChange = item => {
    setsearchField(item)
    //console.log(searchField)
  }

  useEffect(() => {
    
  })

  const Row = rowProps => {
    return (
      <View>
        <Text style={rowProps.style} onPress={() => props.navigation.navigate('Details', {movie: rowProps.movie})}>
          {rowProps.movie.Title}
        </Text>
      </View>)
    }

  const searchFunction = () => {
      console.log("searchFunction output is loading...")
      return (data.map((movie,key) => (
        searchField.split(" ").every(r => movie.Title.split(" ").includes(r)) 
          && <Row key={key} movie={movie} style={styles.searchResultText} />
      )))
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home Screen, please input the title of the movie you are searching for </Text>
      <TextInput
        style={styles.input}
        value={searchField}
        onChangeText={handleSearchChange}
        placeholder="Enter Movie Title here"
      />
      <ScrollView> 
        {searchFunction()}
      </ScrollView>
    </SafeAreaView>
  );
}

const DetailsScreen = (props) => {

  const { movie } = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <Text style={[styles.setColourRed]}>
        {`
        Details Screen 
        Movie Title: ${movie.Title}
        Year the movie was created: ${movie.Year}
        imdbID: ${movie.imdbID}
        Type of movie: s${movie.Type}
        `}
        </Text>
        
        <Image
          style={{resizeMode: 'contain', width: '100%', height: '400%'}}
          source={{
            uri: movie.Poster,
          }}
        />
      </ScrollView>
      
      <Button
        title="Go Home loser"
        onPress={() => props.navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResultText: {
    color: 'blue',
  },
  setColourRed: {
    color: 'red',
  },
  input: {
    width: 200,
    height: 75,
  },
});
