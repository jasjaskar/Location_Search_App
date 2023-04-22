import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getLocalData = () => {
    AsyncStorage.getItem('favorites').then((result: string) => {
      let arr = result ? JSON.parse(result) : [];
      // To show most recent saved data at the top
      arr.reverse();
      setData([...arr]);
      setRefreshing(false);
    });
  };
  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.topLeftContainer}>
          <TouchableOpacity style={styles.alignCenter} onPress={() => {}}>
            <EntypoIcon name={'menu'} size={30} color={'#000'} />
          </TouchableOpacity>
          <Text style={styles.headerTextStyle}>Explore World</Text>
        </View>
        <View style={styles.plusIconContanier}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SearchLocation', {
                key: null,
              });
            }}>
            <Ionicons name={'search'} size={25} color={'#000'} />
          </TouchableOpacity>
        </View>
      </View>
      {data && data.length > 0 ? (
        <View style={styles.favoriteIconStyle}>
          <MaterialIcons
            size={20}
            name="favorite-border"
            style={{color: 'red'}}
          />
          <Text style={styles.ListHeaderTextStyle}>Favorite Countries</Text>
        </View>
      ) : null}
      <FlatList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getLocalData();
        }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.listContainer}
            onPress={() => {
              navigation.navigate('SearchLocation', {
                key: item,
              });
            }}>
            <Text style={{fontSize: 15, color: '#000'}}>{item}</Text>
            <EntypoIcon
              name={'chevron-with-circle-right'}
              size={25}
              color={'#000'}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  topContainer: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    flexDirection: 'row',
  },
  topLeftContainer: {
    flex: 0.75,
    flexDirection: 'row',
    marginLeft: 30,
    justifyContent: 'flex-start',
  },
  alignCenter: {alignSelf: 'center'},
  headerTextStyle: {
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'ubuntu',
    fontWeight: 'bold',
    color: '#000',
  },
  ListHeaderTextStyle: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: 'ubuntu',
    fontWeight: 'bold',
    color: '#000',
  },
  favoriteIconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
  plusIconContanier: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  listContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 10,
    justifyContent: 'space-between',
  },
  imgStyle: {width: '100%', height: 200, borderWidth: 1, borderColor: '#000'},
});
export default Home;
