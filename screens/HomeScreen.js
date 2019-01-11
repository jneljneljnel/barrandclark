import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import {RkTheme, RkText, RkButton, RkCard, rkCardImg, RkChoice, RkChoiceGroup} from 'react-native-ui-kitten';
import { Input, Label, Icon, Container, Header, Content, Accordion, ListItem, CheckBox, Body, Text, Button, ActionSheet, Item} from "native-base";
import { WebBrowser, Permissions } from 'expo';
import { MonoText } from '../components/StyledText';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs:[]
    }
    this._retrieveData = this._retrieveData.bind(this)
    this.uploadData = this.uploadData.bind(this)
  }
  willFocusSubscription = this.props.navigation.addListener(
  'willFocus',
    payload => {
      this._retrieveData()
    }
  );
  static navigationOptions = {
    header: null,
  };

  onNavigatorEvent(event) {
    console.log('navevent', event)
  }

  componentDidMount(){
    this._retrieveData()
    this.getPermissions()
  }
  uploadData(){
    console.log('clear')
    //push to db
    //upload photo

    AsyncStorage.clear()
    this.setState({jobs:[]})
  }

  getPermissions = async() => {
    console.log('get perms')
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('You will need to enable camera roll permissions to upload a room layout');
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  }

  _retrieveData = async () => {
  console.log('getting data')
  try {
    const value = await AsyncStorage.getAllKeys();
    if (value !== null) {
      console.log(value);
      this.setState({jobs:value})

    }
   } catch (error) {
     // Error retrieving data
   }
}

render() {
const { navigate } = this.props.navigation;
RkTheme.setType('RkCard', 'story', {
img: {
  height: 100,
  opacity: 0.7
},
header: {
  alignSelf: 'center'
},
content:{
  alignSelf:'center',
  minHeight: 75
}
});

RkTheme.setType('RkButton', 'faded', {
  content: {
    opacity: 0.6
  }
});
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <RkCard rkType='story'>

          <View rkCardHeader>
           <RkText  style={{textAlign:'center'}} rkType={this.state.jobs.length?'danger':'success'}>
           {this.state.jobs.length? 'You have un uploaded jobs': 'No jobs to uplaod'}
           </RkText>
          </View>
          {this.state.jobs.map( (j,i) => {
            console.log('job', this.state.jobs[i] )
            return(<View key={i} rkCardContent>
              <TouchableOpacity choiceTrigger>
              <View style={{flexDirection:'row', alignItems:'center'}}>

              <Text> JobId: {j} </Text>
              </View>
              </TouchableOpacity>
              <Button
              onPress={() => navigate('Links', { edit: [this.state.jobs[i]]})}
              title="Edit"
              >
                <Text>Edit</Text>
              </Button>
            </View>)
          })}
          <Button block success style={{paddingTop:10}} onPress={this.uploadData}>
            <Text>Upload</Text>
          </Button>
          </RkCard>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
