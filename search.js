
import React, { useCallback, useEffect, useState } from 'react';
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
  TextInput,
  Appearance,
 
} from 'react-native';
import debounce from 'lodash.debounce';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
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


  

const colorscheme = useColorScheme();
useEffect(()=>
{
  console.log(colorscheme)
},[colorscheme]);
   


  const handlocation = loc => {
    toggalesearch(false);
    setlocations([]);
    console.log(loc)
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
      <SafeAreaView style={{ backgroundColor:'#F3F3F3'}}>

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
                placeholderTextColor={'black'}
                style={{
                  flex: 1,
                  textAlign: 'auto',
                  textDecorationColor: 'white',
                  marginStart: 20,
                  // fontWeight: '500',
                  color: colorscheme === 'dark'?'black':'black',
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
              position: 'relative', 
              backgroundColor: colorscheme === 'dark'?'#282C35':'white',
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
                  <MapPinIcon size={23} color={'grey'}/>
                    <Text stye={{  fontSize: 200,marginStart: 300,
                  color: colorscheme === 'dark'?'white':'black',}}>
                    ㅤ{loc?.name}, {loc?.country}
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
                {location?.country}
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
            <Text style={{ marginTop: 9, fontSize: 27 , color: colorscheme === 'dark'?'black':'black',}}>
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
              style={{ marginTop: 9, fontSize: 27,color: colorscheme === 'dark'?'black':'black' }}>
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

        <View style={{marginStart: 30}}>
<Text style={{fontSize: 20,color: 'black'}}>
Forecast
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

         
<ScrollView  >

{

weather?.forecast?.forecastday?.map((item,index)=>{
             const date = new Date(item.date);
             const options = { weekday: 'long' };
             let dayName = date.toLocaleDateString('en-US', options);
             dayName = dayName.split(',')[0];




                      return (
                        <View style={{backgroundColor: 'white',height: 160,width:350,
                        marginTop: 30,borderRadius: 30 ,alignSelf: 'center'}}>
                
                <Image source={{uri: 'https:'+item?.day?.condition?.icon}} style={{height: 120,
                width: 120,
                position: 'absolute',
                marginEnd: -30,
                marginStart: 210,
                
              }}
                            />
                <Text   style={{height: 120,
                width: 200,
                position: 'absolute',
                marginEnd: -30,
                marginStart: 160,
                marginTop: 120,
                alignContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: 16
                
              }}
              >
                  {item?.day?.condition?.text}
                </Text>
              
                          

                          <Text style={{color: 'black',marginTop: 20,
                        marginStart: 30,fontSize:17}}>{item.date}</Text>
                          <Text style={{fontsize: 30,marginStart: 30}}>
                    {dayName}
                  </Text>


                  <Text style={{color: 'black',marginStart: 30,
                  marginTop: 15,fontSize: 20}}>
  {weather?.location?.name}
  </Text>

                          <Text style={{color: 'black',
                        marginStart: 30,
                        marginTop: 1,
                        fontSize: 35 }}>
                            {item?.day?.avgtemp_c}&#176;
                          </Text>
                         
                        </View>
                      )
                    })
                  }

<View style={{marginStart: 30,
marginTop: 40,
}}>
  <Text style={{color: 'white',fontSize: 30}}>
   Add location to start   
  </Text>

  <Text style={{color: 'white',fontSize: 15}}>
    Devloped by Solo    
  </Text>
</View>



       </ScrollView> 


        </View>

      </SafeAreaView>
    </ScrollView>

  )
}
