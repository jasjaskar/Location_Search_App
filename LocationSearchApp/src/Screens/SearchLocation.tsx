import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {callLoactionSearchAPI} from '../RESTAPI/locationApi';
import CountryInfo from '../Components/Country';

const SearchLocation = ({route}) => {
  const {key} = route.params;
  const [searchLocation, setSearchLocation] = useState(key);
  const [locationList, setLocationList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const apiCall = async () => {
    callLoactionSearchAPI(searchLocation)
      .then((response: any) => {
        setLocationList([...response]);
      })
      .catch(() => {
        setLocationList([]);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };
  useEffect(() => {
    apiCall();
  }, [searchLocation]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <View style={{marginLeft: 10}}>
          <Ionicons name={'search'} size={25} color={'#000'} />
        </View>

        <TextInput
          style={styles.inputStyle}
          placeholder={'Explore World'}
          placeholderTextColor={'gray'}
          value={searchLocation}
          onChangeText={(text: string) => {
            setSearchLocation(text);
          }}
          keyboardType={'default'}
        />
        <TouchableOpacity
          style={styles.closeContainer}
          onPress={() => {
            setSearchLocation(null);
          }}>
          <Ionicons name={'close-circle'} size={20} color={'#000'} />
        </TouchableOpacity>
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          apiCall();
        }}
        showsHorizontalScrollIndicator={false}
        data={locationList}
        ListEmptyComponent={() => {
          return (
            <View style={styles.noResultsTxt}>
              <Text style={styles.loadingText}>
                {searchLocation == null
                  ? 'Know about countries here'
                  : 'No Results'}
              </Text>
            </View>
          );
        }}
        renderItem={({item}) => (
          <CountryInfo
            country={{
              flag: item?.flags?.png,
              name: item?.name?.common,
              capital: item?.capital,
              area: item?.area,
              population: item?.population,
              languages: Object.keys(item?.languages).map((lang,id)=>{
                return item?.languages[lang]
              }),
              timeZones: item?.timezones,
              currency : Object.keys(item?.currencies).map((curr,id)=>{
                return  `${item?.currencies[curr]?.name} (${item?.currencies[curr]?.symbol})`
              }),
            }}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  noResultsTxt: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadingText: {
    fontFamily: 'bold',
    fontSize: 18,
    color: 'gray',
    paddingTop: 20,
  },
  searchContainer: {
    height: 60,
    margin: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'gray',
  },
  inputStyle: {
    borderRadius: 0,
    padding: 0,
    color: '#000',
    fontSize: 14,
    marginTop: 0,
    marginHorizontal: 16,
    flex: 1,
  },
  closeContainer: {
    padding: 5,
  },
});
export default SearchLocation;
