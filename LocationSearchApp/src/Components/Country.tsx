import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CountryInfo = ({country}) => {
  const {
    name,
    capital,
    flag,
    timeZones,
    population,
    area,
    languages,
    currency,
  } = country;

  const [selected, setSelected] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('favorites').then((result: string) => {
      let arr = result ? JSON.parse(result) : [];
      if (arr.includes(name)) {
        setSelected(true);
      }
    });
  }, []);

  const onPressFavorites = () => {
    if (!selected) {
      AsyncStorage.getItem('favorites').then(favoritesData => {
        if (favoritesData && favoritesData.length > 0) {
          let existFavoritesData = JSON.parse(favoritesData);
          if (!existFavoritesData.includes(name)) {
            existFavoritesData.push(name);
            AsyncStorage.setItem(
              'favorites',
              JSON.stringify(existFavoritesData),
            );
          }
        } else {
          let data = [];
          data.push(name);
          AsyncStorage.setItem('favorites', JSON.stringify(data));
        }
      });
    } else {
      AsyncStorage.getItem('favorites').then(favoritesData => {
        if (favoritesData && favoritesData.length > 0) {
          let existFavoritesData = JSON.parse(favoritesData);
          if (existFavoritesData.includes(name)) {
            existFavoritesData = existFavoritesData.filter(
              item => !item.includes(name),
            );
            AsyncStorage.setItem(
              'favorites',
              JSON.stringify(existFavoritesData),
            );
          }
        }
      });
    }
    setSelected(!selected);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: flag}} />
        <TouchableOpacity
          onPress={() => {
            onPressFavorites();
          }}
          style={styles.favoriteContainer}>
          {selected ? (
            <MaterialIcons name="favorite" style={styles.iconStyle} />
          ) : (
            <MaterialIcons
              name="favorite-border"
              style={[styles.iconStyle, {color: 'gray'}]}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.row}>
          <FontAwesome name="globe" style={styles.icon} />
          {name ? (
            <Text style={styles.value}>{name}</Text>
          ) : (
            <Text style={styles.value}>N/A</Text>
          )}
        </View>
        <View style={styles.row}>
          <FontAwesome name="building" style={styles.icon} />
          {capital ? (
            <Text style={styles.value}>{capital}</Text>
          ) : (
            <Text style={styles.value}>N/A</Text>
          )}
        </View>

        <View style={styles.row}>
          <FontAwesome name="users" style={styles.icon} />

          {population ? (
            <Text style={styles.value}>{population}</Text>
          ) : (
            <Text style={styles.value}>N/A</Text>
          )}
        </View>
        <View style={styles.row}>
          <FontAwesome name="map-o" style={styles.icon} />
          {area ? (
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.value}>
                {area}
                {' sq kms'}
              </Text>
              <Text style={styles.value}>
                {(area / 2.59).toFixed(2)}
                {' sq miles'}
              </Text>
            </View>
          ) : (
            <Text style={styles.value}>N/A</Text>
          )}
        </View>
        <View style={styles.row}>
          <FontAwesome name="language" style={styles.icon} />
          {languages ? (
            <Text style={styles.value}>{languages?.join(', ')}</Text>
          ) : (
            <Text style={styles.value}>N/A</Text>
          )}
        </View>

        <View style={styles.row}>
          <MaterialIcons name="attach-money" style={styles.icon} />
          {currency ? (
            <Text style={styles.value}>{currency?.join(', ')}</Text>
          ) : (
            <Text style={styles.value}>N/A</Text>
          )}
        </View>
        <View style={styles.row}>
          <FontAwesome name="clock-o" style={styles.icon} />
          {timeZones ? (
            <Text style={styles.value}>{timeZones?.join(', ')}</Text>
          ) : (
            <Text style={styles.value}>N/A</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 10,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  favoriteContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 3,
  },
  iconStyle: {
    fontSize: 24,
    color: 'blue',
  },
  textContainer: {
    flex: 2,
    marginLeft: 10,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    flex: 1,
  },
});

export default CountryInfo;
