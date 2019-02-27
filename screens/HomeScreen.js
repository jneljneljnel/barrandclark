import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import {RkTheme, RkText, RkButton, RkCard, rkCardImg, RkChoice, RkChoiceGroup} from 'react-native-ui-kitten';
import { Title, List, Left, Right, Thumbnail, Input, Label, Icon, Container, Header, Content, Accordion, ListItem, CheckBox, Body, Text, Button, ActionSheet, Item} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
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
    this.getPropPhoto = this.getPropPhoto.bind(this)
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
  uploadData = async (jobs) => {
    console.log(jobs)
    if (jobs.length){
      jobs.map(x => {
        AsyncStorage.getItem(x).then(state =>
          fetch('https://nameless-reef-31035.herokuapp.com/upload',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              jobid: x,
              state: state,
            }),
          })
            .then((response) => response.json())
                  .then((responseJson) => {
                    console.log(responseJson);
                    AsyncStorage.removeItem(x)
                  })
                  .catch((error) => {
                    console.error(error);
                  })
                  //upload photo

        );
      })
    }
    //push to db
    if(jobs.length){
      alert('Jobs sucessfully Uploaded');
    }
    AsyncStorage.clear()
    this.setState({jobs:[]})
  }

  getPermissions = async() => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('You will need to enable camera roll permissions to upload a room layout');
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  }

  getPropPhoto = async(j) => {
    const photo = await AsyncStorage.getItem(j)
    //console.log(JSON.parse(photo).propimage)
    return await JSON.parse(photo).propimage
  }

  _retrieveData = async () => {
  console.log('getting data!')
  try {
    const value = await AsyncStorage.getAllKeys();
    if (value !== null) {
      const promises = value.map( j => this.getPropPhoto(j))
      const pics = await Promise.all(promises).then( res => res)
      this.setState({jobs:value, pics: pics})

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
      <Container>
        <Header>
         <Title style={{paddingTop:10}}>{this.state.jobs.length? 'You have un uploaded jobs': 'No jobs to uplaod'}</Title>
        </Header>
        <Content>
          <List>
          {this.state.jobs.map( (j,i) => {
            return(<ListItem thumbnail key={i}>
              <Left>
                <Thumbnail square source={{ uri: this.state.pics[i] }} />
              </Left>
              <Body>
                <Text>{j}</Text>
                <Text note numberOfLines={1}></Text>
              </Body>
              <Right>
              <Button transparent onPress={() => navigate('Links', { edit: [this.state.jobs[i]]})}>
                <Text>Edit</Text>
              </Button>
              </Right>
            </ListItem>)
          })}
          </List>
        </Content>
         <Button block success style={{marginBottom:30, bottom:0}} onPress={() => this.uploadData(this.state.jobs)}>
           <Text>Upload</Text>
         </Button>
      </Container>

      // <View >
      //
      //           <View rkCardHeader>
      //            <RkText  style={{textAlign:'center'}} rkType={this.state.jobs.length?'danger':'success'}>
      //            {this.state.jobs.length? 'You have un uploaded jobs': 'No jobs to uplaod'}
      //            </RkText>
      //           </View>
      //   <ScrollView >
      //     <RkCard rkType='story'>
      //     <Grid>
      //     {this.state.jobs.map( (j,i) => {
      //       console.log('job', this.state.jobs[i] )
      //       console.log('pic', this.state.pics[i] )
      //       return(
      //
      //         <View key={i} rkCardContent>
      //         <Thumbnail square large source={{uri: this.state.pics[i]}}  />)
      //
      //         <TouchableOpacity choiceTrigger>
      //         <View style={{flexDirection:'row', alignItems:'center'}}>
      //
      //         <Text> JobId: {j} </Text>
      //         </View>
      //         </TouchableOpacity>
      //         <Button
      //         onPress={() => navigate('Links', { edit: [this.state.jobs[i]]})}
      //         title="Edit"
      //         >
      //           <Text>Edit</Text>
      //         </Button>
      //       </View>
      //
      //     )
      //     })}
      //     </Grid>
      //     </RkCard>
      //   </ScrollView>
      //   <Button block success style={{marginBottom:30, position: 'absolute', bottom:0}} onPress={() => this.uploadData(this.state.jobs)}>
      //     <Text>Upload</Text>
      //   </Button>
      // </View>
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
