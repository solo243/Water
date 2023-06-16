
import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import debounce from 'lodash.debounce';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
// import { MapPinIcon } from 'react-native-heroicons/solid';
// import { CalendarDaysIcon } from 'react-native-heroicons/solid'

import { fetchLocations, fetchweatherdata } from './weather';
import * as Progress from 'react-native-progress';



export default function Search() {




  const [showsearch, toggalesearch] = useState(false);
  const [locations, setlocations] = useState([]);
  const [forcast, Setforcast] = useState(null);
  const [refreshing, setrefreshing] = useState(false);
  const [loding,setloding]=useState(true);
  const[weather,setweather] =useState({});
  const loadforcast = async () => {
    setrefreshing(true);
  }



  const handlocation = loc => {
    toggalesearch(false);
    setlocations([]);
    fetchweatherdata({
      cityname: loc.name,
      days: '7'
    }).then(data=>{
      console.log("got forcast ", (data))
      setweather(data);

      
    })
  }


  const handlsearch = (value) => {
    console.log('value', value);
    if (value && value.length > 2) {
      fetchLocations({ cityname: value }).then(data => {
       setlocations(data);
      })
    }

  }

  const handledebounce = useCallback(debounce(handlsearch, 1200), []);


  const {current,location }= weather

  return (
 


    

    <ScrollView>
      <SafeAreaView style={{ backgroundColor: '#F3F3F3' }}>

        <View style={{ position: 'relative' }}>


          {/* Circal decoration  */}
          <View style={{
            backgroundColor: '#DFDCF3',
            height: 250,
            width: 250,
            position: 'absolute',
            borderRadius: 250,
            marginStart: -70,
            marginTop: -60
          }}>
          </View>


          <View style={{
            backgroundColor: '#C0B9E7',
            width: 200,
            height: 200,
            borderRadius: 500,
            position: 'absolute',
            marginStart: -100,
            marginTop: 600,
          }}>

          </View>

          <View style={{
            backgroundColor: '#DFDCF3',
            height: 400,
            width: 400,
            position: 'absolute',
            borderRadius: 400,
            marginLeft: 300,
            marginTop: 300,
            marginStart: 240
          }}>
          </View>



          <View style={{ position: 'absolute', marginTop: 35, marginStart: 20 }}>

            <Text style={{ fontSize: 20, color: 'black', }}>
              Hellow
            </Text>
            <Text style={{ fontSize: 20, color: 'black', }}>
              Discover the weather
            </Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: showsearch ? 'white' : "transparent",
            width: '90%', alignSelf: 'center',
            marginTop: 30,
            borderRadius: 40,
            elevation: showsearch ? 20 : 0,
            height: 62,
          }}>


            {/* for search */}
            {showsearch ? (
              <TextInput
                onChangeText={handlsearch}
                placeholder='Search'
                placeholderTextColor={'grey'}
                style={{
                  flex: 1,
                  textAlign: 'auto',
                  textDecorationColor: 'white',
                  marginStart: 20
                }}
              ></TextInput>
            ) : null}

            <TouchableOpacity
              onPress={() => toggalesearch(!showsearch)}
              style={{
                backgroundColor: '#A097DB',
                borderRadius: 50,
                // marginEnd: 
                height: 60,
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                // marginEnd: 11
              }}>
               <MagnifyingGlassIcon size={25} color={'white'}></MagnifyingGlassIcon>
            </TouchableOpacity>
          </View>
          {locations.length > 0 && showsearch ? (
            <View style={{
              position: 'relative', backgroundColor: 'white',
              borderRadius: 30,
              width: '90%',
              // justifyContent: 'center',
              // alignItems:'center',
              alignSelf: 'center',
              marginTop: 20,
            }}>
              {locations.map((loc, index) => {
                let showboder = index + 1 != locations.length;
                return (
                  <TouchableOpacity
                    onPress={() => handlocation(loc)}
                    key={index}
                    style={showboder ? {
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 20,
                      paddingHorizontal: 4,
                      marginBottom: 4,
                      marginStart: 20,
                      color: 'pink',
                   
                      borderBottomWidth: 0.9
                    } : {
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 20,
                      paddingHorizontal: 4,
                      marginBottom: 4,
                      // borderBottomColor: 
                      borderBottomWidth: 0,
                      marginStart: 20,
                      color: 'pink'
                      
                    }}>

                  {/* set location fromthe handle search  */}
                    <Text stye={{ color: 'pink', fontSize: 200,marginStart: 300}}>
                      {loc?.name},{loc?.country}
                      </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View><View style={{ height: 260 }}>
          <View>
            <View style={{
              backgroundColor: '#8174CF',
              width: 360,
              alignSelf: 'center',
              height: 200,
              marginTop: 30,
              borderRadius: 40,
              elevation: 10,
              position: 'absolute'
            }}>


              {/* Current location */}
              <View style={{
                marginTop: 30,
                marginStart: 20,
                width: 200
              }}>
                <Text style={{ fontSize: 16, color: 'white' }}>
                  Current location
                </Text>
              </View>

              {/* London ,delhi ahmedabd  */}
              <View style={{
                alignContent: 'center',
                justifyContent: 'center',
                height: 80,
                width: 250,
                position: 'relative',
                marginTop: 10,
              }}>
                <Text style={{
                  marginStart: 23, paddingBottom: 35, fontSize: 30,
                  color: 'white', elevation: 10
                }}>
                 {location?.name}
              
                </Text>

              </View>




              <View style={{marginTop: 30,height: 100,
                  marginBottom: 30,position: 'absolute',marginTop: 100,
                  width: 200,paddingTop: 4,marginStart: 28}}>
                <Text style={{fontSize: 15,color: 'white'}}>
                ,{location?.country}
                </Text>
               </View>





              {/* wather imagge  */}
              <View style={{
                width: 120,
                height: 120,
                marginRight: 30,
                alignSelf: 'flex-end',
                position: 'absolute',
                marginEnd: 30,
                marginStart: 30,
                marginTop: 17,
                paddingEnd: 130
              }}>
                {/* <Image source={require('./assets/wethar/Suncloudfastwind.png')}
                  style={{
                    width: 120,
                    height: 120,
                  }} /> */}
                <Image source={{uri: 'https:'+current?.condition?.icon}}
                style={{  width: 120,
                  height: 120,}}/>
              </View>

              {/* wather text is it thunder dry  */}
              <View>
                <Text style={{
                  marginStart: 30,
                  fontSize: 17,
                  color: 'white',
                  fontWeight: '400',
                  marginTop: 17
                }}>
                 {current?.condition?.text}
                </Text>
              </View>

              {/* Current tempretare in .C */}
              <View style={{
                marginEnd: 30,
                marginBottom: 0,
              }}>
                <Text style={{
                  // backgroundColor: 'red',
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  height: 70,
                  width: 90,
                  textAlign: 'center',
                  marginBottom: 100,
                  marginTop: -30,
                  fontSize: 30,
                  color: 'white',

                  paddingTop: 2
                }}>
                  {current?.temp_c}℃
                </Text>

              </View>
            </View>

          </View>
        </View>


        <View style={{
          marginBottom: 13
        }}>
          <Text style={{
            fontSize: 20,
            marginStart: 30,
            color: 'black'
          }}>
            More Detail
          </Text>

        </View>
        <View style={{
          backgroundColor: '#8174CF',
          height: 230,
          width: 358,
          alignSelf: 'center',
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          // borderRadius: 10,
          elevation: 5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: 'white',
            width: 140,
            height: 170,
            elevation: 6,
            borderRadius: 20,
            alignItems: 'center'
          }}>


            {/* image wind  */}
            <Image source={require("./assets/wind2.png")} style={{
              height: 50,
              width: 50,
              marginTop: 16
            }} />
            <Text style={{
              fontSize: 15
              , marginTop: 9,
              marginEnd: 6,
              color: 'black',
            }}>
              Wind
            </Text>
            <Text style={{ marginTop: 9, fontSize: 27 }}>
              {current?.wind_kph}Km
            </Text>



            {/* image water drop      */}
          </View>
          <View style={{
            backgroundColor: '#F7F6FC',
            width: 140,
            height: 170,
            marginStart: 24,
            elevation: 6,
            borderRadius: 20,
            alignItems: 'center'
          }}>


            <Image source={require("./assets/water3.png")} style={{
              height: 50,
              width: 50,
              marginTop: 16
            }} />
            <Text style={{
              fontSize: 15
              , marginTop: 9,
              marginEnd: 6,
              color: 'black',
            }}>
              Humidity
            </Text>
            <Text
              style={{ marginTop: 9, fontSize: 27 }}>
              {current?.humidity}%
            </Text>

          </View>
        </View>
        <View style={{
          marginTop: 38
        }}>
          <Text style={{
            fontSize: 20,
            marginStart: 30,
            color: 'black'
          }}>
            {/* <CalendarDaysIcon size={25}
              color={'black'}
              style={{ paddingTop: 20 }}>
            </CalendarDaysIcon> Daily Forcast */}
          </Text>
        </View>

        {/* daily forcast containair */}

        <View style={{alignSelf: 'center'}}>
<Text style={{fontSize: 20,color: 'black'}}>
  Under Devlopment
</Text>
</View>
        <View style={{
          height: 600,
          width: "100%",
          backgroundColor: '#8174CF',
          justifyContent: 'center',
          marginTop: 10,
          borderRadius: 50,
          elevation: 20,
          flexDirection: 'row'

        }}>

          <View style={{
            backgroundColor: 'white',
            height: 160,
            width: 130,
            marginTop: 30,
            marginRight: 60,
            // borderRadius: 30,
            borderTopRightRadius: 40,
            borderBottomStartRadius: 40,
            elevation: 20
          }}>
            {/* image card wather  */}
            <Image source={require('./assets/wethar/MoonCloudRain.png')} style={{
              height: 100, width: 100,
              alignSelf: 'center', marginEnd: 10,
              marginTop: -8
            }} />
            <Text style={{ fontSize: 15, alignSelf: 'center', }}>
              Monday
            </Text>
            <Text style={{ fontSize: 25, alignSelf: 'center', color: '#8174CF' }}>
              20
            </Text>

          </View>

          <View style={{
            backgroundColor: 'white',
            elevation: 20,
            height: 160,
            width: 130,
            marginTop: 30,
            // borderRadius: 30,
            borderTopLeftRadius: 40,
            borderBottomEndRadius: 40,

          }}>

            <Image source={require('./assets/wethar/MoonCloudZap.png')} style={{
              height: 100, width: 100,
              alignSelf: 'center', marginEnd: 10,

            }} />
            <Text style={{ fontSize: 15, alignSelf: 'center', }}>
              Tuesday
            </Text>
            <Text style={{ fontSize: 25, alignSelf: 'center', color: '#8174CF' }}>
              23
            </Text>


          </View>

          <View style={{
            width: 200, height: 100, position: 'absolute',
            marginTop: 550,
          }}>
            <Text style={{
              color: 'white',
              fontSize: 15, marginStart: -60,
            }}>
              Made by Harshil.
            </Text>
          </View>
        </View>

      </SafeAreaView>
    </ScrollView>

  )
}
