/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Modal,
  Button
} from 'react-native';
import axios from 'axios';

const App = () => {
    const [movie, setMovie] = useState({
        input: "",
        results: [],
        clicked: {},
    });
    
    const search = () => {
        axios('http://www.omdbapi.com/?apikey=28f4dae9&s=' + movie.input).then(({ data }) => {
            let results = data.Search;
            setMovie(prevState => {
                return {...prevState, results:results}
            })
        })
    }
    
    const details = title => {
        axios('http://www.omdbapi.com/?apikey=28f4dae9&t=' + title).then(({ data }) => {
            let results = data;
            setMovie(prevState => {
                return {...prevState,clicked:results}
            })
        })
    }

    
    return (
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Movie Search</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setMovie(prevState => {
            return {...prevState, input:text}
        })}
        onSubmitEditing={search}
        value={movie.input}
        placeholder="Enter a movie name"
      />
      <ScrollView style={styles.scroll}>
          {movie.results.map(result => (
            <SafeAreaView>
                <Image style={{width: "100%"}} source={{uri: result.Poster}} />
                <Text>{result.Title}</Text>
                <Text>{result.Year}</Text>
            </SafeAreaView>
          ))}
      </ScrollView>
      <Modal visible={(typeof movie.selected!= 'undefined')}>
            <Text>More details</Text>
            <Image style={{width: "100%"}} source={{uri: movie.clicked.Poster}} />
            <Text>{movie.clicked.Title}</Text>
            <Text>{movie.clicked.Year}</Text>
            <Text>Genre:{movie.clicked.Genre}</Text>
            <Text>Rating:{movie.clicked.imdbRating}</Text>
            <Text>Description:{movie.clicked.Plot}</Text>
            <Button onPress={() => setMovie(prevState => {
                return{...prevState, clicked:{}}
    })}>
            Close
            </Button>
      </Modal>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA500',
  },
  title: {
   textAlign: 'center',
   fontSize: 30,
   backgroundColor: '#FFA500',
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    height: 60,
    margin: 12,
    borderWidth: 2.5,
    borderRadius: 12,
  },
  scroll: {
    flex: 1,
    width: "100%",
  }
});

export default App;


