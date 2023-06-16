import React,{useState,useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import weather from './weather';
import Search from './search';

const App= () => {
  

const [input,Setinput] = useState('');
const [loading,Setloading] = useState(false);
const [data,Setdata] = useState([]);



// const api = {
//   key: 'a0fbb3dedf0edcdf004a63f58a5dd6f6',
//   url: 'https://api.openweathermap.org/data/2.5/',
// };


// const api = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';
const keyapi = 'a0fbb3dedf0edcdf004a63f58a5dd6f6';

const fetchdatahandler = useCallback(()=> {},[])

const [weatherdata,Setweatherdata] = useState(null);
const [loasded,Setloaded] = useState(true);


async function fetchweatherdata(cityname){
  Setloaded(false);
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${keyapi}`
  try{
    const response = await fetch(api);
    if(response.status == 200){
      const data = await response.json();
      Setweatherdata(data);

    }else{
      Setweatherdata(null);
    }
    Setloaded(true);
  }catch(error){
    console.log(error);
  }
}
 
const [name,Setname] =  useState('');

useEffect(()=>{
  fetchweatherdata('Mumbai');
  console.log(weatherdata);
},[])

if(!loasded){
  return(
    <View style={{alignSelf: 'center',justifyContent: 'center',
    alignContent: 'center',alignItems: 'center'}}>
      <ActivityIndicator color={'black'} size={39}/>
    </View>
  )
}

else if (weatherdata == null){
  return
  (<View>
   <Text>
    not avilable data  
   </Text>
  </View>)
}

  return (
  <SafeAreaView>
   <View>
   <Search/>
   </View>
  </SafeAreaView>
  );
};



export default App;
