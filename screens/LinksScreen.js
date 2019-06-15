import React, { Component } from 'react';
import { NavigationEvents, NavigationActions } from 'react-navigation';
import { WebBrowser, Permissions } from 'expo';
import { DocumentPicker, ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InputScrollView from 'react-native-input-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions, } from 'react-native';
import DismissKeyboard from 'dismissKeyboard';
import moment from "moment";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
  CameraRoll,
} from 'react-native';
import { RkChoice } from 'react-native-ui-kitten';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Accordion } from './lib/Accordion';
import { Input, Label, Icon, Container, Header, Content, ListItem, CheckBox, Body, Text, Button, ActionSheet, Item, Form, Thumbnail, DatePicker, RefreshControl } from "native-base";
const dataArray = [
  { title: "First Window", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Window", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Window", content: "Lorem ipsum dolor sit amet" }
];
const BUTTONS = ['Acoustic',
  'Asphalt',
  'Brick',
  'Concrete',
  'Fiberglass',
  'Gypsum',
  'Metal',
  'Plaster',
  'Plastic',
  'Stucco ',
  'Tile ',
  'Transite',
  'Vinyl',
  'Wood', "Cancel"];
const SOILSURFACES = ['Non Play Area', 'Bare Soil/Play Area', 'Cancel'];
const DUSTSURFACES = ['Interior Floor', 'Interior Window Sill', 'Exterior Window Well', 'Exterior Floor', 'Cancel'];
const TYPES = ["Aluminum", "Double Hung", "Casement", "Louvered", "Fixed", "Horiz Slider", "Transom", "Vinyl", "Bay", "Garden", "Cancel"];
const TYPESBASE = ["Older", "Newer", "In Closet", "Cancel"];
const TYPESCLOSET = ["Older", "Newer", "Forced Air Unit", "Water Heater", "Cancel"];
const TYPESWALL = ["Upper", "Lower", "Older", "Newer", "Cancel"];
const TYPESEAVES = ["Older", "Newer", "Original Structure", "New Addition", "Cancel"];
const TYPESCOL = ["Front Porch", "Rear Porch", "Side Porch", "Cancel"];
const TYPESGUTT = ["Older", "Newer", "Upper", "Lower", "Cancel"];
const TYPESDOOR = ["Older", "Newer", "Sliding Glass Door", "Pocket Door", "Cancel"];
const TYPESCAB = ["Upper", "Lower", "Older", "Newer", "Ironing Board", "Cancel"];
const TYPESWALLS = ["Upper", "Lower", "Older", "Newer", "Wainscot", "Cancel"];
const DWELLING = ['Single Family Home', 'Retail Center', 'Commercial Structure', 'Apartment Complex', 'Condo', 'Duplex', 'Mobile home', 'Other', 'Cancel']
const EXTTYPES1 = ["Older", "Newer", "Cancel"];
const EXTTYPES2 = ["Aluminum", "Casement", "Double Hung", "Fixed", "Horizontal Sliding", "Louvered", "Transom", "Vinyl", "Bay Window", "Garden Window", "Cancel"];
const EXTTYPES3 = ["Older", "Newer", "Upper", "Lower", "Wainscott", "Cancel"];
const EXTTYPES4 = ["Older", "Newer", "Original House", "Addition", "Cancel"];
const EXTSUB1 = ["Wood", "Metal", "Vinyl", "Acoustic", "Asphalt", "Brick", "Concrete", "Fiberglass",
  "Gypsum", "Plaster", "Plastic", "Stucco", "Tile", "Transite", "Cancel"];
const EXTSUB2 = ["Wood", "Metal", "Stucco", "Vinyl", "Acoustic", "Asphalt", "Brick", "Concrete",
  "Fiberglass", "Gypsum", "Plaster", "Plastic", "Tile", "Transite", "Cancel"];
const EXTSUB3 = ["Stucco", "Wood", "Concrete", "Brick", "Tile", "Transite", "Acoustic",
  "Asphalt", "Fiberglass", "Gypsum", "Metal", "Plaster", "Plastic", "Vinyl", "Cancel"];
const EXTSUBGWALL = ["Stucco", "Wood", "Metal", "Vinyl", "Concrete", "Brick", "Tile", "Transite", "Acoustic",
  "Asphalt", "Fiberglass", "Gypsum", "Plaster", "Plastic", "Cancel"];
const EXTSUB4 = ["Wood", "Stucco", "Metal", "Tile", "Concrete", "Acoustic",
  "Asphalt", "Brick", "Fiberglass", "Gypsum", "Plaster", "Plastic", "Transite", "Vinyl", "Cancel"];
const EXTSUB5 = ["Concrete", "Wood", "Metal", "Tile", "Acoustic",
  "Asphalt", "Brick", "Fiberglass", "Gypsum", "Plaster", "Plastic", "Stucco", "Transite", "Vinyl", "Cancel"];

const EXTSUB6 = ["Wood", "Metal", "Acoustic",
  "Asphalt", "Brick", "Concrete", "Fiberglass", "Gypsum", "Plaster", "Plastic", "Stucco", "Tile", "Transite", "Vinyl", "Cancel"];

const EXTSUB7 = ["Wood", "Metal", "Stucco", "Acoustic", "Asphalt", "Brick", "Concrete", "Fiberglass", "Gypsum",
  "Plaster", "Plastic", "Tile", "Transite", "Vinyl", "Cancel"];

const EXTSUB8 = ["Asphalt", "Concrete", "Metal", "Wood", "Acoustic", "Brick", "Fiberglass", "Gypsum",
  "Plaster", "Plastic", "Stucco", "Tile", "Transite", "Vinyl", "Wood", "Cancel"];

const EXTSUB9 = ['Wood', 'Metal', "Stucco", "Concrete", "Vinyl", "Brick", "Acoustic", "Asphalt",
  "Fiberglass", "Gypsum", "Plaster", "Plastic", 'Tile', "Transite", 'Cancel'];

const INTSUB1 = ['Gypsum', 'Plaster', 'Wood', 'Metal', 'Tile', 'Vinyl', "Acoustic",
  "Asphalt", "Brick", "Concrete", "Fiberglass", "Plastic", "Stucco", "Transite", 'Cancel'];

const INTSUB2 = ['Gypsum', 'Plaster', 'Wood', 'Tile ', 'Vinyl', 'Acoustic', 'Concrete', "Metal", "Asphalt", "Brick",
  "Fiberglass", "Plastic", "Stucco", "Tile", "Transite", 'Cancel'];

const INTSUB3 = ['Wood', 'Metal', "Acoustic", "Asphalt",
  "Brick", "Concrete", "Fiberglass", "Gypsum", "Plaster", "Plastic", "Stucco", "Tile", "Transite", "Vinyl", 'Cancel'];

const INTSUB4 = ['Wood', 'Tile', 'Metal', "Acoustic",
  "Asphalt", "Brick", "Concrete", "Fiberglass", "Gypsum", "Plaster", "Plastic", "Stucco", "Transite", "Vinyl", 'Cancel'];

const INTSUB5 = ['Wood', 'Plaster', 'Metal', "Acoustic", "Asphalt", "Brick", "Concrete", "Fiberglass",
  "Gypsum", "Plastic", "Stucco", "Tile", "Transite", "Vinyl", 'Cancel'];

const INTSUB6 = ['Wood', 'Metal', 'Acoustic', 'Tile', 'Concrete', "Asphalt",
  "Fiberglass", "Gypsum", "Plaster", "Plastic", "Stucco", "Transite", "Vinyl", 'Cancel'];

const INTSUB7 = ['Wood', 'Plaster', 'Tile', 'Concrete', 'Brick', "Acoustic",
  "Asphalt", "Fiberglass", "Gypsum", "Metal", "Plastic", "Stucco", "Transite", "Vinyl", 'Cancel'];

const INTSUB8 = ['Concrete', 'Wood', 'Metal', 'Tile', "Acoustic", "Asphalt",
  "Brick", "Fiberglass", "Gypsum", "Plaster", "Plastic", "Stucco", "Transite", "Vinyl", 'Cancel'];

const EXTSUB10 = ['Wood', 'Metal', "Vinyl", "Brick", "Concrete", "Stucco", "Acoustic", "Asphalt",
  "Fiberglass", "Gypsum", "Plaster", "Plastic", 'Tile', "Transite", 'Cancel'];
const INTSUB9 = ["Tile", "Cancel"];
//const INTSUB10 = ["Wood","Plaster","Metal","Tile","Cancel"];

const SIDES = ["A", "B", "C", "D", "N", "S", "E", "W", "Cancel"];
const DIRECTIONS = ["North Side", "South Side", "East Side", "West Side", "Garage", "Cancel"];
const sheetButons = ["Interior Inspection Sheet", "Exterior Inspection Sheet", "Soil Sample", "Dust Sample", "Layout Photo", "Property Photo", 'Cancel'];
//const itemButons = ['Window', 'Exterior Window', 'Doorway', 'Exterior Doorway', 'Roof Trim', 'Porch', 'Closet', 'Cabinet', 'Interior Room', 'Baseboard', 'Heater Vent', 'Stairs', 'Garage Door',
//'Garage Door Frame', 'Gutter/Downspout', 'Utility Box', 'Vent', 'Railings, 'Other', 'Cancel'];

const itemButons = ['Interior Window', 'Interior Doorway', 'Exterior Doorway', 'Interior Walls', 'Interior Roof Trim', 'Porch', 'Closet', 'Cabinet', 'Interior Trim', 'Misc Interior', 'Fireplace', 'Stairs', 'Tile', 'Exterior Windows', 'Garage Doors', 'Parking Lot', 'Misc Exterior', 'Exterior Trim', 'Other Item', 'Cancel'];
const itemExtButons = ['Exterior Doorway', 'Tile','Fireplace','Exterior Windows', 'Exterior Walls', 'Roof Trim', 'Porch', 'Exterior Trim', 'Closet', 'Cabinet','Garage Doors', 'Stairs', 'Misc Exterior', 'Parking Lot', 'Garage Walls', 'Other Item', 'Cancel'];
const CANCEL_INDEX = 15;
const CANCEL_INDEX2 = 9;


function InsSheet(props) {
  let testing = () => {
    console.log('set.selected')
  }
  return (
    <View>
      <Accordion setSelected={testing} dataArray={props.data} expanded={props.total}
        sheetId={props.id} removeWindow={props.removeWindow} renderHeader={props.renderWindowHeader} renderContent={(content) => props.renderSheet(content, props.id)}
      />
      <Button
        onPress={() =>
          ActionSheet.show(
            {
              options: itemButons,
              cancelButtonIndex: itemButons.length - 1,
              title: "Add Component"
            },
            buttonIndex => {
              for (var i = 0; i < itemButons.length - 1; i++) {
                if (buttonIndex == i) {
                  console.log('boop', props.id, itemButons[i])
                  props.addItemInterior(props.id, itemButons[i])
                }
              }
            }
          )}
      >
        <Text>Add Component</Text>
      </Button>
    </View>
  )
}

function ExtSheet(props) {
  let testing = () => {
    console.log('set.selected')
  }
  return (
    <View>
      <Accordion setSelected={testing} dataArray={props.data} expanded={props.total}
        sheetId={props.id} removeWindow={props.removeWindow} renderHeader={props.renderWindowHeader} renderContent={(content) => props.renderSheet(content, props.id)}
      />
      <Button
        onPress={() =>
          ActionSheet.show(
            {
              options: itemExtButons,
              cancelButtonIndex: itemExtButons.length - 1,
              title: "Add Component"
            },
            buttonIndex => {
              for (var i = 0; i < itemExtButons.length - 1; i++) {
                if (buttonIndex == i) {
                  props.addItemExterior(props.id, itemExtButons[i])
                }
              }
            }
          )}
      >
        <Text>Add Component</Text>
      </Button>
    </View>
  )
}

function SoilSheet(props) {
  //console.log(props)
  return (
    <View style={{ padding: 10, paddingBottom: 15 }}>
      <Item>
        <Text>Soil Sample</Text>
      </Item>
      <Accordion dataArray={props.data} expanded={props.total}
        renderHeader={props.renderWindowHeader}
        sheetId={props.id}
        removeWindow={props.removeWindow}
        renderContent={(content) => props.renderSoilSheet(content, props.id)}
      />
      <Button
        onPress={() => props.addSoilSample(props.id)}
      >
        <Text>Add Sample</Text>
      </Button>
    </View>
  )
}

function DustSheet(props) {
  //console.log(props)
  return (
    <View style={{ padding: 10, paddingBottom: 15 }}>
      <Item>
        <Text>Dust Sample</Text>
      </Item>
      <Accordion dataArray={props.data} expanded={props.total}
        sheetId={props.id}
        removeWindow={props.removeWindow}
        renderHeader={props.renderWindowHeader}
        renderContent={(content) => props.renderDustSheet(content, props.id)}
      />
      <Button
        onPress={() => props.addDustSample(props.id)}
      >
        <Text>Add Sample</Text>
      </Button>
    </View>
  )
}

export default class LinksScreen extends React.Component {
  _renderHeader(obj, expanded) {
    return (
      <View
        style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center", backgroundColor: obj.done ? "#5FB49C" : "#DEEFB7" }}
      >
        <Text style={{ fontWeight: "600" }}>
          {obj.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="arrow-dropright-circle" />}
      </View>
    );
  }
  renderExteriorHtmlFooter(sheetId, content) {
    return (

      <Grid>
        <Col>
          <Button block success style={{ marginTop: 10, marginBottom: 10, marginRight: 10 }} onPress={() => {
            Keyboard.dismiss();
            this.state.insSheets.map(x => {
              console.log(content.id)
              console.log('x', x.id)
              if (x.id == sheetId) {
                x.data.map(y => {
                  if (y.id == content.id) {
                    y.done = true
                    y.expanded = false
                  }
                })
                let col = x.total;
                if (col !== false) {
                  col += '1';
                  x.total = col;
                } else {
                  x.total = 'window';
                }
              }
            })
            this.setState({})
          }}>
            <Text>Done</Text>
          </Button>
        </Col>
        <Col>
          <Button block danger style={{ marginTop: 10, marginBottom: 10 }} onPress={() => {
            Alert.alert(
              'Remove',
              'Are you sure?',
              [

                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.removeWindow(sheetId, content.id) },
              ],
              { cancelable: false }
            )
          }}>
            <Text>Remove</Text>
          </Button>
        </Col>
      </Grid>

    )
  }
  renderHtmlFooter(sheetId, content) {
    return (

      <Grid>
        <Col>
          <Button block success style={{ marginTop: 10, marginBottom: 10, marginRight: 10 }} onPress={() => {
            Keyboard.dismiss();
            this.state.insSheets.map(x => {
              console.log(content.id)
              console.log('x', x.id)
              if (x.id == sheetId) {
                x.data.map(y => {
                  if (y.id == content.id) {
                    y.done = true
                    y.expanded = false
                  }
                })
                let col = x.total;
                if (col !== false) {
                  col += '1';
                  x.total = col;
                } else {
                  x.total = 'window';
                }
              }
            })
            this.setState({})
          }}>
            <Text>Done</Text>
          </Button>
        </Col>
        <Col>
          <Button block danger style={{ marginTop: 10, marginBottom: 10 }} onPress={() => {
            Alert.alert(
              'Remove',
              'Are you sure?',
              [

                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.removeWindow(sheetId, content.id) },
              ],
              { cancelable: false }
            )
          }}>
            <Text>Remove</Text>
          </Button>
        </Col>
      </Grid>

    )
  }

  renderCommonSheet(sheetId, content) {
    if (content.title === 'Eaves' || content.title === 'Rafters' || content.title === 'Fascia' || content.title === 'Soffit') {
      return (
        <View>
          <Grid style={{ marginTop: 0 }}>
            <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 9,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>{content.side || "Side"}</Text>
              </Button>
            </Col>
            <Col>
              <Button block error style={{ marginTop: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: TYPESEAVES,
                      cancelButtonIndex: TYPESEAVES.length - 1,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex == TYPESEAVES.length - 1) {
                        content.type = '';
                      } else {
                        content.type = TYPESEAVES[buttonIndex]
                      }
                      this.setState({})
                    }
                  )}>
                <Text>Type</Text>
              </Button>
            </Col>
          </Grid>
          <Button
            style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: BUTTONS.length - 1,
                  title: content.M || "Select Material"
                },
                buttonIndex => {
                  if (buttonIndex != BUTTONS.length - 1) {
                    content.M = BUTTONS[buttonIndex]
                  }
                  this.setState({})
                }
              )}
          >
            <Text>{content.M || "Material"}</Text>
          </Button>
          <Text >{content.I == true ? 'Intact' : 'Deteriorated'}{content.I}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
              content.I = !content.I
              this.setState({})
            }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Reading</Label>
            <Input keyboardType="numeric" value={content.R} onChangeText={(text) => { content.R = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    } else if (content.title === 'Column' || content.title === 'Beam' || content.title === 'Ceiling') {
      return (
        <View>
          <Grid style={{ marginTop: 0 }}>
            <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 9,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>{content.side || "Side"}</Text>
              </Button>
            </Col>
            <Col>
              <Button block error style={{ marginTop: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: TYPESCOL,
                      cancelButtonIndex: TYPESCOL.length - 1,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex == TYPESCOL.length - 1) {
                        content.type = '';
                      } else {
                        content.type = TYPESCOL[buttonIndex]
                      }
                      this.setState({})
                    }
                  )}>
                <Text>Type</Text>
              </Button>
            </Col>
          </Grid>
          <Button
            style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: BUTTONS.length - 1,
                  title: content.M || "Select Material"
                },
                buttonIndex => {
                  if (buttonIndex != BUTTONS.length - 1) {
                    content.M = BUTTONS[buttonIndex]
                  }
                  this.setState({})
                }
              )}
          >
            <Text>{content.M || "Material"}</Text>
          </Button>
          <Text >{content.I == true ? 'Intact' : 'Deteriorated'}{content.I}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
              content.I = !content.I
              this.setState({})
            }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Reading</Label>
            <Input keyboardType="numeric" value={content.R} onChangeText={(text) => { content.R = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    } else if (content.title === 'Gutter' || content.title === 'Downspout' || content.title === 'Electrical Utility Box' || content.title === 'Access Panel' || content.title === 'Vent') {
      return (
        <View>
          <Grid style={{ marginTop: 0 }}>
            <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 9,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>{content.side || "Side"}</Text>
              </Button>
            </Col>
            <Col>
              <Button block error style={{ marginTop: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: TYPESGUTT,
                      cancelButtonIndex: TYPESGUTT.length - 1,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex == TYPESGUTT.length - 1) {
                        content.type = '';
                      } else {
                        content.type = TYPESGUTT[buttonIndex]
                      }
                      this.setState({})
                    }
                  )}>
                <Text>Type</Text>
              </Button>
            </Col>
          </Grid>
          <Button
            style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: BUTTONS.length - 1,
                  title: content.M || "Select Material"
                },
                buttonIndex => {
                  if (buttonIndex != BUTTONS.length - 1) {
                    content.M = BUTTONS[buttonIndex]
                  }
                  this.setState({})
                }
              )}
          >
            <Text>{content.M || "Material"}</Text>
          </Button>
          <Text >{content.I == true ? 'Intact' : 'Deteriorated'}{content.I}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
              content.I = !content.I
              this.setState({})
            }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Reading</Label>
            <Input keyboardType="numeric" value={content.R} onChangeText={(text) => { content.R = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
    else {
      return (
        <View>
          <Grid style={{ marginTop: 0 }}>
            <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 9,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>{content.side || "Side"}</Text>
              </Button>
            </Col>
          </Grid>
          <Button
            style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: BUTTONS.length - 1,
                  title: content.M || "Select Material"
                },
                buttonIndex => {
                  if (buttonIndex != BUTTONS.length - 1) {
                    content.M = BUTTONS[buttonIndex]
                  }
                  this.setState({})
                }
              )}
          >
            <Text>{content.M || "Material"}</Text>
          </Button>
          <Text >{content.I == true ? 'Intact' : 'Deteriorated'}{content.I}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
              content.I = !content.I
              this.setState({})
            }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Reading</Label>
            <Input keyboardType="numeric" onChangeText={(text) => { content.R = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      );
    }
  }

  renderHtmlFooterChecklist(content) {
    //  this.setState({colStatus:true})
    return (
      <Grid>
        <Col>
          <Button block success style={{ marginTop: 10, marginBottom: 10, marginRight: 10 }} onPress={() => {
            let col = this.state.colStatus;
            if (col !== false) {
              col += '1';
              this.setState({ colStatus: col });
            } else {
              this.setState({ colStatus: 'check' });
            }
            content.done = true;
          }}>
            <Text>Done</Text>
          </Button>
        </Col>
      </Grid>
    )
  }

  _renderWindowHeader(obj, expanded, props) {
    //console.log(props)
    if (obj.done) {
      console.log('setting false!')
      expanded = false
    }
    return (
      <View
        style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center", backgroundColor: obj.done ? "#5FB49C" : "#DEEFB7" }}
      >
        <Text style={{ fontWeight: "600" }}>
          {obj.title} {obj.side}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="arrow-dropright-circle" />}
      </View>
    );
  }


  //////////Exterior
  _renderExtSheet(content, sheetId) {
    console.log('rendersheet', content.title)
    if (content.title == 'Trim') {
        return (
            <View>
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10, marginRight: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: SIDES,
                                        cancelButtonIndex: 9,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != SIDES.length - 1) {
                                            content.side = SIDES[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}>
                            <Text>{content.side || "Side"}</Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: TYPES,
                                        cancelButtonIndex: 24,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != TYPES.length - 1) {
                                            content.doorType = TYPES[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Crown Modling</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        cancelButtonIndex: BUTTONS.length - 1,
                                        title: content.cModling.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != BUTTONS.length - 1) {
                                            content.cModling.M = BUTTONS[buttonIndex]
                                            content.horizontal.M = BUTTONS[buttonIndex]
                                            content.vertical.M = BUTTONS[buttonIndex]
                                            content.picture.M = BUTTONS[buttonIndex]
                                            content.plate.M = BUTTONS[buttonIndex]
                                            content.corner.M = BUTTONS[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.cModling.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }} >{content.cModling.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.cModling.I} onChange={(e) => {
                                content.cModling.I = !content.cModling.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.cModling.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.cModling.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Picture</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        cancelButtonIndex: BUTTONS.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != BUTTONS.length - 1) {
                                            content.picture.M = BUTTONS[buttonIndex]
                                        }
                                        this.setState({})
                                    }
                                )}
                        >
                            <Text>{content.picture.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.picture.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.picture.I} onChange={(e) => {
                                content.picture.I = !content.picture.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.picture.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.picture.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Plate Rail</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        cancelButtonIndex: BUTTONS.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != BUTTONS.length - 1) {
                                            content.plate.M = BUTTONS[buttonIndex]
                                        }
                                        this.setState({})
                                    }
                                )}
                        >
                            <Text>{content.plate.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.plate.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.plate.I} onChange={(e) => {
                                content.plate.I = !content.plate.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.plate.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.plate.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Horizontal</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        cancelButtonIndex: BUTTONS.length - 1,
                                        title: content.horizontal.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != BUTTONS.length - 1) {
                                            content.horizontal.M = BUTTONS[buttonIndex]
                                        }
                                        this.setState({})
                                    }
                                )}
                        >
                            <Text>{content.horizontal.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }} >{content.horizontal.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.horizontal.I} onChange={(e) => {
                                content.horizontal.I = !content.horizontal.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.horizontal.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.horizontal.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Vertical</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        cancelButtonIndex: BUTTONS.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != BUTTONS.length - 1) {
                                            content.vertical.M = BUTTONS[buttonIndex]
                                        }
                                        this.setState({})
                                    }
                                )}
                        >
                            <Text>{content.vertical.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.vertical.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.vertical.I} onChange={(e) => {
                                content.vertical.I = !content.vertical.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.vertical.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.vertical.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Corner Boards</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        cancelButtonIndex: BUTTONS.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != BUTTONS.length - 1) {
                                            content.corner.M = BUTTONS[buttonIndex]
                                        }
                                        this.setState({})
                                    }
                                )}
                        >
                            <Text>{content.corner.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.corner.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.corner.I} onChange={(e) => {
                                content.corner.I = !content.corner.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.corner.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.corner.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>

                <Item stackedLabel>
                    <Label>Comments</Label>
                    <KeyboardAvoidingView enabled>
                        <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                    </KeyboardAvoidingView>
                </Item>

                {this.renderHtmlFooter(sheetId, content)}
            </View>
        );
    }
    /** exterior doorways */
    if (content.title == 'Closet') {
        return (
            <View>
                <Grid>
                    <Col>
                        <Button block error style={{ marginTop: 10, marginRight: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: SIDES,
                                        cancelButtonIndex: 9,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != SIDES.length - 1) {
                                            content.side = SIDES[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}>
                            <Text>{content.side || "Side"}</Text>
                        </Button>
                    </Col>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: TYPESCLOSET,
                                        cancelButtonIndex: TYPESCLOSET.length - 1,
                                        title: "Select Yype"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex == TYPESCLOSET.length - 1) {
                                            content.type = '';
                                        } else {
                                            content.type = TYPESCLOSET[buttonIndex]
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.type || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Closet Door</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB3,
                                        cancelButtonIndex: INTSUB3.length - 1,
                                        title: content.door.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB3.length - 1) {
                                            content.door.M = INTSUB3[buttonIndex]
                                            content.frame.M = INTSUB3[buttonIndex]
                                            content.shelf.M = INTSUB3[buttonIndex]
                                            content.support.M = INTSUB3[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.door.M || "Material"}</Text>
                        </Button>
                        <Text >{content.door.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                                content.door.I = !content.door.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.door.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.door.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Closet Frame</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB3,
                                        cancelButtonIndex: INTSUB3.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB3.length - 1) {
                                            content.frame.M = INTSUB3[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.frame.M || "Material"}</Text>
                        </Button>
                        <Text >{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                                content.frame.I = !content.frame.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.frame.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Closet Shelf</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB3,
                                        cancelButtonIndex: INTSUB3.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB3.length - 1) {
                                            content.shelf.M = INTSUB3[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.shelf.M || "Material"}</Text>
                        </Button>
                        <Text >{content.shelf.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.shelf.I} onChange={(e) => {
                                content.shelf.I = !content.shelf.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shelf.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.shelf.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Closet Shelf Support</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB3,
                                        cancelButtonIndex: INTSUB3.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB3.length - 1) {
                                            content.support.M = INTSUB3[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.support.M || "Material"}</Text>
                        </Button>
                        <Text >{content.support.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.support.I} onChange={(e) => {
                                content.support.I = !content.support.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.support.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.support.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderHtmlFooter(sheetId, content)}
            </View>

        );
    }

    if (content.title == 'Exterior Doorway') {
        return (

            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES1,
                                        cancelButtonIndex: EXTTYPES1.length - 1,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES1.length - 1) {
                                            content.doorType = EXTTYPES1[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Door</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB1,
                                        cancelButtonIndex: 3,
                                        title: content.door.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB1.length - 1) {
                                            content.door.M = EXTSUB1[buttonIndex]
                                            content.frame.M = EXTSUB1[buttonIndex]
                                            content.thresh.M = EXTSUB1[buttonIndex]
                                            content.securitydoor.M = EXTSUB1[buttonIndex]
                                            content.screendoor.M = EXTSUB1[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.door.M || "Material"}</Text>
                        </Button>
                        <Text >{content.door.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                                content.door.I = !content.door.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.door.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.door.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Door Frame</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB1,
                                        cancelButtonIndex: EXTSUB1.length - 1,
                                        title: content.frame.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB1.length - 1) {
                                            content.frame.M = EXTSUB1[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.frame.M || "Material"}</Text>
                        </Button>
                        <Text >{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                                content.frame.I = !content.frame.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.frame.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Threshold</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB1,
                                        cancelButtonIndex: EXTSUB1.length - 1,
                                        title: content.thresh.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB1.length - 1) {
                                            content.thresh.M = EXTSUB1[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.thresh.M || "Material"}</Text>
                        </Button>
                        <Text >{content.thresh.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.thresh.I} onChange={(e) => {
                                content.thresh.I = !content.thresh.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.thresh.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.thresh.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Security Door</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB1,
                                        cancelButtonIndex: EXTSUB1.length - 1,
                                        title: content.securitydoor.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB1.length - 1) {
                                            content.securitydoor.M = EXTSUB1[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.securitydoor.M || "Material"}</Text>
                        </Button>
                        <Text >{content.securitydoor.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.securitydoor.I} onChange={(e) => {
                                content.securitydoor.I = !content.securitydoor.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.securitydoor.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.securitydoor.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Screen Door</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB1,
                                        cancelButtonIndex: EXTSUB1.length - 1,
                                        title: content.screendoor.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB1.length - 1) {
                                            content.screendoor.M = EXTSUB1[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.screendoor.M || "Material"}</Text>
                        </Button>
                        <Text >{content.screendoor.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.screendoor.I} onChange={(e) => {
                                content.screendoor.I = !content.screendoor.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.screendoor.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.screendoor.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>

        );
    }
    /** exterior windows */
    if (content.title == 'Exterior Windows') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>

                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES2,
                                        cancelButtonIndex: EXTTYPES2.length - 1,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES2.length - 1) {
                                            content.doorType = EXTTYPES2[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Window Well</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB9,
                                        cancelButtonIndex: EXTSUB9.length - 1,
                                        title: content.well.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB9.length - 1) {
                                            content.well.M = EXTSUB9[buttonIndex]
                                            content.sash.M = EXTSUB9[buttonIndex]
                                            content.frame.M = EXTSUB9[buttonIndex]
                                            content.shutters.M = EXTSUB9[buttonIndex]
                                            content.securitybars.M = EXTSUB9[buttonIndex]
                                            content.awning.M = EXTSUB9[buttonIndex]
                                            content.windowScreen.M = EXTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.well.M || "Material"}</Text>
                        </Button>
                        <Text >{content.well.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.well.I} onChange={(e) => {
                                content.well.I = !content.well.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.well.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.well.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Window Sash</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB9,
                                        cancelButtonIndex: EXTSUB9.length - 1,
                                        title: content.sash.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB9.length - 1) {
                                            content.sash.M = EXTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.sash.M || "Material"}</Text>
                        </Button>
                        <Text >{content.sash.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.sash.I} onChange={(e) => {
                                content.sash.I = !content.sash.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.sash.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.sash.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Window Frame</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB9,
                                        cancelButtonIndex: EXTSUB9.length - 1,
                                        title: content.frame.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB9.length - 1) {
                                            content.frame.M = EXTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.frame.M || "Material"}</Text>
                        </Button>
                        <Text >{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                                content.frame.I = !content.frame.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.frame.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Shutters</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB9,
                                        cancelButtonIndex: EXTSUB9.length - 1,
                                        title: content.shutters.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB9.length - 1) {
                                            content.shutters.M = EXTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.shutters.M || "Material"}</Text>
                        </Button>
                        <Text >{content.shutters.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.shutters.I} onChange={(e) => {
                                content.shutters.I = !content.shutters.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shutters.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.shutters.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Security Bars</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB9,
                                        cancelButtonIndex: EXTSUB9.length - 1,
                                        title: content.securitybars.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB9.length - 1) {
                                            content.securitybars.M = EXTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.securitybars.M || "Material"}</Text>
                        </Button>
                        <Text >{content.securitybars.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.securitybars.I} onChange={(e) => {
                                content.securitybars.I = !content.securitybars.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.securitybars.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.securitybars.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Awning</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB9,
                                        cancelButtonIndex: EXTSUB9.length - 1,
                                        title: content.awning.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB9.length - 1) {
                                            content.awning.M = EXTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.awning.M || "Material"}</Text>
                        </Button>
                        <Text >{content.awning.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.awning.I} onChange={(e) => {
                                content.awning.I = !content.awning.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.awning.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.awning.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Window Screen</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB9,
                                        cancelButtonIndex: EXTSUB9.length - 1,
                                        title: content.windowScreen.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB9.length - 1) {
                                            content.windowScreen.M = EXTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.windowScreen.M || "Material"}</Text>
                        </Button>
                        <Text >{content.windowScreen.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.windowScreen.I} onChange={(e) => {
                                content.windowScreen.I = !content.windowScreen.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.windowScreen.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.windowScreen.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }
    /** exterior walls */
    if (content.title == 'Exterior Walls') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES3,
                                        cancelButtonIndex: EXTTYPES3.length - 1,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES3.length - 1) {
                                            content.doorType = EXTTYPES3[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Wall </Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB3,
                                        cancelButtonIndex: EXTSUB3.length - 1,
                                        title: content.wallA.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB3.length - 1) {
                                            content.wallA.M = EXTSUB3[buttonIndex]
                                            content.wallB.M = EXTSUB3[buttonIndex]
                                            content.wallC.M = EXTSUB3[buttonIndex]
                                            content.wallD.M = EXTSUB3[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.wallA.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }} >{content.wallA.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.wallA.I} onChange={(e) => {
                                content.wallA.I = !content.wallA.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallA.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.wallA.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Wall</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB3,
                                        cancelButtonIndex: EXTSUB3.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB3.length - 1) {
                                            content.wallB.M = EXTSUB3[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.wallB.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.wallB.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.wallB.I} onChange={(e) => {
                                content.wallB.I = !content.wallB.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallB.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.wallB.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Wall</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB3,
                                        cancelButtonIndex: EXTSUB3.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB3.length - 1) {
                                            content.wallC.M = EXTSUB3[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.wallC.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.wallC.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.wallC.I} onChange={(e) => {
                                content.wallC.I = !content.wallC.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallC.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.wallC.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Wall</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB3,
                                        cancelButtonIndex: EXTSUB3.length - 1,
                                        title: content.wallD.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB3.length - 1) {
                                            content.wallD.M = EXTSUB3[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.wallD.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.wallD.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.wallD.I} onChange={(e) => {
                                content.wallD.I = !content.wallD.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallD.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.wallD.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }

    if (content.title == 'Garage Walls') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES3,
                                        cancelButtonIndex: EXTTYPES3.length - 1,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES3.length - 1) {
                                            content.doorType = EXTTYPES3[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>A - Wall</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUBGWALL,
                                        cancelButtonIndex: EXTSUBGWALL.length - 1,
                                        title: content.wallA.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUBGWALL.length - 1) {
                                            content.wallA.M = EXTSUBGWALL[buttonIndex]
                                            content.wallB.M = EXTSUBGWALL[buttonIndex]
                                            content.wallC.M = EXTSUBGWALL[buttonIndex]
                                            content.wallD.M = EXTSUBGWALL[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.wallA.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }} >{content.wallA.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.wallA.I} onChange={(e) => {
                                content.wallA.I = !content.wallA.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallA.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.wallA.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>B - Wall</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUBGWALL,
                                        cancelButtonIndex: EXTSUBGWALL.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUBGWALL.length - 1) {
                                            content.wallB.M = EXTSUBGWALL[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.wallB.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.wallB.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.wallB.I} onChange={(e) => {
                                content.wallB.I = !content.wallB.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallB.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.wallB.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>C - Wall</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUBGWALL,
                                        cancelButtonIndex: EXTSUBGWALL.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUBGWALL.length - 1) {
                                            content.wallC.M = EXTSUBGWALL[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.wallC.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.wallC.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.wallC.I} onChange={(e) => {
                                content.wallC.I = !content.wallC.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallC.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.wallC.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>D - Wall</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUBGWALL,
                                        cancelButtonIndex: EXTSUBGWALL.length - 1,
                                        title: content.wallD.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUBGWALL.length - 1) {
                                            content.wallD.M = EXTSUBGWALL[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.wallD.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.wallD.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.wallD.I} onChange={(e) => {
                                content.wallD.I = !content.wallD.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallD.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.wallD.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }



    /** other iter */
    if (content.title == 'Other Item') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES3,
                                        cancelButtonIndex: EXTTYPES3.length - 1,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES3.length - 1) {
                                            content.doorType = EXTTYPES3[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Other Item</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUBGWALL,
                                        cancelButtonIndex: EXTSUBGWALL.length - 1,
                                        title: content.other.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUBGWALL.length - 1) {
                                            content.other.M = EXTSUBGWALL[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.other.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }} >{content.other.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.other.I} onChange={(e) => {
                                content.other.I = !content.other.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.other.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.other.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                  </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }
    /** roof trim */
    if (content.title == 'Roof Trim') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES4,
                                        cancelButtonIndex: EXTTYPES4.length - 1,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES4.length - 1) {
                                            content.doorType = EXTTYPES4[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Eaves</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB2,
                                            cancelButtonIndex: EXTSUB2.length - 1,
                                            title: content.eaves.M || "Select Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB2.length - 1) {
                                                content.eaves.M = EXTSUB2[buttonIndex]
                                                content.rafters.M = EXTSUB2[buttonIndex]
                                                content.fascia.M = EXTSUB2[buttonIndex]
                                                content.soffit.M = EXTSUB2[buttonIndex]
                                                content.corbel.M = EXTSUB2[buttonIndex]
                                                content.roofSup.M = EXTSUB2[buttonIndex]
                                                content.gutter.M = EXTSUB2[buttonIndex]
                                                content.downspout.M = EXTSUB2[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.eaves.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.eaves.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.eaves.I} onChange={(e) => {
                                content.eaves.I = !content.eaves.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.eaves.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.eaves.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>

                        <Text>Rafters</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB2,
                                            cancelButtonIndex: EXTSUB2.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB2.length - 1) {
                                                content.rafters.M = EXTSUB2[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.rafters.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.rafters.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.rafters.I} onChange={(e) => {
                                content.rafters.I = !content.rafters.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.rafters.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.rafters.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Fascia</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB2,
                                            cancelButtonIndex: EXTSUB2.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB2.length - 1) {
                                                content.fascia.M = EXTSUB2[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.fascia.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.fascia.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.fascia.I} onChange={(e) => {
                                content.fascia.I = !content.fascia.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.fascia.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.fascia.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Soffit</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB2,
                                            cancelButtonIndex: EXTSUB2.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB2.length - 1) {
                                                content.soffit.M = EXTSUB2[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.soffit.M || "Material"}</Text>
                            </Button>

                        </Grid>
                        <Text >{content.soffit.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.soffit.I} onChange={(e) => {
                                content.soffit.I = !content.soffit.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.soffit.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.soffit.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Gutter</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB2,
                                            cancelButtonIndex: EXTSUB2.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB2.length - 1) {
                                                content.gutter.M = EXTSUB2[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.gutter.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.gutter.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.gutter.I} onChange={(e) => {
                                content.gutter.I = !content.gutter.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.gutter.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.gutter.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Downspout</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB2,
                                            cancelButtonIndex: EXTSUB2.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB2.length - 1) {
                                                content.downspout.M = EXTSUB2[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.downspout.M || "Material"}</Text>
                            </Button>
                        </Grid>

                        <Text >{content.downspout.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.downspout.I} onChange={(e) => {
                                content.downspout.I = !content.downspout.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.downspout.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.downspout.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Corbel</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB2,
                                            cancelButtonIndex: EXTSUB2.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB2.length - 1) {
                                                content.corbel.M = EXTSUB2[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.corbel.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.corbel.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.corbel.I} onChange={(e) => {
                                content.corbel.I = !content.corbel.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.corbel.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.corbel.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Roof Support</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB2,
                                            cancelButtonIndex: EXTSUB2.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB2.length - 1) {
                                                content.roofSup.M = EXTSUB2[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.roofSup.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.roofSup.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.roofSup.I} onChange={(e) => {
                                content.roofSup.I = !content.roofSup.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.roofSup.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.roofSup.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }
    /** porch start trim */
    if (content.title == 'Porch') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES1,
                                        cancelButtonIndex: EXTTYPES1.length - 1,
                                        title: "Select Type"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES1.length - 1) {
                                            content.doorType = EXTTYPES1[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Column</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB4,
                                            cancelButtonIndex: EXTSUB4.length - 1,
                                            title: content.column.M || "Select Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB4.length - 1) {
                                                content.column.M = EXTSUB4[buttonIndex]
                                                content.beam.M = EXTSUB4[buttonIndex]
                                                content.ceiling.M = EXTSUB4[buttonIndex]
                                                content.floor.M = EXTSUB4[buttonIndex]
                                                content.handrail.M = EXTSUB4[buttonIndex]
                                                content.railing.M = EXTSUB4[buttonIndex]
                                                content.railcap.M = EXTSUB4[buttonIndex]
                                                content.mailSlot.M = EXTSUB4[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.column.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.column.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.column.I} onChange={(e) => {
                                content.column.I = !content.column.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.column.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.column.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>

                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Beam</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB4,
                                            cancelButtonIndex: EXTSUB4.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB4.length - 1) {
                                                content.beam.M = EXTSUB4[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.beam.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text style={{ marginTop: 10 }}>{content.beam.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.beam.I} onChange={(e) => {
                                content.beam.I = !content.beam.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.beam.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.beam.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Ceiling</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB4,
                                            cancelButtonIndex: EXTSUB4.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB4.length - 1) {
                                                content.ceiling.M = EXTSUB4[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.ceiling.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text style={{ marginTop: 10 }} >{content.ceiling.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.ceiling.I} onChange={(e) => {
                                content.ceiling.I = !content.ceiling.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.ceiling.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.ceiling.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Floor</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB4,
                                            cancelButtonIndex: EXTSUB4.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB4.length - 1) {
                                                content.floor.M = EXTSUB4[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.floor.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text style={{ marginTop: 10 }}>{content.floor.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.floor.I} onChange={(e) => {
                                content.floor.I = !content.floor.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.floor.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.floor.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Handrail</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB4,
                                            cancelButtonIndex: EXTSUB4.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB4.length - 1) {
                                                content.handrail.M = EXTSUB4[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.handrail.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text style={{ marginTop: 10 }}>{content.handrail.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.handrail.I} onChange={(e) => {
                                content.handrail.I = !content.handrail.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.handrail.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.handrail.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Railing</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB4,
                                            cancelButtonIndex: EXTSUB4.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB4.length - 1) {
                                                content.railing.M = EXTSUB4[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.railing.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text style={{ marginTop: 10 }}>{content.railing.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.railing.I} onChange={(e) => {
                                content.railing.I = !content.railing.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.railing.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.railing.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Rail Cap</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB4,
                                            cancelButtonIndex: EXTSUB4.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB4.length - 1) {
                                                content.railcap.M = EXTSUB4[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.railcap.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text style={{ marginTop: 10 }}>{content.railcap.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.railcap.I} onChange={(e) => {
                                content.railcap.I = !content.railcap.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.railcap.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.railcap.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Mail Slot</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB4,
                                            cancelButtonIndex: EXTSUB4.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB4.length - 1) {
                                                content.mailSlot.M = EXTSUB4[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.mailSlot.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text style={{ marginTop: 10 }}>{content.mailSlot.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.mailSlot.I} onChange={(e) => {
                                content.mailSlot.I = !content.mailSlot.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.mailSlot.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.mailSlot.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }
    /** exterior trim start */
    if (content.title == 'Exterior Trim') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES1,
                                        cancelButtonIndex: EXTTYPES1.length - 1,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES1.length - 1) {
                                            content.doorType = EXTTYPES1[buttonIndex]

                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Corner Boards</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB9,
                                            cancelButtonIndex: EXTSUB9.length - 1,
                                            title: content.cBoard.M || "Select Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB9.length - 1) {
                                                content.cBoard.M = EXTSUB9[buttonIndex]
                                                content.trim.M = EXTSUB9[buttonIndex]
                                                content.hTrim.M = EXTSUB9[buttonIndex]
                                                content.vTrim.M = EXTSUB9[buttonIndex]
                                                content.mDoor.M = EXTSUB9[buttonIndex]
                                                content.shelf.M = EXTSUB9[buttonIndex]
                                                content.shelfSupport.M = EXTSUB9[buttonIndex]
                                                content.support.M = EXTSUB9[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.cBoard.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.cBoard.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.cBoard.I} onChange={(e) => {
                                content.cBoard.I = !content.cBoard.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.cBoard.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.cBoard.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Trim</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB9,
                                            cancelButtonIndex: EXTSUB9.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB9.length - 1) {
                                                content.trim.M = EXTSUB9[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.trim.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.trim.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.trim.I} onChange={(e) => {
                                content.trim.I = !content.trim.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.trim.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.trim.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Horizontal Trim</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB9,
                                            cancelButtonIndex: EXTSUB9.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB9.length - 1) {
                                                content.hTrim.M = EXTSUB9[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.hTrim.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.hTrim.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.hTrim.I} onChange={(e) => {
                                content.hTrim.I = !content.hTrim.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.hTrim.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.hTrim.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Vertical Trim</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB9,
                                            cancelButtonIndex: EXTSUB9.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB9.length - 1) {
                                                content.vTrim.M = EXTSUB9[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.vTrim.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.vTrim.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.vTrim.I} onChange={(e) => {
                                content.vTrim.I = !content.vTrim.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.vTrim.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.vTrim.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>


                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Milk Door</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB9,
                                            cancelButtonIndex: EXTSUB9.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB9.length - 1) {
                                                content.mDoor.M = EXTSUB9[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.mDoor.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.mDoor.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.mDoor.I} onChange={(e) => {
                                content.mDoor.I = !content.mDoor.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.mDoor.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.mDoor.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Shelf</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB9,
                                            cancelButtonIndex: EXTSUB9.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB9.length - 1) {
                                                content.shelf.M = EXTSUB9[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.shelf.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.shelf.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.shelf.I} onChange={(e) => {
                                content.shelf.I = !content.shelf.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shelf.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.shelf.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Shelf Support</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB9,
                                            cancelButtonIndex: EXTSUB9.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB9.length - 1) {
                                                content.shelfSupport.M = EXTSUB9[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.shelfSupport.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.shelfSupport.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.shelfSupport.I} onChange={(e) => {
                                content.shelfSupport.I = !content.shelfSupport.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shelfSupport.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.shelfSupport.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Support</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB9,
                                            cancelButtonIndex: EXTSUB9.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB9.length - 1) {
                                                content.support.M = EXTSUB9[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.support.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.support.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.support.I} onChange={(e) => {
                                content.support.I = !content.support.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.support.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.support.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }
    /** stairs */
    if (content.title == 'Stairs') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES1,
                                        cancelButtonIndex: EXTTYPES1.length - 1,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES1.length - 1) {
                                            content.doorType = EXTTYPES1[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Tread</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB5,
                                        cancelButtonIndex: EXTSUB5.length - 1,
                                        title: content.tread.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB5.length - 1) {
                                            content.tread.M = EXTSUB5[buttonIndex]
                                            content.riser.M = EXTSUB5[buttonIndex]
                                            content.deck.M = EXTSUB5[buttonIndex]
                                            content.handrail.M = EXTSUB5[buttonIndex]
                                            content.railing.M = EXTSUB5[buttonIndex]
                                            content.stringer.M = EXTSUB5[buttonIndex]
                                            content.newel.M = EXTSUB5[buttonIndex]
                                            content.baluster.M = EXTSUB5[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.tread.M || "Material"}</Text>
                        </Button>
                        <Text >{content.tread.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.tread.I} onChange={(e) => {
                                content.tread.I = !content.tread.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.tread.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.tread.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Riser</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB5,
                                        cancelButtonIndex: EXTSUB5.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB5.length - 1) {
                                            content.riser.M = EXTSUB5[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.riser.M || "Material"}</Text>
                        </Button>
                        <Text >{content.riser.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.riser.I} onChange={(e) => {
                                content.riser.I = !content.riser.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.riser.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.riser.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Deck</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB5,
                                        cancelButtonIndex: EXTSUB5.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB5.length - 1) {
                                            content.deck.M = EXTSUB5[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.deck.M || "Material"}</Text>
                        </Button>
                        <Text >{content.deck.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.deck.I} onChange={(e) => {
                                content.deck.I = !content.deck.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>

                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.deck.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.deck.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Handrail</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB5,
                                        cancelButtonIndex: EXTSUB5.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB5.length - 1) {
                                            content.handrail.M = EXTSUB5[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.handrail.M || "Material"}</Text>
                        </Button>
                        <Text >{content.handrail.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.handrail.I} onChange={(e) => {
                                content.handrail.I = !content.handrail.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.handrail.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.handrail.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Railing</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB5,
                                        cancelButtonIndex: EXTSUB5.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB5.length - 1) {
                                            content.railing.M = EXTSUB5[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.railing.M || "Material"}</Text>
                        </Button>
                        <Text >{content.railing.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.railing.I} onChange={(e) => {
                                content.railing.I = !content.railing.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.railing.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.railing.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Stringer</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB5,
                                        cancelButtonIndex: EXTSUB5.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB5.length - 1) {
                                            content.stringer.M = EXTSUB5[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.stringer.M || "Material"}</Text>
                        </Button>
                        <Text >{content.stringer.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.stringer.I} onChange={(e) => {
                                content.stringer.I = !content.stringer.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.stringer.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.stringer.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Newel Post</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB5,
                                        cancelButtonIndex: EXTSUB5.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB5.length - 1) {
                                            content.newel.M = EXTSUB5[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.newel.M || "Material"}</Text>
                        </Button>
                        <Text >{content.newel.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.newel.I} onChange={(e) => {
                                content.newel.I = !content.newel.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.newel.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.newel.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Baluster</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTSUB5,
                                        cancelButtonIndex: EXTSUB5.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTSUB5.length - 1) {
                                            content.baluster.M = EXTSUB5[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.baluster.M || "Material"}</Text>
                        </Button>
                        <Text >{content.baluster.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.baluster.I} onChange={(e) => {
                                content.baluster.I = !content.baluster.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.baluster.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.baluster.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>

                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }
    if (content.title == 'Exterior Sheet Details') {
        return (
            <View>
                <Grid>
                    <Col>
                        <Item stackedLabel>
                            <Label>Unit Number</Label>
                            <Input value={content.unit} onChangeText={(text) => { content.unit = text; this.setState({}) }} />
                        </Item>
                    </Col>
                    <Col>
                        <Item stackedLabel>
                            <Label>Building Number</Label>
                            <Input value={content.building} onChangeText={(text) => { content.building = text; this.setState({}) }} />
                        </Item>
                    </Col>
                    <Col>
                        <Button block error style={{ marginTop: 10, marginRight: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: SIDES,
                                        cancelButtonIndex: 8,
                                        title: "Select Side"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != 8) {
                                            content.side = SIDES[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}>
                            <Text>{content.side || "Side"}</Text>
                        </Button>
                    </Col>
                    <Button block error style={{ marginTop: 10, marginRight: 10 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: DIRECTIONS,
                                    cancelButtonIndex: 5,
                                    title: "Select Side"
                                },
                                buttonIndex => {
                                    if (buttonIndex != 5) {
                                        content.direction = DIRECTIONS[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}>
                        <Text>{content.direction || "Room Equivalent"}</Text>
                    </Button>
                    <Col>
                      <Button block danger style={{ marginTop: 10, marginBottom: 10 }} onPress={() => {
                        Alert.alert(
                          'Remove',
                          'Are you sure?',
                          [

                            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            { text: 'OK', onPress: () => this.removeSheet(sheetId) },
                          ],
                          { cancelable: false }
                        )
                      }}>
                        <Text>Remove</Text>
                      </Button>
                    </Col>
                </Grid>

            </View>)
    }


    /** Garage Doors */
    if (content.title == 'Garage Doors') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES1,
                                        cancelButtonIndex: EXTTYPES1.length - 1,
                                        title: "Select Type"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES1.length - 1) {
                                            content.doorType = EXTTYPES1[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Garage Door</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB6,
                                            cancelButtonIndex: EXTSUB6.length - 1,
                                            title: content.door.M || "Select Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB6.length - 1) {
                                                content.door.M = EXTSUB6[buttonIndex]
                                                content.doorframe.M = EXTSUB6[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.door.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.door.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                                content.door.I = !content.door.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.door.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.door.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Garage Door Frame</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB6,
                                            cancelButtonIndex: EXTSUB6.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB6.length - 1) {
                                                content.doorframe.M = EXTSUB6[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.doorframe.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.doorframe.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.doorframe.I} onChange={(e) => {
                                content.doorframe.I = !content.doorframe.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.doorframe.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.doorframe.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }
    /**
     * Misc Exteroir
     */
    if (content.title == 'Misc Exterior') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES1,
                                        cancelButtonIndex: EXTTYPES1.length - 1,
                                        title: "Select Type"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES1.length - 1) {
                                            content.doorType = EXTTYPES1[buttonIndex]
                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Electric Panel/Frame</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB10,
                                            cancelButtonIndex: EXTSUB10.length - 1,
                                            title: content.frame.M || "Select Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB10.length - 1) {
                                                content.frame.M = EXTSUB10[buttonIndex]
                                                content.vent.M = EXTSUB10[buttonIndex]
                                                content.accessPanel.M = EXTSUB10[buttonIndex]
                                                content.gate.M = EXTSUB10[buttonIndex]
                                                content.fence.M = EXTSUB10[buttonIndex]
                                                content.playEquip.M = EXTSUB10[buttonIndex]
                                                content.planterBox.M = EXTSUB10[buttonIndex]
                                                content.equipment.M = EXTSUB10[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.frame.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                                content.frame.I = !content.frame.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.frame.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Equipment</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB10,
                                            cancelButtonIndex: EXTSUB10.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB10.length - 1) {
                                                content.equipment.M = EXTSUB10[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.equipment.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.equipment.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.equipment.I} onChange={(e) => {
                                content.equipment.I = !content.equipment.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.equipment.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.equipment.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Heater Vent</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB10,
                                            cancelButtonIndex: EXTSUB10.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB10.length - 1) {
                                                content.vent.M = EXTSUB10[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.vent.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.vent.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.vent.I} onChange={(e) => {
                                content.vent.I = !content.vent.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.vent.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.vent.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Access Panel/Frame</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB10,
                                            cancelButtonIndex: EXTSUB10.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB10.length - 1) {
                                                content.accessPanel.M = EXTSUB10[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.accessPanel.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.accessPanel.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.accessPanel.I} onChange={(e) => {
                                content.accessPanel.I = !content.accessPanel.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.accessPanel.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.accessPanel.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Gate</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB10,
                                            cancelButtonIndex: EXTSUB10.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB10.length - 1) {
                                                content.gate.M = EXTSUB10[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.gate.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.gate.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.gate.I} onChange={(e) => {
                                content.gate.I = !content.gate.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.gate.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.gate.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Fence</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB10,
                                            cancelButtonIndex: EXTSUB10.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB10.length - 1) {
                                                content.fence.M = EXTSUB10[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.fence.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.fence.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.fence.I} onChange={(e) => {
                                content.fence.I = !content.fence.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.fence.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.fence.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Playground Equipment</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB10,
                                            cancelButtonIndex: EXTSUB10.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB10.length - 1) {
                                                content.playEquip.M = EXTSUB10[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.playEquip.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.playEquip.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.playEquip.I} onChange={(e) => {
                                content.playEquip.I = !content.playEquip.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.playEquip.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.playEquip.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Planter Box</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB10,
                                            cancelButtonIndex: EXTSUB10.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB10.length - 1) {
                                                content.planterBox.M = EXTSUB10[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.planterBox.M || "Material"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.planterBox.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.planterBox.I} onChange={(e) => {
                                content.planterBox.I = !content.planterBox.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.planterBox.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.planterBox.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }
    /**
     * Parking Lot
     */
    if (content.title == 'Parking Lot') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid style={{ marginTop: 0 }}>
                    <Col>
                        <Button block error style={{ marginTop: 10 }}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: EXTTYPES1,
                                        cancelButtonIndex: EXTTYPES1.length - 1,
                                        title: "Select Type"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != EXTTYPES1.length - 1) {
                                            content.doorType = EXTTYPES1[buttonIndex]

                                        } else {
                                            content.doorType = '';
                                        }
                                        this.setState({})
                                    }
                                )}>
                            <Text>{content.doorType || 'Type'}</Text>
                        </Button>
                    </Col>
                </Grid>

                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Bollard</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB8,
                                            cancelButtonIndex: EXTSUB8.length - 1,
                                            title: content.bollard.M || "Select Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB8.length - 1) {
                                                content.bollard.M = EXTSUB8[buttonIndex]
                                                content.parkingStripe.M = EXTSUB8[buttonIndex]
                                                content.parkingStop.M = EXTSUB8[buttonIndex]
                                                content.curb.M = EXTSUB8[buttonIndex]
                                                content.lightPost.M = EXTSUB8[buttonIndex]
                                                content.speedBump.M = EXTSUB8[buttonIndex]
                                                content.fireHydrant.M = EXTSUB8[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.bollard.M || "Material"}</Text>
                            </Button>
                            <Button block error style={{ marginLeft: 10 }}
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: SIDES,
                                            cancelButtonIndex: 9,
                                            title: "Select Side"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != 9) {
                                                content.side = SIDES[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}>
                                <Text>{content.side || "Side"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.bollard.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.bollard.I} onChange={(e) => {
                                content.bollard.I = !content.bollard.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.bollard.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.bollard.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Parking Stripe</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB8,
                                            cancelButtonIndex: EXTSUB8.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB8.length - 1) {
                                                content.parkingStripe.M = EXTSUB8[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.parkingStripe.M || "Material"}</Text>
                            </Button>
                            <Button block error style={{ marginLeft: 10 }}
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: SIDES,
                                            cancelButtonIndex: 9,
                                            title: "Select Side"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != 9) {
                                                content.side = SIDES[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}>
                                <Text>{content.side || "Side"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.parkingStripe.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.parkingStripe.I} onChange={(e) => {
                                content.parkingStripe.I = !content.parkingStripe.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.parkingStripe.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.parkingStripe.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Parking Stop</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB8,
                                            cancelButtonIndex: EXTSUB8.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB8.length - 1) {
                                                content.parkingStop.M = EXTSUB8[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.parkingStop.M || "Material"}</Text>
                            </Button>
                            <Button block error style={{ marginLeft: 10 }}
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: SIDES,
                                            cancelButtonIndex: 9,
                                            title: "Select Side"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != 9) {
                                                content.side = SIDES[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}>
                                <Text>{content.side || "Side"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.parkingStop.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.parkingStop.I} onChange={(e) => {
                                content.parkingStop.I = !content.parkingStop.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.parkingStop.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.parkingStop.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Curb</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB8,
                                            cancelButtonIndex: EXTSUB8.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB8.length - 1) {
                                                content.curb.M = EXTSUB8[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.curb.M || "Material"}</Text>
                            </Button>
                            <Button block error style={{ marginLeft: 10 }}
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: SIDES,
                                            cancelButtonIndex: 9,
                                            title: "Select Side"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != 9) {
                                                content.side = SIDES[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}>
                                <Text>{content.side || "Side"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.curb.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.curb.I} onChange={(e) => {
                                content.curb.I = !content.curb.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.curb.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.curb.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Light Post</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB8,
                                            cancelButtonIndex: EXTSUB8.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB8.length - 1) {
                                                content.lightPost.M = EXTSUB8[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.lightPost.M || "Material"}</Text>
                            </Button>
                            <Button block error style={{ marginLeft: 10 }}
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: SIDES,
                                            cancelButtonIndex: 9,
                                            title: "Select Side"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != 9) {
                                                content.side = SIDES[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}>
                                <Text>{content.side || "Side"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.lightPost.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.lightPost.I} onChange={(e) => {
                                content.lightPost.I = !content.lightPost.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.lightPost.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.lightPost.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Speed Bump</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB8,
                                            cancelButtonIndex: EXTSUB8.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB8.length - 1) {
                                                content.speedBump.M = EXTSUB8[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.speedBump.M || "Material"}</Text>
                            </Button>
                            <Button block error style={{ marginLeft: 10 }}
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: SIDES,
                                            cancelButtonIndex: 9,
                                            title: "Select Side"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != 9) {
                                                content.side = SIDES[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}>
                                <Text>{content.side || "Side"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.speedBump.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.speedBump.I} onChange={(e) => {
                                content.speedBump.I = !content.speedBump.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.speedBump.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.speedBump.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Fire Hydrant</Text>
                        <Grid style={{ marginBottom: 20 }}>
                            <Button
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: EXTSUB8,
                                            cancelButtonIndex: EXTSUB8.length - 1,
                                            title: "Material"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != EXTSUB8.length - 1) {
                                                content.fireHydrant.M = EXTSUB8[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}
                            >
                                <Text>{content.fireHydrant.M || "Material"}</Text>
                            </Button>
                            <Button block error style={{ marginLeft: 10 }}
                                onPress={() =>
                                    ActionSheet.show(
                                        {
                                            options: SIDES,
                                            cancelButtonIndex: 9,
                                            title: "Select Side"
                                        },
                                        buttonIndex => {
                                            if (buttonIndex != 9) {
                                                content.side = SIDES[buttonIndex]
                                                this.setState({})
                                            }
                                        }
                                    )}>
                                <Text>{content.side || "Side"}</Text>
                            </Button>
                        </Grid>
                        <Text >{content.fireHydrant.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.fireHydrant.I} onChange={(e) => {
                                content.fireHydrant.I = !content.fireHydrant.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.fireHydrant.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.fireHydrant.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderExteriorHtmlFooter(sheetId, content)}
            </View>
        );
    }
    /** Tile */
    if (content.title == 'Tile') {
        return (
            <View keyboardDismissMode="on-drag">
                <Grid >
                    <Col style={{ height: 200 }}>
                        <Text>Shower</Text>
                        <Grid>
                            <Col>
                                <Button
                                    onPress={() =>
                                        ActionSheet.show(
                                            {
                                                options: INTSUB9,
                                                cancelButtonIndex: INTSUB9.length - 1,
                                                title: content.shower.M || "Select Material"
                                            },
                                            buttonIndex => {
                                                if (buttonIndex != INTSUB9.length - 1) {
                                                    content.shower.M = INTSUB9[buttonIndex]
                                                    content.wall.M = INTSUB9[buttonIndex]
                                                    content.curb.M = INTSUB9[buttonIndex]
                                                    content.ceiling.M = INTSUB9[buttonIndex]
                                                    content.floor.M = INTSUB9[buttonIndex]
                                                    content.backsplash.M = INTSUB9[buttonIndex]
                                                    content.trim.M = INTSUB9[buttonIndex]
                                                    this.setState({})
                                                }
                                            }
                                        )}
                                >
                                    <Text>{content.shower.M || "Material"}</Text>
                                </Button>
                            </Col>
                        </Grid>
                        <Text style={{ marginTop: 45 }} >{content.shower.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.shower.I} onChange={(e) => {
                                content.shower.I = !content.shower.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shower.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.shower.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Wall</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB9,
                                        cancelButtonIndex: INTSUB9.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB9.length - 1) {
                                            content.wall.M = INTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.wall.M || "Material"}</Text>
                        </Button>
                        <Text >{content.wall.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.wall.I} onChange={(e) => {
                                content.wall.I = !content.wall.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wall.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.wall.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                    <Col style={{ height: 200 }}>
                        <Text>Curb</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB9,
                                        cancelButtonIndex: INTSUB9.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB9.length - 1) {
                                            content.curb.M = INTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.curb.M || "Material"}</Text>
                        </Button>
                        <Text >{content.curb.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.curb.I} onChange={(e) => {
                                content.curb.I = !content.curb.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.curb.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.curb.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Ceiling</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB9,
                                        cancelButtonIndex: INTSUB9.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB9.length - 1) {
                                            content.ceiling.M = INTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.ceiling.M || "Material"}</Text>
                        </Button>
                        <Text >{content.ceiling.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.ceiling.I} onChange={(e) => {
                                content.ceiling.I = !content.ceiling.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.ceiling.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.ceiling.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Floor</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB9,
                                        cancelButtonIndex: INTSUB9.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB9.length - 1) {
                                            content.floor.M = INTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.floor.M || "Material"}</Text>
                        </Button>
                        <Text >{content.floor.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.floor.I} onChange={(e) => {
                                content.floor.I = !content.floor.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.floor.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.floor.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Backsplash</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB9,
                                        cancelButtonIndex: INTSUB9.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB9.length - 1) {
                                            content.backsplash.M = INTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.backsplash.M || "Material"}</Text>
                        </Button>
                        <Text >{content.backsplash.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.backsplash.I} onChange={(e) => {
                                content.backsplash.I = !content.backsplash.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.backsplash.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.backsplash.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>

                </Grid>
                <Grid>
                    <Col style={{ height: 200 }}>
                        <Text>Trim</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB9,
                                        cancelButtonIndex: INTSUB9.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB9.length - 1) {
                                            content.trim.M = INTSUB9[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.trim.M || "Material"}</Text>
                        </Button>
                        <Text >{content.trim.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.trim.I} onChange={(e) => {
                                content.trim.I = !content.trim.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.trim.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.trim.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>
                {this.renderHtmlFooter(sheetId, content)}
            </View>


        );
    }
    /** Fire place */
    if (content.title == 'Fireplace') {
        return (
            <View keyboardDismissMode="on-drag">


                <Grid style={{ marginTop: 10 }}>
                    <Col style={{ height: 200 }}>
                        <Text>Mantle</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB7,
                                        cancelButtonIndex: INTSUB7.length - 1,
                                        title: content.mantle.M || "Select Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB7.length - 1) {
                                            content.mantle.M = INTSUB7[buttonIndex]
                                            content.hearth.M = INTSUB7[buttonIndex]
                                            content.fireplace.M = INTSUB7[buttonIndex]
                                            content.chimney.M = INTSUB7[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.mantle.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }} >{content.mantle.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.mantle.I} onChange={(e) => {
                                content.mantle.I = !content.mantle.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.mantle.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.mantle.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Hearth</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB7,
                                        cancelButtonIndex: INTSUB7.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB7.length - 1) {
                                            content.hearth.M = INTSUB7[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.hearth.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.hearth.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.hearth.I} onChange={(e) => {
                                content.hearth.I = !content.hearth.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.hearth.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.hearth.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Fireplace</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB7,
                                        cancelButtonIndex: INTSUB7.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB7.length - 1) {
                                            content.fireplace.M = INTSUB7[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.fireplace.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.fireplace.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.fireplace.I} onChange={(e) => {
                                content.fireplace.I = !content.fireplace.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.fireplace.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.fireplace.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                    <Col style={{ height: 200 }}>
                        <Text>Chimney</Text>
                        <Button
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: INTSUB7,
                                        cancelButtonIndex: INTSUB7.length - 1,
                                        title: "Material"
                                    },
                                    buttonIndex => {
                                        if (buttonIndex != INTSUB7.length - 1) {
                                            content.chimney.M = INTSUB7[buttonIndex]
                                            this.setState({})
                                        }
                                    }
                                )}
                        >
                            <Text>{content.chimney.M || "Material"}</Text>
                        </Button>
                        <Text style={{ marginTop: 10 }}>{content.chimney.I == true ? 'Intact' : 'Deteriorated'}</Text>
                        <ListItem>
                            <RkChoice rkType='posNeg' selected={content.chimney.I} onChange={(e) => {
                                content.chimney.I = !content.chimney.I
                                this.setState({})
                            }} />
                        </ListItem>
                        <Item>
                            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.chimney.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.chimney.R = String((Math.round(p) / 10).toFixed(1));
                                this.setState({})
                            }} />
                        </Item>
                    </Col>
                </Grid>
                <Item stackedLabel>
                    <Label>Comments</Label>
                    <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
                </Item>

                {this.renderHtmlFooter(sheetId, content)}
            </View>
        );
    }
    if (content.title == 'Cabinet') {
        return (<View keyboardDismissMode="on-drag">
            <Grid style={{ marginTop: 0 }}>
                <Col>
                    <Button block error style={{ marginTop: 10 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: TYPESCAB,
                                    cancelButtonIndex: TYPESCAB.length - 1,
                                    title: "Select Type"
                                },
                                buttonIndex => {
                                    if (buttonIndex != TYPESCAB.length - 1) {
                                        content.type = TYPESCAB[buttonIndex]
                                    } else {
                                        content.type = '';
                                    }
                                    this.setState({})
                                }
                            )}>
                        <Text>{content.type || 'Type'}</Text>
                    </Button>
                </Col>
            </Grid>
            <Grid style={{ marginTop: 10 }}>
                <Col style={{ height: 200 }}>
                    <Text>Cabinet Frame</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: INTSUB4,
                                    cancelButtonIndex: INTSUB4.length - 1,
                                    title: content.frame.M || "Select Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != INTSUB4.length - 1) {
                                        content.frame.M = INTSUB4[buttonIndex]
                                        content.door.M = INTSUB4[buttonIndex]
                                        content.shelf.M = INTSUB4[buttonIndex]
                                        content.countertop.M = INTSUB4[buttonIndex]
                                        content.backsplash.M = INTSUB4[buttonIndex]
                                        content.medicine.M = INTSUB4[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.frame.M || "Material"}</Text>
                    </Button>
                    <Text >{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                            content.frame.I = !content.frame.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.frame.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Cabinet Door/Drawer</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: INTSUB4,
                                    cancelButtonIndex: INTSUB4.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != INTSUB4.length - 1) {
                                        content.door.M = INTSUB4[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.door.M || "Material"}</Text>
                    </Button>
                    <Text >{content.door.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                            content.door.I = !content.door.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.door.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.door.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Cabinet Shelf</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: INTSUB4,
                                    cancelButtonIndex: INTSUB4.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != INTSUB4.length - 1) {
                                        content.shelf.M = INTSUB4[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.shelf.M || "Material"}</Text>
                    </Button>
                    <Text >{content.shelf.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.shelf.I} onChange={(e) => {
                            content.shelf.I = !content.shelf.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shelf.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.shelf.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Countertop</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: INTSUB4,
                                    cancelButtonIndex: INTSUB4.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != INTSUB4.length - 1) {
                                        content.countertop.M = INTSUB4[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.countertop.M || "Material"}</Text>
                    </Button>
                    <Text >{content.countertop.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.countertop.I} onChange={(e) => {
                            content.countertop.I = !content.countertop.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.countertop.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.countertop.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
            </Grid>

            <Grid style={{ marginTop: 10 }}>
                <Col style={{ height: 200 }}>
                    <Text>Backsplash</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: INTSUB4,
                                    cancelButtonIndex: INTSUB4.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != INTSUB4.length - 1) {
                                        content.backsplash.M = INTSUB4[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.backsplash.M || "Material"}</Text>
                    </Button>
                    <Text >{content.backsplash.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.backsplash.I} onChange={(e) => {
                            content.backsplash.I = !content.backsplash.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.backsplash.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.backsplash.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Medicine Cabinet</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: INTSUB4,
                                    cancelButtonIndex: INTSUB4.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != INTSUB4.length - 1) {
                                        content.medicine.M = INTSUB4[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.medicine.M || "Material"}</Text>
                    </Button>
                    <Text >{content.medicine.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.medicine.I} onChange={(e) => {
                            content.medicine.I = !content.medicine.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.medicine.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.medicine.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
            </Grid>
            <Item stackedLabel>
              <Label>Comments</Label>
              <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
            </Item>
            {this.renderHtmlFooter(sheetId, content)}
        </View>
        );
    }
}

_renderIntSheet(content, sheetId) {
  console.log('rendersheet', content.title)
  // console.log(this.state.insSheets)
  if (content.title == 'Porch') {
    return (
      <View keyboardDismissMode="on-drag">
        <Grid style={{ marginTop: 0 }}>
          <Col>
            <Button block error style={{ marginTop: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTTYPES1,
                    cancelButtonIndex: EXTTYPES1.length - 1,
                    title: "Select Type"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTTYPES1.length - 1) {
                      content.doorType = EXTTYPES1[buttonIndex]
                    } else {
                      content.doorType = '';
                    }
                    this.setState({})
                  }
                )}>
              <Text>{content.doorType || 'Type'}</Text>
            </Button>
          </Col>
        </Grid>

        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Column</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB4,
                      cancelButtonIndex: EXTSUB4.length - 1,
                      title: content.column.M || "Select Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB4.length - 1) {
                        content.column.M = EXTSUB4[buttonIndex]
                        content.beam.M = EXTSUB4[buttonIndex]
                        content.ceiling.M = EXTSUB4[buttonIndex]
                        content.floor.M = EXTSUB4[buttonIndex]
                        content.handrail.M = EXTSUB4[buttonIndex]
                        content.railing.M = EXTSUB4[buttonIndex]
                        content.railcap.M = EXTSUB4[buttonIndex]
                        content.mailSlot.M = EXTSUB4[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.column.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.column.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.column.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text >{content.column.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.column.I} onChange={(e) => {
                content.column.I = !content.column.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.column.R} onChangeText={(text) => {
                  let p = text.split('.').join('');
                  content.column.R = String((Math.round(p) / 10).toFixed(1));
                  this.setState({})
              }} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Beam</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB4,
                      cancelButtonIndex: EXTSUB4.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB4.length - 1) {
                        content.beam.M = EXTSUB4[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.beam.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.beam.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.beam.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text style={{ marginTop: 10 }}>{content.beam.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.beam.I} onChange={(e) => {
                content.beam.I = !content.beam.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.beam.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.beam.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Ceiling</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB4,
                      cancelButtonIndex: EXTSUB4.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB4.length - 1) {
                        content.ceiling.M = EXTSUB4[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.ceiling.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.ceiling.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.ceiling.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text style={{ marginTop: 10 }} >{content.ceiling.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.ceiling.I} onChange={(e) => {
                content.ceiling.I = !content.ceiling.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.ceiling.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.ceiling.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Floor</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB4,
                      cancelButtonIndex: EXTSUB4.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB4.length - 1) {
                        content.floor.M = EXTSUB4[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.floor.M || "Material"}</Text>
              </Button>
            </Grid>
            <Text style={{ marginTop: 10 }}>{content.floor.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.floor.I} onChange={(e) => {
                content.floor.I = !content.floor.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.floor.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.floor.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Handrail</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB4,
                      cancelButtonIndex: EXTSUB4.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB4.length - 1) {
                        content.handrail.M = EXTSUB4[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.handrail.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.handrail.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.handrail.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text style={{ marginTop: 10 }}>{content.handrail.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.handrail.I} onChange={(e) => {
                content.handrail.I = !content.handrail.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.handrail.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.handrail.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Railing</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB4,
                      cancelButtonIndex: EXTSUB4.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB4.length - 1) {
                        content.railing.M = EXTSUB4[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.railing.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.railing.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.railing.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text style={{ marginTop: 10 }}>{content.railing.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.railing.I} onChange={(e) => {
                content.railing.I = !content.railing.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.railing.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.railing.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Rail Cap</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB4,
                      cancelButtonIndex: EXTSUB4.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB4.length - 1) {
                        content.railcap.M = EXTSUB4[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.railcap.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.railcap.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.railcap.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text style={{ marginTop: 10 }}>{content.railcap.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.railcap.I} onChange={(e) => {
                content.railcap.I = !content.railcap.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.railcap.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.railcap.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Mail Slot</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB4,
                      cancelButtonIndex: EXTSUB4.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB4.length - 1) {
                        content.mailSlot.M = EXTSUB4[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.mailSlot.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.mailSlot.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.mailSlot.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text style={{ marginTop: 10 }}>{content.mailSlot.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.mailSlot.I} onChange={(e) => {
                content.mailSlot.I = !content.mailSlot.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.mailSlot.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.mailSlot.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderExteriorHtmlFooter(sheetId, content)}
      </View>
    );
  }
  /** exterior windows */
  if (content.title == 'Exterior Windows') {
    return (
      <View keyboardDismissMode="on-drag">
        <Grid style={{ marginTop: 0 }}>
        <Col>
          <Button block error style={{ marginTop: 10, marginRight: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: SIDES,
                  cancelButtonIndex: 9,
                  title: "Select Side"
                },
                buttonIndex => {
                  if (buttonIndex != SIDES.length - 1) {
                    content.side = SIDES[buttonIndex]
                    this.setState({})
                  }
                }
              )}>
            <Text>{content.side || "Side"}</Text>
          </Button>
        </Col>
          <Col>
            <Button block error style={{ marginTop: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTTYPES2,
                    cancelButtonIndex: EXTTYPES2.length - 1,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTTYPES2.length - 1) {
                      content.doorType = EXTTYPES2[buttonIndex]
                    } else {
                      content.doorType = '';
                    }
                    this.setState({})
                  }
                )}>
              <Text>{content.doorType || 'Type'}</Text>
            </Button>
          </Col>
        </Grid>

        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Window Well</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB9,
                    cancelButtonIndex: EXTSUB9.length - 1,
                    title: content.well.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB9.length - 1) {
                      content.well.M = EXTSUB9[buttonIndex]
                      content.sash.M = EXTSUB9[buttonIndex]
                      content.frame.M = EXTSUB9[buttonIndex]
                      content.shutters.M = EXTSUB9[buttonIndex]
                      content.securitybars.M = EXTSUB9[buttonIndex]
                      content.awning.M = EXTSUB9[buttonIndex]
                      content.windowScreen.M = EXTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.well.M || "Material"}</Text>
            </Button>
            <Text >{content.well.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.well.I} onChange={(e) => {
                content.well.I = !content.well.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.well.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.well.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Window Sash</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB9,
                    cancelButtonIndex: EXTSUB9.length - 1,
                    title: content.sash.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB9.length - 1) {
                      content.sash.M = EXTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.sash.M || "Material"}</Text>
            </Button>
            <Text >{content.sash.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.sash.I} onChange={(e) => {
                content.sash.I = !content.sash.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.sash.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.sash.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Window Frame</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB9,
                    cancelButtonIndex: EXTSUB9.length - 1,
                    title: content.frame.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB9.length - 1) {
                      content.frame.M = EXTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.frame.M || "Material"}</Text>
            </Button>
            <Text >{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                content.frame.I = !content.frame.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.frame.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>

        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Shutters</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB9,
                    cancelButtonIndex: EXTSUB9.length - 1,
                    title: content.shutters.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB9.length - 1) {
                      content.shutters.M = EXTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.shutters.M || "Material"}</Text>
            </Button>
            <Text >{content.shutters.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.shutters.I} onChange={(e) => {
                content.shutters.I = !content.shutters.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shutters.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.shutters.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Security Bars</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB9,
                    cancelButtonIndex: EXTSUB9.length - 1,
                    title: content.securitybars.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB9.length - 1) {
                      content.securitybars.M = EXTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.securitybars.M || "Material"}</Text>
            </Button>
            <Text >{content.securitybars.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.securitybars.I} onChange={(e) => {
                content.securitybars.I = !content.securitybars.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.securitybars.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.securitybars.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Awning</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB9,
                    cancelButtonIndex: EXTSUB9.length - 1,
                    title: content.awning.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB9.length - 1) {
                      content.awning.M = EXTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.awning.M || "Material"}</Text>
            </Button>
            <Text >{content.awning.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.awning.I} onChange={(e) => {
                content.awning.I = !content.awning.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.awning.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.awning.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
        <Col style={{ height: 200 }}>
            <Text>Window Screen</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB9,
                    cancelButtonIndex: EXTSUB9.length - 1,
                    title: content.windowScreen.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB9.length - 1) {
                      content.windowScreen.M = EXTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.windowScreen.M || "Material"}</Text>
            </Button>
            <Text >{content.windowScreen.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.windowScreen.I} onChange={(e) => {
                content.windowScreen.I = !content.windowScreen.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.windowScreen.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.windowScreen.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderExteriorHtmlFooter(sheetId, content)}
      </View>
    );
  }
 /** exterior trim start */
 if (content.title == 'Exterior Trim') {
  return (
      <View keyboardDismissMode="on-drag">
          <Grid style={{ marginTop: 0 }}>
              <Col>
                  <Button block error style={{ marginTop: 10 }}
                      onPress={() =>
                          ActionSheet.show(
                              {
                                  options: EXTTYPES1,
                                  cancelButtonIndex: EXTTYPES1.length - 1,
                                  title: "Select Side"
                              },
                              buttonIndex => {
                                  if (buttonIndex != EXTTYPES1.length - 1) {
                                      content.doorType = EXTTYPES1[buttonIndex]

                                  } else {
                                      content.doorType = '';
                                  }
                                  this.setState({})
                              }
                          )}>
                      <Text>{content.doorType || 'Type'}</Text>
                  </Button>
              </Col>
          </Grid>

          <Grid style={{ marginTop: 10 }}>
              <Col style={{ height: 200 }}>
                  <Text>Corner Boards</Text>
                  <Grid style={{ marginBottom: 20 }}>
                      <Button
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: EXTSUB9,
                                      cancelButtonIndex: EXTSUB9.length - 1,
                                      title: content.cBoard.M || "Select Material"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != EXTSUB9.length - 1) {
                                          content.cBoard.M = EXTSUB9[buttonIndex]
                                          content.trim.M = EXTSUB9[buttonIndex]
                                          content.hTrim.M = EXTSUB9[buttonIndex]
                                          content.vTrim.M = EXTSUB9[buttonIndex]
                                          content.mDoor.M = EXTSUB9[buttonIndex]
                                          content.shelf.M = EXTSUB9[buttonIndex]
                                          content.shelfSupport.M = EXTSUB9[buttonIndex]
                                          content.support.M = EXTSUB9[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}
                      >
                          <Text>{content.cBoard.M || "Material"}</Text>
                      </Button>
                      <Button block error style={{ marginLeft: 10 }}
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: SIDES,
                                      cancelButtonIndex: 9,
                                      title: "Select Side"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != 9) {
                                          content.side = SIDES[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}>
                          <Text>{content.side || "Side"}</Text>
                      </Button>
                  </Grid>
                  <Text >{content.cBoard.I == true ? 'Intact' : 'Deteriorated'}</Text>
                  <ListItem>
                      <RkChoice rkType='posNeg' selected={content.cBoard.I} onChange={(e) => {
                          content.cBoard.I = !content.cBoard.I
                          this.setState({})
                      }} />
                  </ListItem>
                  <Item>
                      <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.cBoard.R} onChangeText={(text) => {
                          let p = text.split('.').join('');
                          content.cBoard.R = String((Math.round(p) / 10).toFixed(1));
                          this.setState({})
                      }} />
                  </Item>
              </Col>
              <Col style={{ height: 200 }}>
                  <Text>Trim</Text>
                  <Grid style={{ marginBottom: 20 }}>
                      <Button
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: EXTSUB9,
                                      cancelButtonIndex: EXTSUB9.length - 1,
                                      title: "Material"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != EXTSUB9.length - 1) {
                                          content.trim.M = EXTSUB9[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}
                      >
                          <Text>{content.trim.M || "Material"}</Text>
                      </Button>
                      <Button block error style={{ marginLeft: 10 }}
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: SIDES,
                                      cancelButtonIndex: 9,
                                      title: "Select Side"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != 9) {
                                          content.side = SIDES[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}>
                          <Text>{content.side || "Side"}</Text>
                      </Button>
                  </Grid>
                  <Text >{content.trim.I == true ? 'Intact' : 'Deteriorated'}</Text>
                  <ListItem>
                      <RkChoice rkType='posNeg' selected={content.trim.I} onChange={(e) => {
                          content.trim.I = !content.trim.I
                          this.setState({})
                      }} />
                  </ListItem>
                  <Item>
                      <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.trim.R} onChangeText={(text) => {
                          let p = text.split('.').join('');
                          content.trim.R = String((Math.round(p) / 10).toFixed(1));
                          this.setState({})
                      }} />
                  </Item>
              </Col>
          </Grid>
          <Grid style={{ marginTop: 10 }}>
              <Col style={{ height: 200 }}>
                  <Text>Horizontal Trim</Text>
                  <Grid style={{ marginBottom: 20 }}>
                      <Button
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: EXTSUB9,
                                      cancelButtonIndex: EXTSUB9.length - 1,
                                      title: "Material"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != EXTSUB9.length - 1) {
                                          content.hTrim.M = EXTSUB9[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}
                      >
                          <Text>{content.hTrim.M || "Material"}</Text>
                      </Button>
                      <Button block error style={{ marginLeft: 10 }}
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: SIDES,
                                      cancelButtonIndex: 9,
                                      title: "Select Side"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != 9) {
                                          content.side = SIDES[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}>
                          <Text>{content.side || "Side"}</Text>
                      </Button>
                  </Grid>
                  <Text >{content.hTrim.I == true ? 'Intact' : 'Deteriorated'}</Text>
                  <ListItem>
                      <RkChoice rkType='posNeg' selected={content.hTrim.I} onChange={(e) => {
                          content.hTrim.I = !content.hTrim.I
                          this.setState({})
                      }} />
                  </ListItem>
                  <Item>
                      <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.hTrim.R} onChangeText={(text) => {
                          let p = text.split('.').join('');
                          content.hTrim.R = String((Math.round(p) / 10).toFixed(1));
                          this.setState({})
                      }} />
                  </Item>
              </Col>
              <Col style={{ height: 200 }}>
                  <Text>Vertical Trim</Text>
                  <Grid style={{ marginBottom: 20 }}>
                      <Button
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: EXTSUB9,
                                      cancelButtonIndex: EXTSUB9.length - 1,
                                      title: "Material"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != EXTSUB9.length - 1) {
                                          content.vTrim.M = EXTSUB9[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}
                      >
                          <Text>{content.vTrim.M || "Material"}</Text>
                      </Button>
                      <Button block error style={{ marginLeft: 10 }}
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: SIDES,
                                      cancelButtonIndex: 9,
                                      title: "Select Side"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != 9) {
                                          content.side = SIDES[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}>
                          <Text>{content.side || "Side"}</Text>
                      </Button>
                  </Grid>
                  <Text >{content.vTrim.I == true ? 'Intact' : 'Deteriorated'}</Text>
                  <ListItem>
                      <RkChoice rkType='posNeg' selected={content.vTrim.I} onChange={(e) => {
                          content.vTrim.I = !content.vTrim.I
                          this.setState({})
                      }} />
                  </ListItem>
                  <Item>
                      <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.vTrim.R} onChangeText={(text) => {
                          let p = text.split('.').join('');
                          content.vTrim.R = String((Math.round(p) / 10).toFixed(1));
                          this.setState({})
                      }} />
                  </Item>
              </Col>


          </Grid>
          <Grid style={{ marginTop: 10 }}>
              <Col style={{ height: 200 }}>
                  <Text>Milk Door</Text>
                  <Grid style={{ marginBottom: 20 }}>
                      <Button
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: EXTSUB9,
                                      cancelButtonIndex: EXTSUB9.length - 1,
                                      title: "Material"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != EXTSUB9.length - 1) {
                                          content.mDoor.M = EXTSUB9[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}
                      >
                          <Text>{content.mDoor.M || "Material"}</Text>
                      </Button>
                      <Button block error style={{ marginLeft: 10 }}
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: SIDES,
                                      cancelButtonIndex: 9,
                                      title: "Select Side"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != 9) {
                                          content.side = SIDES[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}>
                          <Text>{content.side || "Side"}</Text>
                      </Button>
                  </Grid>
                  <Text >{content.mDoor.I == true ? 'Intact' : 'Deteriorated'}</Text>
                  <ListItem>
                      <RkChoice rkType='posNeg' selected={content.mDoor.I} onChange={(e) => {
                          content.mDoor.I = !content.mDoor.I
                          this.setState({})
                      }} />
                  </ListItem>
                  <Item>
                      <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.mDoor.R} onChangeText={(text) => {
                          let p = text.split('.').join('');
                          content.mDoor.R = String((Math.round(p) / 10).toFixed(1));
                          this.setState({})
                      }} />
                  </Item>
              </Col>

              <Col style={{ height: 200 }}>
                  <Text>Shelf</Text>
                  <Grid style={{ marginBottom: 20 }}>
                      <Button
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: EXTSUB9,
                                      cancelButtonIndex: EXTSUB9.length - 1,
                                      title: "Material"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != EXTSUB9.length - 1) {
                                          content.shelf.M = EXTSUB9[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}
                      >
                          <Text>{content.shelf.M || "Material"}</Text>
                      </Button>
                      <Button block error style={{ marginLeft: 10 }}
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: SIDES,
                                      cancelButtonIndex: 9,
                                      title: "Select Side"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != 9) {
                                          content.side = SIDES[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}>
                          <Text>{content.side || "Side"}</Text>
                      </Button>
                  </Grid>
                  <Text >{content.shelf.I == true ? 'Intact' : 'Deteriorated'}</Text>
                  <ListItem>
                      <RkChoice rkType='posNeg' selected={content.shelf.I} onChange={(e) => {
                          content.shelf.I = !content.shelf.I
                          this.setState({})
                      }} />
                  </ListItem>
                  <Item>
                      <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shelf.R} onChangeText={(text) => {
                          let p = text.split('.').join('');
                          content.shelf.R = String((Math.round(p) / 10).toFixed(1));
                          this.setState({})
                      }} />
                  </Item>
              </Col>
          </Grid>
          <Grid style={{ marginTop: 10 }}>
              <Col style={{ height: 200 }}>
                  <Text>Shelf Support</Text>
                  <Grid style={{ marginBottom: 20 }}>
                      <Button
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: EXTSUB9,
                                      cancelButtonIndex: EXTSUB9.length - 1,
                                      title: "Material"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != EXTSUB9.length - 1) {
                                          content.shelfSupport.M = EXTSUB9[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}
                      >
                          <Text>{content.shelfSupport.M || "Material"}</Text>
                      </Button>
                      <Button block error style={{ marginLeft: 10 }}
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: SIDES,
                                      cancelButtonIndex: 9,
                                      title: "Select Side"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != 9) {
                                          content.side = SIDES[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}>
                          <Text>{content.side || "Side"}</Text>
                      </Button>
                  </Grid>
                  <Text >{content.shelfSupport.I == true ? 'Intact' : 'Deteriorated'}</Text>
                  <ListItem>
                      <RkChoice rkType='posNeg' selected={content.shelfSupport.I} onChange={(e) => {
                          content.shelfSupport.I = !content.shelfSupport.I
                          this.setState({})
                      }} />
                  </ListItem>
                  <Item>
                      <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shelfSupport.R} onChangeText={(text) => {
                          let p = text.split('.').join('');
                          content.shelfSupport.R = String((Math.round(p) / 10).toFixed(1));
                          this.setState({})
                      }} />
                  </Item>
              </Col>
              <Col style={{ height: 200 }}>
                  <Text>Support</Text>
                  <Grid style={{ marginBottom: 20 }}>
                      <Button
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: EXTSUB9,
                                      cancelButtonIndex: EXTSUB9.length - 1,
                                      title: "Material"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != EXTSUB9.length - 1) {
                                          content.support.M = EXTSUB9[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}
                      >
                          <Text>{content.support.M || "Material"}</Text>
                      </Button>
                      <Button block error style={{ marginLeft: 10 }}
                          onPress={() =>
                              ActionSheet.show(
                                  {
                                      options: SIDES,
                                      cancelButtonIndex: 9,
                                      title: "Select Side"
                                  },
                                  buttonIndex => {
                                      if (buttonIndex != 9) {
                                          content.side = SIDES[buttonIndex]
                                          this.setState({})
                                      }
                                  }
                              )}>
                          <Text>{content.side || "Side"}</Text>
                      </Button>
                  </Grid>
                  <Text >{content.support.I == true ? 'Intact' : 'Deteriorated'}</Text>
                  <ListItem>
                      <RkChoice rkType='posNeg' selected={content.support.I} onChange={(e) => {
                          content.support.I = !content.support.I
                          this.setState({})
                      }} />
                  </ListItem>
                  <Item>
                      <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.support.R} onChangeText={(text) => {
                          let p = text.split('.').join('');
                          content.support.R = String((Math.round(p) / 10).toFixed(1));
                          this.setState({})
                      }} />
                  </Item>
              </Col>
          </Grid>
          <Item stackedLabel>
              <Label>Comments</Label>
              <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
          </Item>
          {this.renderExteriorHtmlFooter(sheetId, content)}
      </View>
  );
}
 /** Garage Doors */
 if (content.title == 'Garage Doors') {
  return (
    <View keyboardDismissMode="on-drag">
      <Grid style={{ marginTop: 0 }}>
        <Col>
          <Button block error style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: EXTTYPES1,
                  cancelButtonIndex: EXTTYPES1.length - 1,
                  title: "Select Type"
                },
                buttonIndex => {
                  if (buttonIndex != EXTTYPES1.length - 1) {
                    content.doorType = EXTTYPES1[buttonIndex]
                  } else {
                    content.doorType = '';
                  }
                  this.setState({})
                }
              )}>
            <Text>{content.doorType || 'Type'}</Text>
          </Button>
        </Col>
      </Grid>

      <Grid style={{ marginTop: 10 }}>
        <Col style={{ height: 200 }}>
          <Text>Garage Door</Text>
          <Grid style={{marginBottom:20}}>
          <Button
            onPress={() =>
              ActionSheet.show(
                {
                  options: EXTSUB6,
                  cancelButtonIndex: EXTSUB6.length - 1,
                  title: content.door.M || "Select Material"
                },
                buttonIndex => {
                  if (buttonIndex != EXTSUB6.length - 1) {
                    content.door.M = EXTSUB6[buttonIndex]
                    content.doorframe.M = EXTSUB6[buttonIndex]
                    this.setState({})
                  }
                }
              )}
          >
            <Text>{content.door.M || "Material"}</Text>
          </Button>
          <Button block error style={{ marginLeft: 10 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: SIDES,
                                    cancelButtonIndex: 9,
                                    title: "Select Side"
                                },
                                buttonIndex => {
                                    if (buttonIndex != 9) {
                                        content.side = SIDES[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}>
                        <Text>{content.side || "Side"}</Text>
                    </Button>
                </Grid>
          <Text >{content.door.I == true ? 'Intact' : 'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
              content.door.I = !content.door.I
              this.setState({})
            }} />
          </ListItem>
          <Item>
            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.door.R} onChangeText={(text) => {
                 let p = text.split('.').join('');
                 content.door.R = String((Math.round(p) / 10).toFixed(1));
                 this.setState({})
              }} />
          </Item>
        </Col>
        <Col style={{ height: 200 }}>
          <Text>Garage Door Frame</Text>
          <Grid style={{marginBottom:20}}>
          <Button
            onPress={() =>
              ActionSheet.show(
                {
                  options: EXTSUB6,
                  cancelButtonIndex: EXTSUB6.length - 1,
                  title: "Material"
                },
                buttonIndex => {
                  if (buttonIndex != EXTSUB6.length - 1) {
                    content.doorframe.M = EXTSUB6[buttonIndex]
                    this.setState({})
                  }
                }
              )}
          >
            <Text>{content.doorframe.M || "Material"}</Text>
          </Button>
          <Button block error style={{ marginLeft: 10 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: SIDES,
                                    cancelButtonIndex: 9,
                                    title: "Select Side"
                                },
                                buttonIndex => {
                                    if (buttonIndex != 9) {
                                        content.side = SIDES[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}>
                        <Text>{content.side || "Side"}</Text>
                    </Button>
                </Grid>
          <Text >{content.doorframe.I == true ? 'Intact' : 'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.doorframe.I} onChange={(e) => {
              content.doorframe.I = !content.doorframe.I
              this.setState({})
            }} />
          </ListItem>
          <Item>
            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.doorframe.R} onChangeText={(text) => {
                 let p = text.split('.').join('');
                 content.doorframe.R = String((Math.round(p) / 10).toFixed(1));
                 this.setState({})
              }} />
          </Item>
        </Col>
      </Grid>
      <Item stackedLabel>
        <Label>Comments</Label>
        <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
      </Item>
      {this.renderExteriorHtmlFooter(sheetId, content)}
    </View>
  );
}
  /**
   * Parking Lot
   */
  if (content.title == 'Parking Lot') {
    return (
      <View keyboardDismissMode="on-drag">
        <Grid style={{ marginTop: 0 }}>
          <Col>
            <Button block error style={{ marginTop: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTTYPES1,
                    cancelButtonIndex: EXTTYPES1.length - 1,
                    title: "Select Type"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTTYPES1.length - 1) {
                      content.doorType = EXTTYPES1[buttonIndex]

                    } else {
                      content.doorType = '';
                    }
                    this.setState({})
                  }
                )}>
              <Text>{content.doorType || 'Type'}</Text>
            </Button>
          </Col>
        </Grid>

        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Bollard</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB8,
                      cancelButtonIndex: EXTSUB8.length - 1,
                      title: content.bollard.M || "Select Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB8.length - 1) {
                        content.bollard.M = EXTSUB8[buttonIndex]
                        content.parkingStripe.M = EXTSUB8[buttonIndex]
                        content.parkingStop.M = EXTSUB8[buttonIndex]
                        content.curb.M = EXTSUB8[buttonIndex]
                        content.lightPost.M = EXTSUB8[buttonIndex]
                        content.speedBump.M = EXTSUB8[buttonIndex]
                        content.fireHydrant.M = EXTSUB8[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.bollard.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.bollard.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.bollard.S ||"Side"}</Text>
              </Button>
            </Grid>
            <Text >{content.bollard.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.bollard.I} onChange={(e) => {
                content.bollard.I = !content.bollard.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.bollard.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.bollard.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Parking Stripe</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB8,
                      cancelButtonIndex: EXTSUB8.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB8.length - 1) {
                        content.parkingStripe.M = EXTSUB8[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.parkingStripe.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.parkingStripe.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.parkingStripe.S ||"Side"}</Text>
              </Button>
            </Grid>
            <Text >{content.parkingStripe.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.parkingStripe.I} onChange={(e) => {
                content.parkingStripe.I = !content.parkingStripe.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.parkingStripe.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.parkingStripe.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Parking Stop</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB8,
                      cancelButtonIndex: EXTSUB8.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB8.length - 1) {
                        content.parkingStop.M = EXTSUB8[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.parkingStop.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.parkingStop.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.parkingStop.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text >{content.parkingStop.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.parkingStop.I} onChange={(e) => {
                content.parkingStop.I = !content.parkingStop.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.parkingStop.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.parkingStop.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Curb</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB8,
                      cancelButtonIndex: EXTSUB8.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB8.length - 1) {
                        content.curb.M = EXTSUB8[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.curb.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.curb.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.curb.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text >{content.curb.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.curb.I} onChange={(e) => {
                content.curb.I = !content.curb.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.curb.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.curb.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Light Post</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB8,
                      cancelButtonIndex: EXTSUB8.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB8.length - 1) {
                        content.lightPost.M = EXTSUB8[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.lightPost.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.lightPost.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.lightPost.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text >{content.lightPost.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.lightPost.I} onChange={(e) => {
                content.lightPost.I = !content.lightPost.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.lightPost.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.lightPost.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Speed Bump</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB8,
                      cancelButtonIndex: EXTSUB8.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB8.length - 1) {
                        content.speedBump.M = EXTSUB8[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.speedBump.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.speedBump.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.speedBump.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text >{content.speedBump.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.speedBump.I} onChange={(e) => {
                content.speedBump.I = !content.speedBump.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.speedBump.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.speedBump.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Fire Hydrant</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: EXTSUB8,
                      cancelButtonIndex: EXTSUB8.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      if (buttonIndex != EXTSUB8.length - 1) {
                        content.fireHydrant.M = EXTSUB8[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}
              >
                <Text>{content.fireHydrant.M || "Material"}</Text>
              </Button>
              <Button block error style={{ marginLeft: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 8,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      if (buttonIndex != 8) {
                        content.fireHydrant.S = SIDES[buttonIndex]
                        this.setState({})
                      }
                    }
                  )}>
                <Text>{content.fireHydrant.S || "Side"}</Text>
              </Button>
            </Grid>
            <Text >{content.fireHydrant.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.fireHydrant.I} onChange={(e) => {
                content.fireHydrant.I = !content.fireHydrant.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.fireHydrant.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.fireHydrant.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderExteriorHtmlFooter(sheetId, content)}
      </View>
    );
  }
  /**
  * Misc Exteroir
  */
 if (content.title == 'Misc Exterior') {
  return (
    <View keyboardDismissMode="on-drag">
      <Grid style={{ marginTop: 0 }}>

        <Col>
          <Button block error style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: EXTTYPES1,
                  cancelButtonIndex: EXTTYPES1.length - 1,
                  title: "Select Type"
                },
                buttonIndex => {
                  if (buttonIndex != EXTTYPES1.length - 1) {
                    content.doorType = EXTTYPES1[buttonIndex]
                  } else {
                    content.doorType = '';
                  }
                  this.setState({})
                }
              )}>
            <Text>{content.doorType || 'Type'}</Text>
          </Button>
        </Col>
      </Grid>

      <Grid style={{ marginTop: 10 }}>
        <Col style={{ height: 200 }}>
          <Text>Electric Panel/Frame</Text>
          <Grid style={{ marginBottom: 20 }}>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB10,
                    cancelButtonIndex: EXTSUB10.length - 1,
                    title: content.frame.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB10.length - 1) {
                      content.frame.M = EXTSUB10[buttonIndex]
                      content.vent.M = EXTSUB10[buttonIndex]
                      content.accessPanel.M = EXTSUB10[buttonIndex]
                      content.gate.M = EXTSUB10[buttonIndex]
                      content.fence.M = EXTSUB10[buttonIndex]
                      content.playEquip.M = EXTSUB10[buttonIndex]
                      content.planterBox.M = EXTSUB10[buttonIndex]
                      content.equipment.M = EXTSUB10[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.frame.M || "Material"}</Text>
            </Button>
            <Button block error style={{ marginLeft: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: 8,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != 8) {
                      content.frame.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}>
              <Text>{content.frame.S || "Side"}</Text>
            </Button>
          </Grid>
          <Text >{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
              content.frame.I = !content.frame.I
              this.setState({})
            }} />
          </ListItem>
          <Item>
            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                 let p = text.split('.').join('');
                 content.frame.R = String((Math.round(p) / 10).toFixed(1));
                 this.setState({})
              }} />
          </Item>
        </Col>
        <Col style={{ height: 200 }}>
          <Text>Equipment</Text>
          <Grid style={{ marginBottom: 20 }}>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB10,
                    cancelButtonIndex: EXTSUB10.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB10.length - 1) {
                      content.equipment.M = EXTSUB10[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.equipment.M || "Material"}</Text>
            </Button>
            <Button block error style={{ marginLeft: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: 8,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != 8) {
                      content.equipment.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}>
              <Text>{content.equipment.S || "Side"}</Text>
            </Button>
          </Grid>
          <Text >{content.equipment.I == true ? 'Intact' : 'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.equipment.I} onChange={(e) => {
              content.equipment.I = !content.equipment.I
              this.setState({})
            }} />
          </ListItem>
          <Item>
            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.equipment.R} onChangeText={(text) => {
                 let p = text.split('.').join('');
                 content.equipment.R = String((Math.round(p) / 10).toFixed(1));
                 this.setState({})
              }} />
          </Item>
        </Col>
      </Grid>
      <Grid style={{ marginTop: 10 }}>
        <Col style={{ height: 200 }}>
          <Text>Heater Vent</Text>
          <Grid style={{ marginBottom: 20 }}>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB10,
                    cancelButtonIndex: EXTSUB10.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB10.length - 1) {
                      content.vent.M = EXTSUB10[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.vent.M || "Material"}</Text>
            </Button>
            <Button block error style={{ marginLeft: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: 8,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != 8) {
                      content.vent.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}>
              <Text>{content.vent.S || "Side"}</Text>
            </Button>
          </Grid>
          <Text >{content.vent.I == true ? 'Intact' : 'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.vent.I} onChange={(e) => {
              content.vent.I = !content.vent.I
              this.setState({})
            }} />
          </ListItem>
          <Item>
            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.vent.R} onChangeText={(text) => {
                 let p = text.split('.').join('');
                 content.vent.R = String((Math.round(p) / 10).toFixed(1));
                 this.setState({})
              }} />
          </Item>
        </Col>
        <Col style={{ height: 200 }}>
          <Text>Access Panel/Frame</Text>
          <Grid style={{ marginBottom: 20 }}>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB10,
                    cancelButtonIndex: EXTSUB10.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB10.length - 1) {
                      content.accessPanel.M = EXTSUB10[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.accessPanel.M || "Material"}</Text>
            </Button>
            <Button block error style={{ marginLeft: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: 8,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != 8) {
                      content.accessPanel.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}>
              <Text>{content.accessPanel.S || "Side"}</Text>
            </Button>
          </Grid>
          <Text >{content.accessPanel.I == true ? 'Intact' : 'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.accessPanel.I} onChange={(e) => {
              content.accessPanel.I = !content.accessPanel.I
              this.setState({})
            }} />
          </ListItem>
          <Item>
            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.accessPanel.R} onChangeText={(text) => {
                 let p = text.split('.').join('');
                 content.accessPanel.R = String((Math.round(p) / 10).toFixed(1));
                 this.setState({})
              }} />
          </Item>
        </Col>
      </Grid>

      <Grid style={{ marginTop: 10 }}>
        <Col style={{ height: 200 }}>
          <Text>Gate</Text>
          <Grid style={{ marginBottom: 20 }}>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB10,
                    cancelButtonIndex: EXTSUB10.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB10.length - 1) {
                      content.gate.M = EXTSUB10[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.gate.M || "Material"}</Text>
            </Button>
            <Button block error style={{ marginLeft: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: 8,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != 8) {
                      content.gate.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}>
              <Text>{content.gate.S || "Side"}</Text>
            </Button>
          </Grid>
          <Text >{content.gate.I == true ? 'Intact' : 'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.gate.I} onChange={(e) => {
              content.gate.I = !content.gate.I
              this.setState({})
            }} />
          </ListItem>
          <Item>
            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.gate.R} onChangeText={(text) => {
                 let p = text.split('.').join('');
                 content.gate.R = String((Math.round(p) / 10).toFixed(1));
                 this.setState({})
              }} />
          </Item>
        </Col>
        <Col style={{ height: 200 }}>
          <Text>Fence</Text>
          <Grid style={{ marginBottom: 20 }}>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB10,
                    cancelButtonIndex: EXTSUB10.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB10.length - 1) {
                      content.fence.M = EXTSUB10[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.fence.M || "Material"}</Text>
            </Button>
            <Button block error style={{ marginLeft: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: 8,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != 8) {
                      content.fence.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}>
              <Text>{content.fence.S || "Side"}</Text>
            </Button>
          </Grid>
          <Text >{content.fence.I == true ? 'Intact' : 'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.fence.I} onChange={(e) => {
              content.fence.I = !content.fence.I
              this.setState({})
            }} />
          </ListItem>
          <Item>
            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.fence.R} onChangeText={(text) => {
                 let p = text.split('.').join('');
                 content.fence.R = String((Math.round(p) / 10).toFixed(1));
                 this.setState({})
              }} />
          </Item>
        </Col>
      </Grid>

      <Grid style={{ marginTop: 10 }}>
        <Col style={{ height: 200 }}>
          <Text>Playground Equipment</Text>
          <Grid style={{ marginBottom: 20 }}>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB10,
                    cancelButtonIndex: EXTSUB10.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB10.length - 1) {
                      content.playEquip.M = EXTSUB10[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.playEquip.M || "Material"}</Text>
            </Button>
            <Button block error style={{ marginLeft: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: 8,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != 8) {
                      content.playEquip.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}>
              <Text>{content.playEquip.S || "Side"}</Text>
            </Button>
          </Grid>
          <Text >{content.playEquip.I == true ? 'Intact' : 'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.playEquip.I} onChange={(e) => {
              content.playEquip.I = !content.playEquip.I
              this.setState({})
            }} />
          </ListItem>
          <Item>
            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.playEquip.R} onChangeText={(text) => {
                 let p = text.split('.').join('');
                 content.playEquip.R = String((Math.round(p) / 10).toFixed(1));
                 this.setState({})
              }} />
          </Item>
        </Col>
        <Col style={{ height: 200 }}>
          <Text>Planter Box</Text>
          <Grid style={{ marginBottom: 20 }}>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB10,
                    cancelButtonIndex: EXTSUB10.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB10.length - 1) {
                      content.planterBox.M = EXTSUB10[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.planterBox.M || "Material"}</Text>
            </Button>
            <Button block error style={{ marginLeft: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: 8,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != 8) {
                      content.planterBox.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}>
              <Text>{content.planterBox.S || "Side"}</Text>
            </Button>
          </Grid>
          <Text >{content.planterBox.I == true ? 'Intact' : 'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.planterBox.I} onChange={(e) => {
              content.planterBox.I = !content.planterBox.I
              this.setState({})
            }} />
          </ListItem>
          <Item>
            <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.planterBox.R} onChangeText={(text) => {
                 let p = text.split('.').join('');
                 content.planterBox.R = String((Math.round(p) / 10).toFixed(1));
                 this.setState({})
              }} />
          </Item>
        </Col>
      </Grid>
      <Item stackedLabel>
        <Label>Comments</Label>
        <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
      </Item>
      {this.renderExteriorHtmlFooter(sheetId, content)}
    </View>
  );
}
  /** roof trim */
  if (content.title == 'Interior Roof Trim') {
    return (
      <View keyboardDismissMode="on-drag">
        <Grid style={{ marginTop: 0 }}>
          <Col>
            <Button block error style={{ marginTop: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTTYPES4,
                    cancelButtonIndex: EXTTYPES4.length - 1,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTTYPES4.length - 1) {
                      content.doorType = EXTTYPES4[buttonIndex]
                    } else {
                      content.doorType = '';
                    }
                    this.setState({})
                  }
                )}>
              <Text>{content.doorType || 'Type'}</Text>
            </Button>
          </Col>
        </Grid>

        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Eaves</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB2,
                    cancelButtonIndex: EXTSUB2.length - 1,
                    title: content.eaves.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB2.length - 1) {
                      content.eaves.M = EXTSUB2[buttonIndex]
                      content.rafters.M = EXTSUB2[buttonIndex]
                      content.fascia.M = EXTSUB2[buttonIndex]
                      content.soffit.M = EXTSUB2[buttonIndex]
                      content.corbel.M = EXTSUB2[buttonIndex]
                      content.roofSup.M = EXTSUB2[buttonIndex]
                      content.gutter.M = EXTSUB2[buttonIndex]
                      content.downspout.M = EXTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.eaves.M || "Material"}</Text>
            </Button>
            <Text >{content.eaves.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.eaves.I} onChange={(e) => {
                content.eaves.I = !content.eaves.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.eaves.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.eaves.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Rafters</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB2,
                    cancelButtonIndex: EXTSUB2.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB2.length - 1) {
                      content.rafters.M = EXTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.rafters.M || "Material"}</Text>
            </Button>
            <Text >{content.rafters.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.rafters.I} onChange={(e) => {
                content.rafters.I = !content.rafters.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.rafters.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.rafters.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Fascia</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB2,
                    cancelButtonIndex: EXTSUB2.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB2.length - 1) {
                      content.fascia.M = EXTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.fascia.M || "Material"}</Text>
            </Button>
            <Text >{content.fascia.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.fascia.I} onChange={(e) => {
                content.fascia.I = !content.fascia.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.fascia.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.fascia.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Soffit</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB2,
                    cancelButtonIndex: EXTSUB2.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB2.length - 1) {
                      content.soffit.M = EXTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.soffit.M || "Material"}</Text>
            </Button>
            <Text >{content.soffit.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.soffit.I} onChange={(e) => {
                content.soffit.I = !content.soffit.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.soffit.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.soffit.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Gutter</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB2,
                    cancelButtonIndex: EXTSUB2.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB2.length - 1) {
                      content.gutter.M = EXTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.gutter.M || "Material"}</Text>
            </Button>
            <Text >{content.gutter.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.gutter.I} onChange={(e) => {
                content.gutter.I = !content.gutter.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.gutter.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.gutter.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Downspout</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB2,
                    cancelButtonIndex: EXTSUB2.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB2.length - 1) {
                      content.downspout.M = EXTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.downspout.M || "Material"}</Text>
            </Button>
            <Text >{content.downspout.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.downspout.I} onChange={(e) => {
                content.downspout.I = !content.downspout.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.downspout.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.downspout.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Corbel</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB2,
                    cancelButtonIndex: EXTSUB2.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB2.length - 1) {
                      content.corbel.M = EXTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.corbel.M || "Material"}</Text>
            </Button>
            <Text >{content.corbel.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.corbel.I} onChange={(e) => {
                content.corbel.I = !content.corbel.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.corbel.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.corbel.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Roof Support</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB2,
                    cancelButtonIndex: EXTSUB2.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB2.length - 1) {
                      content.roofSup.M = EXTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.roofSup.M || "Material"}</Text>
            </Button>
            <Text >{content.roofSup.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.roofSup.I} onChange={(e) => {
                content.roofSup.I = !content.roofSup.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.roofSup.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.roofSup.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderExteriorHtmlFooter(sheetId, content)}
      </View>
    );
  }
  /** stairs */
  if (content.title == 'Stairs') {
    return (
      <View keyboardDismissMode="on-drag">
        <Grid style={{ marginTop: 0 }}>
          <Col>
            <Button block error style={{ marginTop: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTTYPES1,
                    cancelButtonIndex: EXTTYPES1.length - 1,
                    title: "Select Type"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTTYPES1.length - 1) {
                      content.doorType = EXTTYPES1[buttonIndex]
                    } else {
                      content.doorType = '';
                    }
                    this.setState({})
                  }
                )}>
              <Text>{content.doorType || 'Type'}</Text>
            </Button>
          </Col>
        </Grid>

        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Tread</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB5,
                    cancelButtonIndex: EXTSUB5.length - 1,
                    title: content.tread.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB5.length - 1) {
                      content.tread.M = EXTSUB5[buttonIndex]
                      content.riser.M = EXTSUB5[buttonIndex]
                      content.deck.M = EXTSUB5[buttonIndex]
                      content.handrail.M = EXTSUB5[buttonIndex]
                      content.railing.M = EXTSUB5[buttonIndex]
                      content.stringer.M = EXTSUB5[buttonIndex]
                      content.newel.M = EXTSUB5[buttonIndex]
                      content.baluster.M = EXTSUB5[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.tread.M || "Material"}</Text>
            </Button>
            <Text >{content.tread.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.tread.I} onChange={(e) => {
                content.tread.I = !content.tread.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.tread.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.tread.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Riser</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB5,
                    cancelButtonIndex: EXTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB5.length - 1) {
                      content.riser.M = EXTSUB5[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.riser.M || "Material"}</Text>
            </Button>
            <Text >{content.riser.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.riser.I} onChange={(e) => {
                content.riser.I = !content.riser.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.riser.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.riser.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Deck</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB5,
                    cancelButtonIndex: EXTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB5.length - 1) {
                      content.deck.M = EXTSUB5[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.deck.M || "Material"}</Text>
            </Button>
            <Text >{content.deck.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.deck.I} onChange={(e) => {
                content.deck.I = !content.deck.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.deck.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.deck.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Handrail</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB5,
                    cancelButtonIndex: EXTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB5.length - 1) {
                      content.handrail.M = EXTSUB5[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.handrail.M || "Material"}</Text>
            </Button>
            <Text >{content.handrail.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.handrail.I} onChange={(e) => {
                content.handrail.I = !content.handrail.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.handrail.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.handrail.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Railing</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB5,
                    cancelButtonIndex: EXTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB5.length - 1) {
                      content.railing.M = EXTSUB5[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.railing.M || "Material"}</Text>
            </Button>
            <Text >{content.railing.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.railing.I} onChange={(e) => {
                content.railing.I = !content.railing.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.railing.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.railing.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Stringer</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB5,
                    cancelButtonIndex: EXTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB5.length - 1) {
                      content.stringer.M = EXTSUB5[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.stringer.M || "Material"}</Text>
            </Button>
            <Text >{content.stringer.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.stringer.I} onChange={(e) => {
                content.stringer.I = !content.stringer.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.stringer.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.stringer.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Newel Post</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB5,
                    cancelButtonIndex: EXTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB5.length - 1) {
                      content.newel.M = EXTSUB5[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.newel.M || "Material"}</Text>
            </Button>
            <Text >{content.newel.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.newel.I} onChange={(e) => {
                content.newel.I = !content.newel.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.newel.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.newel.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Baluster</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTSUB5,
                    cancelButtonIndex: EXTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTSUB5.length - 1) {
                      content.baluster.M = EXTSUB5[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.baluster.M || "Material"}</Text>
            </Button>
            <Text >{content.baluster.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.baluster.I} onChange={(e) => {
                content.baluster.I = !content.baluster.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.baluster.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.baluster.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderExteriorHtmlFooter(sheetId, content)}
      </View>
    );
  }
  if (content.title == 'Interior Window') {
    return (
      <View keyboardShouldPersistTaps={true}>
        <Grid style={{ marginTop: 0 }}>
          <Col>
            <Button block error style={{ marginTop: 10, marginRight: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: 9,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != 9) {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}>
              <Text>{content.side || "Side"}</Text>
            </Button>
          </Col>
          <Col>
            <Button block error style={{ marginTop: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTTYPES2,
                    cancelButtonIndex: EXTTYPES2.length - 1,
                    title: "Select Type"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTTYPES2.length - 1) {
                      content.doorType = EXTTYPES2[buttonIndex]

                    } else {
                      content.doorType = '';
                    }
                    this.setState({})
                  }
                )}>
              <Text>{content.doorType || 'Type'}</Text>
            </Button>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }} keyboardShouldPersistTaps={true}>
          <Col style={{ height: 200 }}>
            <Text>Window Sill</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB1,
                    cancelButtonIndex: INTSUB1.length - 1,
                    title: content.sill.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB1.length - 1) {
                      content.sill.M = INTSUB1[buttonIndex]
                      content.sash.M = INTSUB1[buttonIndex]
                      content.frame.M = INTSUB1[buttonIndex]
                      content.windowScreen.M = INTSUB1[buttonIndex]
                      content.valence.M = INTSUB1[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.sill.M || "Material"}</Text>
            </Button>
            <Text >{content.sill.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.sill.I} onChange={(e) => {
                content.sill.I = !content.sill.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.sill.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.sill.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Window Sash</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB1,
                    cancelButtonIndex: INTSUB1.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB1.length - 1) {
                      content.sash.M = INTSUB1[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.sash.M || "Material"}</Text>
            </Button>
            <Text >{content.sash.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.sash.I} onChange={(e) => {
                content.sash.I = !content.sash.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.sash.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.sash.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Window Frame</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB1,
                    cancelButtonIndex: INTSUB1.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB1.length - 1) {
                      content.frame.M = INTSUB1[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.frame.M || "Material"}</Text>
            </Button>
            <Text >{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                content.frame.I = !content.frame.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.frame.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }} keyboardShouldPersistTaps={true}>
        <Col style={{ height: 200 }}>
            <Text>Window Screen</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB1,
                    cancelButtonIndex: INTSUB1.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB1.length - 1) {
                      content.windowScreen.M = INTSUB1[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.windowScreen.M || "Material"}</Text>
            </Button>
            <Text >{content.windowScreen.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.windowScreen.I} onChange={(e) => {
                content.windowScreen.I = !content.windowScreen.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.windowScreen.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.windowScreen.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        <Col style={{ height: 200 }}>
            <Text>Valence</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB1,
                    cancelButtonIndex: INTSUB1.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB1.length - 1) {
                      content.valence.M = INTSUB1[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.valence.M || "Material"}</Text>
            </Button>
            <Text >{content.valence.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.valence.I} onChange={(e) => {
                content.valence.I = !content.valence.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.valence.R} onChangeText={(text) => {
                   let p = text.split('.').join('');
                   content.valence.R = String((Math.round(p) / 10).toFixed(1));
                   this.setState({})
                }} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderHtmlFooter(sheetId, content)}
      </View>
    );
  }
  /** exterior windows */
  if (content.title == 'Interior Doorway') {
    return (
        <View keyboardDismissMode="on-drag">
            <Grid style={{ marginTop: 0 }}>
                <Col>
                    <Button block error style={{ marginTop: 10, marginRight: 10 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: SIDES,
                                    cancelButtonIndex: 9,
                                    title: "Select Side"
                                },
                                buttonIndex => {
                                    if (buttonIndex != SIDES.length - 1) {
                                        content.side = SIDES[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}>
                        <Text>{content.side || "Side"}</Text>
                    </Button>
                </Col>
                <Col>
                    <Button block error style={{ marginTop: 10 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: TYPESDOOR,
                                    cancelButtonIndex: TYPESDOOR.length - 1,
                                    title: "Select Side"
                                },
                                buttonIndex => {
                                    if (buttonIndex != TYPESDOOR.length - 1) {
                                        content.doorType = TYPESDOOR[buttonIndex]

                                    } else {
                                        content.doorType = '';
                                    }
                                    this.setState({})
                                }
                            )}>
                        <Text>{content.doorType || 'Type'}</Text>
                    </Button>
                </Col>
            </Grid>

            <Grid style={{ marginTop: 10 }}>
                <Col style={{ height: 200 }}>
                    <Text>Door</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: content.door.M || "Select Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.door.M = EXTSUB1[buttonIndex]
                                        content.frame.M = EXTSUB1[buttonIndex]
                                        content.thresh.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.door.M || "Material"}</Text>
                    </Button>
                    <Text >{content.door.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                            content.door.I = !content.door.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                         <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.door.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.door.R = String((Math.round(p) / 10).toFixed(1));
                                 this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Door Frame</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.frame.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.frame.M || "Material"}</Text>
                    </Button>
                    <Text >{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                            content.frame.I = !content.frame.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.frame.R = String((Math.round(p) / 10).toFixed(1));
                                 this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Threshold</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.thresh.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.thresh.M || "Material"}</Text>
                    </Button>
                    <Text >{content.thresh.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.thresh.I} onChange={(e) => {
                            content.thresh.I = !content.thresh.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.thresh.R} onChangeText={(text) => {
                                let p = text.split('.').join('');
                                content.thresh.R = String((Math.round(p) / 10).toFixed(1));
                                 this.setState({})
                        }} />
                    </Item>
                </Col>
            </Grid>
            <Item stackedLabel>
                <Label>Comments</Label>
                <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
            </Item>

            {this.renderHtmlFooter(sheetId, content)}
        </View>
    );
}
  /** exterior walls */
  if (content.title == 'Exterior Doorway') {
    return (
        <View keyboardDismissMode="on-drag">
            <Grid style={{ marginTop: 0 }}>
                <Col>
                    <Button block error style={{ marginTop: 10, marginRight: 10 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: SIDES,
                                    cancelButtonIndex: 9,
                                    title: "Select Side"
                                },
                                buttonIndex => {
                                    if (buttonIndex != SIDES.length - 1) {
                                        content.side = SIDES[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}>
                        <Text>{content.side || "Side"}</Text>
                    </Button>
                </Col>
                <Col>
                    <Button block error style={{ marginTop: 10 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTTYPES1,
                                    cancelButtonIndex: EXTTYPES1.length - 1,
                                    title: "Select Side"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTTYPES1.length - 1) {
                                        content.doorType = EXTTYPES1[buttonIndex]

                                    } else {
                                        content.doorType = '';
                                    }
                                    this.setState({})
                                }
                            )}>
                        <Text>{content.doorType || 'Type'}</Text>
                    </Button>
                </Col>
            </Grid>

            <Grid style={{ marginTop: 10 }}>
                <Col style={{ height: 200 }}>
                    <Text>Door</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: content.door.M || "Select Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.door.M = EXTSUB1[buttonIndex]
                                        content.frame.M = EXTSUB1[buttonIndex]
                                        content.thresh.M = EXTSUB1[buttonIndex]
                                        content.securityDoor.M = EXTSUB1[buttonIndex]
                                        content.screenDoor.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.door.M || "Material"}</Text>
                    </Button>
                    <Text style={{ marginTop: 10 }} >{content.door.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                            content.door.I = !content.door.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.door.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.door.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Door Frame</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.frame.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.frame.M || "Material"}</Text>
                    </Button>
                    <Text style={{ marginTop: 10 }}>{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                            content.frame.I = !content.frame.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.frame.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Threshold</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.thresh.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.thresh.M || "Material"}</Text>
                    </Button>
                    <Text style={{ marginTop: 10 }}>{content.thresh.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.thresh.I} onChange={(e) => {
                            content.thresh.I = !content.thresh.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.thresh.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.thresh.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
            </Grid>

            <Grid style={{ marginTop: 10 }}>
                <Col style={{ height: 200 }}>
                    <Text>Security Door</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: content.securityDoor.M || "Select Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.securityDoor.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.securityDoor.M || "Material"}</Text>
                    </Button>
                    <Text >{content.securityDoor.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.securityDoor.I} onChange={(e) => {
                            content.securityDoor.I = !content.securityDoor.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <KeyboardAvoidingView enabled>
                    </KeyboardAvoidingView>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.securityDoor.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.securityDoor.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Screen Door</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.screenDoor.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.screenDoor.M || "Material"}</Text>
                    </Button>
                    <Text >{content.screenDoor.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.screenDoor.I} onChange={(e) => {
                            content.screenDoor.I = !content.screenDoor.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.screenDoor.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.screenDoor.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
            </Grid>

            <Item stackedLabel>
                <Label>Comments</Label>
                <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
            </Item>

            {this.renderHtmlFooter(sheetId, content)}
        </View>
    );
}

  if (content.title == 'Sheet Details') {
    return (
      <View>
        <Grid>
          <Col>
            <Item stackedLabel>
              <Label>Unit Number</Label>
              <Input value={content.unit} onChangeText={(text) => { content.unit = text; this.setState({}) }} />
            </Item>
          </Col>
          <Col>
            <Item stackedLabel>
              <Label>Building Number</Label>
              <Input value={content.building} onChangeText={(text) => { content.building = text; this.setState({}) }} />
            </Item>
          </Col>
          <Col>
            <Button block danger style={{ marginTop: 10, marginBottom: 10 }} onPress={() => {
              Alert.alert(
                'Remove',
                'Are you sure?',
                [

                  { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  { text: 'OK', onPress: () => this.removeSheet(sheetId) },
                ],
                { cancelable: false }
              )
            }}>
              <Text>Remove</Text>
            </Button>
          </Col>
        </Grid>
      </View>
    )
  }

  if (content.title == 'Interior Walls') {
    return (
      <View>
        <Grid>
          <Col>
            <Button block error style={{ marginTop: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: TYPESWALLS,
                    cancelButtonIndex: TYPESWALLS.length - 1,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != TYPESWALLS.length - 1) {
                      content.type = TYPESWALLS[buttonIndex]

                    } else {
                      content.type = '';
                    }
                    this.setState({})
                  }
                )}>
              <Text>{content.type || "Type"}</Text>
            </Button>
          </Col>
        </Grid>

        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Wall A</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB2,
                    cancelButtonIndex: INTSUB2.length - 1,
                    title: content.wallA.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB2.length - 1) {
                      content.wallA.M = INTSUB2[buttonIndex]
                      content.wallB.M = INTSUB2[buttonIndex]
                      content.wallC.M = INTSUB2[buttonIndex]
                      content.wallD.M = INTSUB2[buttonIndex]
                      content.baseboard.M = INTSUB2[buttonIndex]
                      content.ceiling.M = INTSUB2[buttonIndex]
                      content.vent.M = INTSUB2[buttonIndex]
                      content.floor.M = INTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.wallA.M || "Material"}</Text>
            </Button>
            <Text style={{ marginTop: 10 }} >{content.wallA.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.wallA.I} onChange={(e) => {
                content.wallA.I = !content.wallA.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallA.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.wallA.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
              }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Wall B</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB2,
                    cancelButtonIndex: INTSUB2.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB2.length - 1) {
                      content.wallB.M = INTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.wallB.M || "Material"}</Text>
            </Button>
            <Text style={{ marginTop: 10 }}>{content.wallB.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.wallB.I} onChange={(e) => {
                content.wallB.I = !content.wallB.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallB.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.wallB.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
              }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Wall C</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB2,
                    cancelButtonIndex: INTSUB2.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB2.length - 1) {
                      content.wallC.M = INTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.wallC.M || "Material"}</Text>
            </Button>
            <Text style={{ marginTop: 10 }}>{content.wallC.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.wallC.I} onChange={(e) => {
                content.wallC.I = !content.wallC.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallC.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.wallC.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
              }} />
            </Item>
          </Col>
          <Col style={{ height: 190 }}>
            <Text>Wall D</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB2,
                    cancelButtonIndex: INTSUB2.length - 1,
                    title: content.wallD.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB2.length - 1) {
                      content.wallD.M = INTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.wallD.M || "Material"}</Text>
            </Button>
            <Text style={{ marginTop: 10 }}>{content.wallD.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.wallD.I} onChange={(e) => {
                content.wallD.I = !content.wallD.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wallD.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.wallD.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
              }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 209 }}>
            <Text>Baseboard</Text>
            <Grid>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: SIDES,
                        cancelButtonIndex: SIDES.length - 1,
                        title: content.baseboard.S || "Select Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != SIDES.length - 1) {
                          content.baseboard.S = SIDES[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.baseboard.S || "Side"}</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB2,
                        cancelButtonIndex: INTSUB2.length - 1,
                        title: content.baseboard.M || "Select Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB2.length - 1) {
                          content.baseboard.M = INTSUB2[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.baseboard.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 30 }}>{content.baseboard.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.baseboard.I} onChange={(e) => {
                content.baseboard.I = !content.baseboard.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.baseboard.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.baseboard.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
              }} />
            </Item>
          </Col>
          <Col style={{ height: 210 }}>
            <Text>Heater Vent</Text>
            <Grid>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: SIDES,
                        cancelButtonIndex: SIDES.length - 1,
                        title: content.vent.S || "Select Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != SIDES.length - 1) {
                          content.vent.S = SIDES[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.vent.S || "Side"}</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB2,
                        cancelButtonIndex: INTSUB2.length - 1,
                        title: content.vent.M || "Select Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB2.length - 1) {
                          content.vent.M = INTSUB2[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.vent.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 20 }}>{content.vent.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.vent.I} onChange={(e) => {
                content.vent.I = !content.vent.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.vent.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.vent.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
              }} />
            </Item>
          </Col>
        </Grid>

        <Grid>
          <Col style={{ height: 190 }}>
            <Text>Ceiling</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB2,
                    cancelButtonIndex: INTSUB2.length - 1,
                    title: content.ceiling.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB2.length - 1) {
                      content.ceiling.M = INTSUB2[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.ceiling.M || "Material"}</Text>
            </Button>
            <Text style={{ marginTop: 10 }}>{content.ceiling.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.ceiling.I} onChange={(e) => {
                content.ceiling.I = !content.ceiling.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.ceiling.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.ceiling.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
              }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Floor</Text>
            <Grid>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB2,
                        cancelButtonIndex: INTSUB2.length - 1,
                        title: content.floor.M || "Select Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB2.length - 1) {
                          content.floor.M = INTSUB2[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.floor.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 20 }}>{content.floor.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.floor.I} onChange={(e) => {
                content.floor.I = !content.floor.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.floor.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.floor.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
              }} />
            </Item>
          </Col>
        </Grid>

        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderHtmlFooter(sheetId, content)}
      </View>
    )
  }
  /** roof trim */
  if (content.title == 'Closet') {
    return (
      <View>
        <Grid>
          <Col>
            <Button block error style={{ marginTop: 10, marginRight: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: 9,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != SIDES.length - 1) {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}>
              <Text>{content.side || "Side"}</Text>
            </Button>
          </Col>
          <Col>
            <Button block error style={{ marginTop: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: TYPESCLOSET,
                    cancelButtonIndex: TYPESCLOSET.length - 1,
                    title: "Select Type"
                  },
                  buttonIndex => {
                    if (buttonIndex != 4) {
                      content.type = TYPESCLOSET[buttonIndex]
                    } else {
                      content.type = '';
                    }
                    this.setState({})
                  }
                )}>
              <Text>{content.type || 'Type'}</Text>
            </Button>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Closet Door</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB3,
                    cancelButtonIndex: INTSUB3.length - 1,
                    title: content.door.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB3.length - 1) {
                      content.door.M = INTSUB3[buttonIndex]
                      content.frame.M = INTSUB3[buttonIndex]
                      content.shelf.M = INTSUB3[buttonIndex]
                      content.support.M = INTSUB3[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.door.M || "Material"}</Text>
            </Button>
            <Text style={{ marginTop: 20 }}>{content.door.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                content.door.I = !content.door.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.door.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.door.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
             }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Closet Frame</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB3,
                    cancelButtonIndex: INTSUB3.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB3.length - 1) {
                      content.frame.M = INTSUB3[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.frame.M || "Material"}</Text>
            </Button>
            <Text style={{ marginTop: 20 }}>{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                content.frame.I = !content.frame.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.frame.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
             }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Closet Shelf</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB3,
                    cancelButtonIndex: INTSUB3.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB3.length - 1) {
                      content.shelf.M = INTSUB3[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.shelf.M || "Material"}</Text>
            </Button>
            <Text style={{ marginTop: 20 }}>{content.shelf.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.shelf.I} onChange={(e) => {
                content.shelf.I = !content.shelf.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shelf.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.shelf.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
            }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Closet Shelf Support</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB3,
                    cancelButtonIndex: INTSUB3.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB3.length - 1) {
                      content.support.M = INTSUB3[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.support.M || "Material"}</Text>
            </Button>
            <Text style={{ marginTop: 20 }}>{content.support.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.support.I} onChange={(e) => {
                content.support.I = !content.support.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.support.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.support.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
             }} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderHtmlFooter(sheetId, content)}
      </View>
    );
  }
  if (content.title == 'Roof Trim') {
    return (
        <View keyboardDismissMode="on-drag">
            <Grid style={{ marginTop: 0 }}>
                <Col>
                    <Button block error style={{ marginTop: 10 }}
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTTYPES4,
                                    cancelButtonIndex: EXTTYPES4.length - 1,
                                    title: "Select Side"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTTYPES4.length - 1) {
                                        content.doorType = EXTTYPES4[buttonIndex]
                                    } else {
                                        content.doorType = '';
                                    }
                                    this.setState({})
                                }
                            )}>
                        <Text>{content.doorType || 'Type'}</Text>
                    </Button>
                </Col>
            </Grid>

            <Grid style={{ marginTop: 10 }}>
                <Col style={{ height: 200 }}>
                    <Text>Eaves</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB2,
                                    cancelButtonIndex: EXTSUB2.length - 1,
                                    title: content.eaves.M || "Select Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB2.length - 1) {
                                        content.eaves.M = EXTSUB2[buttonIndex]
                                        content.rafters.M = EXTSUB2[buttonIndex]
                                        content.fascia.M = EXTSUB2[buttonIndex]
                                        content.soffit.M = EXTSUB2[buttonIndex]
                                        content.gutter.M = EXTSUB2[buttonIndex]
                                        content.downspout.M = EXTSUB2[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.eaves.M || "Material"}</Text>
                    </Button>
                    <Text style={{ marginTop: 20 }}>{content.eaves.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.eaves.I} onChange={(e) => {
                            content.eaves.I = !content.eaves.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.eaves.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.eaves.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Rafters</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.rafters.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.rafters.M || "Material"}</Text>
                    </Button>
                    <Text style={{ marginTop: 20 }}>{content.rafters.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.rafters.I} onChange={(e) => {
                            content.rafters.I = !content.rafters.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.rafters.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.rafters.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Fascia</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.fascia.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.fascia.M || "Material"}</Text>
                    </Button>
                    <Text style={{ marginTop: 20 }}>{content.fascia.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.fascia.I} onChange={(e) => {
                            content.fascia.I = !content.fascia.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.fascia.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.fascia.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
            </Grid>
            <Grid style={{ marginTop: 10 }}>
                <Col style={{ height: 200 }}>
                    <Text>Soffit</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.soffit.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.soffit.M || "Material"}</Text>
                    </Button>
                    <Text style={{ marginTop: 20 }}>{content.soffit.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.soffit.I} onChange={(e) => {
                            content.soffit.I = !content.soffit.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.soffit.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.soffit.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Gutter</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.gutter.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.gutter.M || "Material"}</Text>
                    </Button>
                    <Text style={{ marginTop: 20 }}>{content.gutter.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.gutter.I} onChange={(e) => {
                            content.gutter.I = !content.gutter.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.gutter.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.gutter.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
                <Col style={{ height: 200 }}>
                    <Text>Downspout</Text>
                    <Button
                        onPress={() =>
                            ActionSheet.show(
                                {
                                    options: EXTSUB1,
                                    cancelButtonIndex: EXTSUB1.length - 1,
                                    title: "Material"
                                },
                                buttonIndex => {
                                    if (buttonIndex != EXTSUB1.length - 1) {
                                        content.downspout.M = EXTSUB1[buttonIndex]
                                        this.setState({})
                                    }
                                }
                            )}
                    >
                        <Text>{content.downspout.M || "Material"}</Text>
                    </Button>
                    <Text >{content.downspout.I == true ? 'Intact' : 'Deteriorated'}</Text>
                    <ListItem>
                        <RkChoice rkType='posNeg' selected={content.downspout.I} onChange={(e) => {
                            content.downspout.I = !content.downspout.I
                            this.setState({})
                        }} />
                    </ListItem>
                    <Item>
                        <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.downspout.R} onChangeText={(text) => {
                            let p = text.split('.').join('');
                            content.downspout.R = String((Math.round(p) / 10).toFixed(1));
                            this.setState({})
                        }} />
                    </Item>
                </Col>
            </Grid>
            <Item stackedLabel>
                <Label>Comments</Label>
                <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
            </Item>
            {this.renderExteriorHtmlFooter(sheetId, content)}
        </View>
    );
}

if (content.title == 'Cabinet') {
  return (<View keyboardDismissMode="on-drag">
      <Grid style={{ marginTop: 0 }}>
          <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                  onPress={() =>
                      ActionSheet.show(
                          {
                              options: SIDES,
                              cancelButtonIndex: 9,
                              title: "Select Side"
                          },
                          buttonIndex => {
                              if (buttonIndex != SIDES.length - 1) {
                                  content.side = SIDES[buttonIndex]
                                  this.setState({})
                              }
                          }
                      )}>
                  <Text>{content.side || "Side"}</Text>
              </Button>
          </Col>
          <Col>
              <Button block error style={{ marginTop: 10 }}
                  onPress={() =>
                      ActionSheet.show(
                          {
                              options: TYPESCAB,
                              cancelButtonIndex: TYPESCAB.length - 1,
                              title: "Select Type"
                          },
                          buttonIndex => {
                              if (buttonIndex != TYPESCAB.length - 1) {
                                  content.type = TYPESCAB[buttonIndex]
                              } else {
                                  content.type = '';
                              }
                              this.setState({})
                          }
                      )}>
                  <Text>{content.type || 'Type'}</Text>
              </Button>
          </Col>
      </Grid>
      <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
              <Text>Cabinet Frame</Text>
              <Button
                  onPress={() =>
                      ActionSheet.show(
                          {
                              options: INTSUB4,
                              cancelButtonIndex: INTSUB4.length - 1,
                              title: content.frame.M || "Select Material"
                          },
                          buttonIndex => {
                              if (buttonIndex != INTSUB4.length - 1) {
                                  content.frame.M = INTSUB4[buttonIndex]
                                  content.door.M = INTSUB4[buttonIndex]
                                  content.shelf.M = INTSUB4[buttonIndex]
                                  content.countertop.M = INTSUB4[buttonIndex]
                                  content.backsplash.M = INTSUB4[buttonIndex]
                                  content.medicine.M = INTSUB4[buttonIndex]
                                  this.setState({})
                              }
                          }
                      )}
              >
                  <Text>{content.frame.M || "Material"}</Text>
              </Button>
              <Text >{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
              <ListItem>
                  <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                      content.frame.I = !content.frame.I
                      this.setState({})
                  }} />
              </ListItem>
              <Item>
                  <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
                      let p = text.split('.').join('');
                      content.frame.R = String((Math.round(p) / 10).toFixed(1));
                      this.setState({})
                  }} />
              </Item>
          </Col>
          <Col style={{ height: 200 }}>
              <Text>Cabinet Door/Drawer</Text>
              <Button
                  onPress={() =>
                      ActionSheet.show(
                          {
                              options: INTSUB4,
                              cancelButtonIndex: INTSUB4.length - 1,
                              title: "Material"
                          },
                          buttonIndex => {
                              if (buttonIndex != INTSUB4.length - 1) {
                                  content.door.M = INTSUB4[buttonIndex]
                                  this.setState({})
                              }
                          }
                      )}
              >
                  <Text>{content.door.M || "Material"}</Text>
              </Button>
              <Text >{content.door.I == true ? 'Intact' : 'Deteriorated'}</Text>
              <ListItem>
                  <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                      content.door.I = !content.door.I
                      this.setState({})
                  }} />
              </ListItem>
              <Item>
                  <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.door.R} onChangeText={(text) => {
                      let p = text.split('.').join('');
                      content.door.R = String((Math.round(p) / 10).toFixed(1));
                      this.setState({})
                  }} />
              </Item>
          </Col>
          <Col style={{ height: 200 }}>
              <Text>Cabinet Shelf</Text>
              <Button
                  onPress={() =>
                      ActionSheet.show(
                          {
                              options: INTSUB4,
                              cancelButtonIndex: INTSUB4.length - 1,
                              title: "Material"
                          },
                          buttonIndex => {
                              if (buttonIndex != INTSUB4.length - 1) {
                                  content.shelf.M = INTSUB4[buttonIndex]
                                  this.setState({})
                              }
                          }
                      )}
              >
                  <Text>{content.shelf.M || "Material"}</Text>
              </Button>
              <Text >{content.shelf.I == true ? 'Intact' : 'Deteriorated'}</Text>
              <ListItem>
                  <RkChoice rkType='posNeg' selected={content.shelf.I} onChange={(e) => {
                      content.shelf.I = !content.shelf.I
                      this.setState({})
                  }} />
              </ListItem>
              <Item>
                  <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shelf.R} onChangeText={(text) => {
                      let p = text.split('.').join('');
                      content.shelf.R = String((Math.round(p) / 10).toFixed(1));
                      this.setState({})
                  }} />
              </Item>
          </Col>
          <Col style={{ height: 200 }}>
              <Text>Countertop</Text>
              <Button
                  onPress={() =>
                      ActionSheet.show(
                          {
                              options: INTSUB4,
                              cancelButtonIndex: INTSUB4.length - 1,
                              title: "Material"
                          },
                          buttonIndex => {
                              if (buttonIndex != INTSUB4.length - 1) {
                                  content.countertop.M = INTSUB4[buttonIndex]
                                  this.setState({})
                              }
                          }
                      )}
              >
                  <Text>{content.countertop.M || "Material"}</Text>
              </Button>
              <Text >{content.countertop.I == true ? 'Intact' : 'Deteriorated'}</Text>
              <ListItem>
                  <RkChoice rkType='posNeg' selected={content.countertop.I} onChange={(e) => {
                      content.countertop.I = !content.countertop.I
                      this.setState({})
                  }} />
              </ListItem>
              <Item>
                  <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.countertop.R} onChangeText={(text) => {
                      let p = text.split('.').join('');
                      content.countertop.R = String((Math.round(p) / 10).toFixed(1));
                      this.setState({})
                  }} />
              </Item>
          </Col>
      </Grid>

      <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
              <Text>Backsplash</Text>
              <Button
                  onPress={() =>
                      ActionSheet.show(
                          {
                              options: INTSUB4,
                              cancelButtonIndex: INTSUB4.length - 1,
                              title: "Material"
                          },
                          buttonIndex => {
                              if (buttonIndex != INTSUB4.length - 1) {
                                  content.backsplash.M = INTSUB4[buttonIndex]
                                  this.setState({})
                              }
                          }
                      )}
              >
                  <Text>{content.backsplash.M || "Material"}</Text>
              </Button>
              <Text >{content.backsplash.I == true ? 'Intact' : 'Deteriorated'}</Text>
              <ListItem>
                  <RkChoice rkType='posNeg' selected={content.backsplash.I} onChange={(e) => {
                      content.backsplash.I = !content.backsplash.I
                      this.setState({})
                  }} />
              </ListItem>
              <Item>
                  <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.backsplash.R} onChangeText={(text) => {
                      let p = text.split('.').join('');
                      content.backsplash.R = String((Math.round(p) / 10).toFixed(1));
                      this.setState({})
                  }} />
              </Item>
          </Col>
          <Col style={{ height: 200 }}>
              <Text>Medicine Cabinet</Text>
              <Button
                  onPress={() =>
                      ActionSheet.show(
                          {
                              options: INTSUB4,
                              cancelButtonIndex: INTSUB4.length - 1,
                              title: "Material"
                          },
                          buttonIndex => {
                              if (buttonIndex != INTSUB4.length - 1) {
                                  content.medicine.M = INTSUB4[buttonIndex]
                                  this.setState({})
                              }
                          }
                      )}
              >
                  <Text>{content.medicine.M || "Material"}</Text>
              </Button>
              <Text >{content.medicine.I == true ? 'Intact' : 'Deteriorated'}</Text>
              <ListItem>
                  <RkChoice rkType='posNeg' selected={content.medicine.I} onChange={(e) => {
                      content.medicine.I = !content.medicine.I
                      this.setState({})
                  }} />
              </ListItem>
              <Item>
                  <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.medicine.R} onChangeText={(text) => {
                      let p = text.split('.').join('');
                      content.medicine.R = String((Math.round(p) / 10).toFixed(1));
                      this.setState({})
                  }} />
              </Item>
          </Col>
      </Grid>
      <Item stackedLabel>
        <Label>Comments</Label>
        <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
      </Item>
      {this.renderHtmlFooter(sheetId, content)}
  </View>
  );
}
if (content.title == 'Interior Trim') {
return (
  <View>
    <Grid style={{ marginTop: 0 }}>
      <Col>
        <Button block error style={{ marginTop: 10 }}
          onPress={() =>
            ActionSheet.show(
              {
                options: EXTTYPES1,
                cancelButtonIndex: EXTTYPES1.length - 1,
                title: "Select Side"
              },
              buttonIndex => {
                if (buttonIndex != EXTTYPES1.length - 1) {
                  content.type = EXTTYPES1[buttonIndex]
                } else {
                  content.type = '';
                }
                this.setState({})
              }
            )}>
          <Text>{content.type || 'Type'}</Text>
        </Button>
      </Col>
    </Grid>

    <Grid style={{ marginTop: 10 }}>
      <Col style={{ height: 200 }}>
        <Text>Crown Modling</Text>
        <Grid>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: SIDES.length - 1,
                    title: content.cModling.S || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != SIDES.length - 1) {
                      content.cModling.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.cModling.S || "Side"}</Text>
            </Button>
          </Col>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB5,
                    cancelButtonIndex: INTSUB5.length - 1,
                    title: content.cModling.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB5.length - 1) {
                      content.cModling.M = INTSUB5[buttonIndex]
                      content.horizontal.M = INTSUB5[buttonIndex]
                      content.vertical.M = INTSUB5[buttonIndex]
                      content.picture.M = INTSUB5[buttonIndex]
                      content.plate.M = INTSUB5[buttonIndex]
                      content.chain.M = INTSUB5[buttonIndex]
                      content.trim.M = INTSUB5[buttonIndex]
                      content.frame.M = INTSUB5[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.cModling.M || "Material"}</Text>
            </Button>
          </Col>
        </Grid>
        <Text style={{ marginTop: 20 }} >{content.cModling.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.cModling.I} onChange={(e) => {
            content.cModling.I = !content.cModling.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.cModling.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.cModling.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
      <Col style={{ height: 200 }}>
        <Text>Picture Rail</Text>
        <Grid>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: SIDES.length - 1,
                    title: content.picture.S || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != SIDES.length - 1) {
                      content.picture.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.picture.S || "Side"}</Text>
            </Button>
          </Col>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB5,
                    cancelButtonIndex: INTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB5.length - 1) {
                      content.picture.M = INTSUB5[buttonIndex]
                    }
                    this.setState({})
                  }
                )}
            >
              <Text>{content.picture.M || "Material"}</Text>
            </Button>
          </Col>
        </Grid>
        <Text style={{ marginTop: 20 }}>{content.picture.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.picture.I} onChange={(e) => {
            content.picture.I = !content.picture.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.picture.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.picture.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
    </Grid>
    <Grid>
      <Col style={{ height: 200 }}>
        <Text>Plate Rail</Text>
        <Grid>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: SIDES.length - 1,
                    title: content.plate.S || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != SIDES.length - 1) {
                      content.plate.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.plate.S || "Side"}</Text>
            </Button>
          </Col>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB5,
                    cancelButtonIndex: INTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB5.length - 1) {
                      content.plate.M = INTSUB5[buttonIndex]
                    }

                    this.setState({})
                  }
                )}
            >
              <Text>{content.plate.M || "Material"}</Text>
            </Button>
          </Col>
        </Grid>
        <Text style={{ marginTop: 20 }}>{content.plate.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.plate.I} onChange={(e) => {
            content.plate.I = !content.plate.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.plate.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.plate.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
      <Col style={{ height: 200 }}>
        <Text>Horizontal Trim</Text>
        <Grid>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: SIDES.length - 1,
                    title: content.horizontal.S || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != SIDES.length - 1) {
                      content.horizontal.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.horizontal.S || "Side"}</Text>
            </Button>
          </Col>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB5,
                    cancelButtonIndex: INTSUB5.length - 1,
                    title: content.horizontal.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB5.length - 1) {
                      content.horizontal.M = INTSUB5[buttonIndex]
                    }

                    this.setState({})
                  }
                )}
            >
              <Text>{content.horizontal.M || "Material"}</Text>
            </Button>
          </Col>
        </Grid>
        <Text style={{ marginTop: 20 }} >{content.horizontal.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.horizontal.I} onChange={(e) => {
            content.horizontal.I = !content.horizontal.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.horizontal.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.horizontal.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />

        </Item>
      </Col>
    </Grid>
    <Grid style={{ marginTop: 10 }}>
      <Col style={{ height: 200 }}>
        <Text>Vertical Trim</Text>
        <Grid>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: SIDES.length - 1,
                    title: content.vertical.S || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != SIDES.length - 1) {
                      content.vertical.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.vertical.S || "Side"}</Text>
            </Button>
          </Col>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB5,
                    cancelButtonIndex: INTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB5.length - 1) {
                      content.vertical.M = INTSUB5[buttonIndex]
                    }
                    this.setState({})
                  }
                )}
            >
              <Text>{content.vertical.M || "Material"}</Text>
            </Button>
          </Col>
        </Grid>
        <Text style={{ marginTop: 10 }}>{content.vertical.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.vertical.I} onChange={(e) => {
            content.vertical.I = !content.vertical.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.vertical.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.vertical.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
      <Col style={{ height: 200 }}>
        <Text>Chair Rail</Text>
        <Grid>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: SIDES.length - 1,
                    title: content.chain.S || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != SIDES.length - 1) {
                      content.chain.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.chain.S || "Side"}</Text>
            </Button>
          </Col>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB5,
                    cancelButtonIndex: INTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB5.length - 1) {
                      content.chain.M = INTSUB5[buttonIndex]
                    }
                    this.setState({})
                  }
                )}
            >
              <Text>{content.chain.M || "Material"}</Text>
            </Button>
          </Col>
        </Grid>
        <Text style={{ marginTop: 10 }}>{content.chain.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.chain.I} onChange={(e) => {
            content.chain.I = !content.chain.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.chain.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.chain.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
    </Grid>
    <Grid style={{ marginTop: 10 }}>
      <Col style={{ height: 200 }}>
        <Text>Trim</Text>
        <Grid>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: SIDES.length - 1,
                    title: content.trim.S || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != SIDES.length - 1) {
                      content.trim.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.trim.S || "Side"}</Text>
            </Button>
          </Col>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB5,
                    cancelButtonIndex: INTSUB5.length - 1,
                    title: content.trim.M || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB5.length - 1) {
                      content.trim.M = INTSUB5[buttonIndex]
                    }
                    this.setState({})
                  }
                )}
            >
              <Text>{content.trim.M || "Material"}</Text>
            </Button>
          </Col>
        </Grid>
        <Text style={{ marginTop: 10 }} >{content.trim.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.trim.I} onChange={(e) => {
            content.trim.I = !content.trim.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.trim.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.trim.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
      <Col style={{ height: 200 }}>
        <Text>Frame</Text>
        <Grid>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SIDES,
                    cancelButtonIndex: SIDES.length - 1,
                    title: content.frame.S || "Select Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != SIDES.length - 1) {
                      content.frame.S = SIDES[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.frame.S || "Side"}</Text>
            </Button>
          </Col>
          <Col>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB5,
                    cancelButtonIndex: INTSUB5.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB5.length - 1) {
                      content.frame.M = INTSUB5[buttonIndex]
                    }
                    this.setState({})
                  }
                )}
            >
              <Text>{content.frame.M || "Material"}</Text>
            </Button>
          </Col>
        </Grid>
        <Text style={{ marginTop: 10 }}>{content.frame.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
            content.frame.I = !content.frame.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.frame.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.frame.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
    </Grid>

    <Item stackedLabel>
      <Label>Comments</Label>
      <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
    </Item>

    {this.renderHtmlFooter(sheetId, content)}
  </View>
);
}

  /** OTHER ITEM interior **/

  if (content.title == 'Other Item') {
    return (
      <View keyboardDismissMode="on-drag">
        <Grid style={{ marginTop: 0 }}>
          <Col>
            <Button block error style={{ marginTop: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTTYPES1,
                    cancelButtonIndex: EXTTYPES1.length - 1,
                    title: "Select Type"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTTYPES1.length - 1) {
                      content.doorType = EXTTYPES1[buttonIndex]

                    } else {
                      content.doorType = '';
                    }
                    this.setState({})
                  }
                )}>
              <Text>{content.doorType || 'Type'}</Text>
            </Button>
          </Col>
        </Grid>

        <Grid >
          <Col style={{ height: 200 }}>
            <Text>Other Item</Text>
            <Grid>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: SIDES,
                        cancelButtonIndex: SIDES.length - 1,
                        title: content.other.S || "Select Side"
                      },
                      buttonIndex => {
                        if (buttonIndex != SIDES.length - 1) {
                          content.other.S = SIDES[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.other.S || "Side"}</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB6,
                        cancelButtonIndex: INTSUB6.length - 1,
                        title: content.other.M || "Select Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB6.length - 1) {
                          content.other.M = INTSUB6[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.other.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 45 }} >{content.other.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.other.I} onChange={(e) => {
                content.other.I = !content.other.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.other.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.other.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
            }} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderHtmlFooter(sheetId, content)}
      </View>
    );
  }

  /** Misc interoir */
  if (content.title == 'Misc Interior') {
    return (
      <View keyboardDismissMode="on-drag">
        <Grid style={{ marginTop: 0 }}>
          <Col>
            <Button block error style={{ marginTop: 10 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: EXTTYPES1,
                    cancelButtonIndex: EXTTYPES1.length - 1,
                    title: "Select Side"
                  },
                  buttonIndex => {
                    if (buttonIndex != EXTTYPES1.length - 1) {
                      content.doorType = EXTTYPES1[buttonIndex]

                    } else {
                      content.doorType = '';
                    }
                    this.setState({})
                  }
                )}>
              <Text>{content.doorType || 'Type'}</Text>
            </Button>
          </Col>
        </Grid>

        <Grid >
          <Col style={{ height: 200 }}>
            <Text>Baseboard</Text>
            <Grid>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: SIDES,
                        cancelButtonIndex: SIDES.length - 1,
                        title: content.baseboard.S || "Select Side"
                      },
                      buttonIndex => {
                        if (buttonIndex != SIDES.length - 1) {
                          content.baseboard.S = SIDES[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.baseboard.S || "Side"}</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB6,
                        cancelButtonIndex: INTSUB6.length - 1,
                        title: content.baseboard.M || "Select Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB6.length - 1) {
                          content.baseboard.M = INTSUB6[buttonIndex]
                          content.ceiling.M = INTSUB6[buttonIndex]
                          content.vent.M = INTSUB6[buttonIndex]
                          content.floor.M = INTSUB6[buttonIndex]
                          content.atticFrame.M = INTSUB6[buttonIndex]
                          content.electricFrame.M = INTSUB6[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.baseboard.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 45 }} >{content.baseboard.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.baseboard.I} onChange={(e) => {
                content.baseboard.I = !content.baseboard.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.baseboard.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.baseboard.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
            }} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Ceiling</Text>
            <Grid>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: SIDES,
                        cancelButtonIndex: SIDES.length - 1,
                        title: content.ceiling.S || "Select Side"
                      },
                      buttonIndex => {
                        if (buttonIndex != SIDES.length - 1) {
                          content.ceiling.S = SIDES[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.ceiling.S || "Side"}</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB6,
                        cancelButtonIndex: INTSUB6.length - 1,
                        title: "Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB6.length - 1) {
                          content.ceiling.M = INTSUB6[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.ceiling.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 45 }}>{content.ceiling.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.ceiling.I} onChange={(e) => {
                content.ceiling.I = !content.ceiling.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.ceiling.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.ceiling.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
            }} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Heater Vent</Text>
            <Grid>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: SIDES,
                        cancelButtonIndex: SIDES.length - 1,
                        title: content.vent.S || "Select Side"
                      },
                      buttonIndex => {
                        if (buttonIndex != SIDES.length - 1) {
                          content.vent.S = SIDES[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.vent.S || "Side"}</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB6,
                        cancelButtonIndex: INTSUB6.length - 1,
                        title: "Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB6.length - 1) {
                          content.vent.M = INTSUB6[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.vent.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 45 }}>{content.vent.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.vent.I} onChange={(e) => {
                content.vent.I = !content.vent.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
             <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.vent.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.vent.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
            }} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Floor</Text>
            <Grid>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: SIDES,
                        cancelButtonIndex: SIDES.length - 1,
                        title: content.floor.S || "Select Side"
                      },
                      buttonIndex => {
                        if (buttonIndex != SIDES.length - 1) {
                          content.floor.S = SIDES[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.floor.S || "Side"}</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB6,
                        cancelButtonIndex: INTSUB6.length - 1,
                        title: "Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB6.length - 1) {
                          content.floor.M = INTSUB6[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.floor.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 45 }}>{content.floor.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.floor.I} onChange={(e) => {
                content.floor.I = !content.floor.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.floor.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.floor.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
            }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Attic Access/Frame</Text>
            <Grid>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: SIDES,
                        cancelButtonIndex: SIDES.length - 1,
                        title: content.atticFrame.S || "Select Side"
                      },
                      buttonIndex => {
                        if (buttonIndex != SIDES.length - 1) {
                          content.atticFrame.S = SIDES[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.atticFrame.S || "Side"}</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB6,
                        cancelButtonIndex: INTSUB6.length - 1,
                        title: "Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB6.length - 1) {
                          content.atticFrame.M = INTSUB6[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.atticFrame.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 45 }}>{content.atticFrame.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.atticFrame.I} onChange={(e) => {
                content.atticFrame.I = !content.atticFrame.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.atticFrame.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.atticFrame.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
            }} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Electric Panel/Frame</Text>
            <Grid>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: SIDES,
                        cancelButtonIndex: SIDES.length - 1,
                        title: content.electricFrame.S || "Select Side"
                      },
                      buttonIndex => {
                        if (buttonIndex != SIDES.length - 1) {
                          content.electricFrame.S = SIDES[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.electricFrame.S || "Side"}</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB6,
                        cancelButtonIndex: INTSUB6.length - 1,
                        title: "Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB6.length - 1) {
                          content.electricFrame.M = INTSUB6[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.electricFrame.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 45 }}>{content.electricFrame.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.electricFrame.I} onChange={(e) => {
                content.electricFrame.I = !content.electricFrame.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.electricFrame.R} onChangeText={(text) => {
                let p = text.split('.').join('');
                content.electricFrame.R = String((Math.round(p) / 10).toFixed(1));
                this.setState({})
            }} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderHtmlFooter(sheetId, content)}
      </View>
    );
  }

  /** Interior Tile */
  if (content.title == 'Tile') {
    return (
      <View keyboardDismissMode="on-drag">
        <Grid >
          <Col style={{ height: 200 }}>
            <Text>Shower</Text>
            <Grid>
              <Col>
                <Button block error style={{ marginTop: 0, marginRight: 10 }}
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: SIDES,
                        cancelButtonIndex: 9,
                        title: "Select Side"
                      },
                      buttonIndex => {
                        if (buttonIndex != SIDES.length - 1) {
                          content.shower.S = SIDES[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}>
                  <Text>{content.shower.S || "Side"}</Text>
                </Button>
              </Col>
              <Col>
                <Button
                  onPress={() =>
                    ActionSheet.show(
                      {
                        options: INTSUB2,
                        cancelButtonIndex: INTSUB2.length - 1,
                        title: content.shower.M || "Select Material"
                      },
                      buttonIndex => {
                        if (buttonIndex != INTSUB2.length - 1) {
                          content.shower.M = INTSUB9[buttonIndex]
                          content.wall.M = INTSUB9[buttonIndex]
                          content.curb.M = INTSUB9[buttonIndex]
                          content.ceiling.M = INTSUB9[buttonIndex]
                          content.floor.M = INTSUB9[buttonIndex]
                          content.backsplash.M = INTSUB9[buttonIndex]
                          content.trim.M = INTSUB9[buttonIndex]
                          this.setState({})
                        }
                      }
                    )}
                >
                  <Text>{content.shower.M || "Material"}</Text>
                </Button>
              </Col>
            </Grid>
            <Text style={{ marginTop: 45 }} >{content.shower.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.shower.I} onChange={(e) => {
                content.shower.I = !content.shower.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.shower.R} onChangeText={(text) => {
        let p = text.split('.').join('');
        content.shower.R = String((Math.round(p) / 10).toFixed(1));
        this.setState({})
}} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Wall</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB9,
                    cancelButtonIndex: INTSUB9.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB9.length - 1) {
                      content.wall.M = INTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.wall.M || "Material"}</Text>
            </Button>
            <Text >{content.wall.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.wall.I} onChange={(e) => {
                content.wall.I = !content.wall.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.wall.R} onChangeText={(text) => {
        let p = text.split('.').join('');
        content.wall.R = String((Math.round(p) / 10).toFixed(1));
        this.setState({})
}} />
            </Item>
          </Col>

          <Col style={{ height: 200 }}>
            <Text>Curb</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB9,
                    cancelButtonIndex: INTSUB9.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB9.length - 1) {
                      content.curb.M = INTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.curb.M || "Material"}</Text>
            </Button>
            <Text >{content.curb.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.curb.I} onChange={(e) => {
                content.curb.I = !content.curb.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.curb.R} onChangeText={(text) => {
        let p = text.split('.').join('');
        content.curb.R = String((Math.round(p) / 10).toFixed(1));
        this.setState({})
}} />
            </Item>
          </Col>
        </Grid>
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Text>Ceiling</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB9,
                    cancelButtonIndex: INTSUB9.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB9.length - 1) {
                      content.ceiling.M = INTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.ceiling.M || "Material"}</Text>
            </Button>
            <Text >{content.ceiling.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.ceiling.I} onChange={(e) => {
                content.ceiling.I = !content.ceiling.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.ceiling.R} onChangeText={(text) => {
        let p = text.split('.').join('');
        content.ceiling.R = String((Math.round(p) / 10).toFixed(1));
        this.setState({})
}} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Floor</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB9,
                    cancelButtonIndex: INTSUB9.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB9.length - 1) {
                      content.floor.M = INTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.floor.M || "Material"}</Text>
            </Button>
            <Text >{content.floor.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.floor.I} onChange={(e) => {
                content.floor.I = !content.floor.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.floor.R} onChangeText={(text) => {
        let p = text.split('.').join('');
        content.floor.R = String((Math.round(p) / 10).toFixed(1));
        this.setState({})
}} />
            </Item>
          </Col>
          <Col style={{ height: 200 }}>
            <Text>Backsplash</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB9,
                    cancelButtonIndex: INTSUB9.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB9.length - 1) {
                      content.backsplash.M = INTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.backsplash.M || "Material"}</Text>
            </Button>
            <Text >{content.backsplash.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.backsplash.I} onChange={(e) => {
                content.backsplash.I = !content.backsplash.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.backsplash.R} onChangeText={(text) => {
        let p = text.split('.').join('');
        content.backsplash.R = String((Math.round(p) / 10).toFixed(1));
        this.setState({})
}} />
            </Item>
          </Col>

        </Grid>
        <Grid>
          <Col style={{ height: 200 }}>
            <Text>Trim</Text>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB9,
                    cancelButtonIndex: INTSUB9.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB9.length - 1) {
                      content.trim.M = INTSUB9[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.trim.M || "Material"}</Text>
            </Button>
            <Text >{content.trim.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.trim.I} onChange={(e) => {
                content.trim.I = !content.trim.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.trim.R} onChangeText={(text) => {
        let p = text.split('.').join('');
        content.trim.R = String((Math.round(p) / 10).toFixed(1));
        this.setState({})
}} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>
        {this.renderHtmlFooter(sheetId, content)}
      </View>


    );
  }

  /** Other item */
  if (content.title == 'Other Item') {
    return (
      <View keyboardDismissMode="on-drag">
        <Grid style={{ marginTop: 10 }}>
          <Col style={{ height: 200 }}>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: INTSUB7,
                    cancelButtonIndex: INTSUB7.length - 1,
                    title: "Material"
                  },
                  buttonIndex => {
                    if (buttonIndex != INTSUB7.length - 1) {
                      content.M = INTSUB7[buttonIndex]
                      this.setState({})
                    }
                  }
                )}
            >
              <Text>{content.M || "Material"}</Text>
            </Button>
            <Text style={{ marginTop: 10 }}>{content.I == true ? 'Intact' : 'Deteriorated'}</Text>
            <ListItem>
              <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
                content.I = !content.I
                this.setState({})
              }} />
            </ListItem>
            <Item>
              <Input keyboardType="numeric" placeholder="Reading" value={content.R} onChangeText={(text) => { content.R = text; this.setState({}) }} />
            </Item>
          </Col>
        </Grid>
        <Item stackedLabel>
          <Label>Comments</Label>
          <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
        </Item>

        {this.renderHtmlFooter(sheetId, content)}
      </View>
    );
  }


  /** Fire place */
if (content.title == 'Fireplace') {
return (
  <View keyboardDismissMode="on-drag">
    <Grid style={{ marginTop: 0 }}>
      <Col>
        <Button block error style={{ marginTop: 10, marginRight: 10 }}
          onPress={() =>
            ActionSheet.show(
              {
                options: SIDES,
                cancelButtonIndex: 9,
                title: "Select Side"
              },
              buttonIndex => {
                if (buttonIndex != SIDES.length - 1) {
                  content.side = SIDES[buttonIndex]
                  this.setState({})
                }
              }
            )}>
          <Text>{content.side || "Side"}</Text>
        </Button>
      </Col>
    </Grid>

    <Grid style={{ marginTop: 10 }}>
      <Col style={{ height: 200 }}>
        <Text>Mantle</Text>
        <Button
          onPress={() =>
            ActionSheet.show(
              {
                options: INTSUB7,
                cancelButtonIndex: INTSUB7.length - 1,
                title: content.mantle.M || "Select Material"
              },
              buttonIndex => {
                if (buttonIndex != INTSUB7.length - 1) {
                  content.mantle.M = INTSUB7[buttonIndex]
                  content.hearth.M = INTSUB7[buttonIndex]
                  content.fireplace.M = INTSUB7[buttonIndex]
                  content.chimney.M = INTSUB7[buttonIndex]
                  this.setState({})
                }
              }
            )}
        >
          <Text>{content.mantle.M || "Material"}</Text>
        </Button>
        <Text style={{ marginTop: 10 }} >{content.mantle.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.mantle.I} onChange={(e) => {
            content.mantle.I = !content.mantle.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.mantle.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.mantle.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
      <Col style={{ height: 200 }}>
        <Text>Hearth</Text>
        <Button
          onPress={() =>
            ActionSheet.show(
              {
                options: INTSUB7,
                cancelButtonIndex: INTSUB7.length - 1,
                title: "Material"
              },
              buttonIndex => {
                if (buttonIndex != INTSUB7.length - 1) {
                  content.hearth.M = INTSUB7[buttonIndex]
                  this.setState({})
                }
              }
            )}
        >
          <Text>{content.hearth.M || "Material"}</Text>
        </Button>
        <Text style={{ marginTop: 10 }}>{content.hearth.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.hearth.I} onChange={(e) => {
            content.hearth.I = !content.hearth.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.hearth.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.hearth.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
      <Col style={{ height: 200 }}>
        <Text>Fireplace</Text>
        <Button
          onPress={() =>
            ActionSheet.show(
              {
                options: INTSUB7,
                cancelButtonIndex: INTSUB7.length - 1,
                title: "Material"
              },
              buttonIndex => {
                if (buttonIndex != INTSUB7.length - 1) {
                  content.fireplace.M = INTSUB7[buttonIndex]
                  this.setState({})
                }
              }
            )}
        >
          <Text>{content.fireplace.M || "Material"}</Text>
        </Button>
        <Text style={{ marginTop: 10 }}>{content.fireplace.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.fireplace.I} onChange={(e) => {
            content.fireplace.I = !content.fireplace.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.fireplace.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.fireplace.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
      <Col style={{ height: 200 }}>
        <Text>Chimney</Text>
        <Button
          onPress={() =>
            ActionSheet.show(
              {
                options: INTSUB7,
                cancelButtonIndex: INTSUB7.length - 1,
                title: "Material"
              },
              buttonIndex => {
                if (buttonIndex != INTSUB7.length - 1) {
                  content.chimney.M = INTSUB7[buttonIndex]
                  this.setState({})
                }
              }
            )}
        >
          <Text>{content.chimney.M || "Material"}</Text>
        </Button>
        <Text style={{ marginTop: 10 }}>{content.chimney.I == true ? 'Intact' : 'Deteriorated'}</Text>
        <ListItem>
          <RkChoice rkType='posNeg' selected={content.chimney.I} onChange={(e) => {
            content.chimney.I = !content.chimney.I
            this.setState({})
          }} />
        </ListItem>
        <Item>
          <Input keyboardType="numeric" placeholder="Reading" maxLength={4} value={content.chimney.R} onChangeText={(text) => {
    let p = text.split('.').join('');
    content.chimney.R = String((Math.round(p) / 10).toFixed(1));
    this.setState({})
}} />
        </Item>
      </Col>
    </Grid>
    <Item stackedLabel>
      <Label>Comments</Label>
      <Input value={content.comments} onChangeText={(text) => { content.comments = text; this.setState({}) }} />
    </Item>

    {this.renderHtmlFooter(sheetId, content)}
  </View>
);
}
}


  renderSoilSheet(content, sheetId) {
    if (content.type == 'detail') {
      return (
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <Item stackedLabel>
            <Label>No. of Samples Collected</Label>
            <Input keyboardType="numeric" value={content.numCollected} onChangeText={(text) => { content.numCollected = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel last>
            <Label>No. of Samples Submitted</Label>
            <Input keyboardType="numeric" value={content.numSubmitted} onChangeText={(text) => { content.numSubmitted = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel last>
            <Label>Submitted By</Label>
            <Input value={content.submittedBy} onChangeText={(text) => { content.submittedBy = text; this.setState({}) }} />

          </Item>
          <Item stackedLabel last>
            <Label>Turn Around</Label>
            <Input value={content.turnAround} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['6hr', '24hr', '48hr', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Turn Around"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.turnAround = '6hr'
                  }
                  if (buttonIndex == 1) {
                    content.turnAround = '24hr'
                  }
                  if (buttonIndex == 2) {
                    content.turnAround = '48hr'
                  }
                  this.setState({})
                }
              )}
              onChangeText={(e) => {
                content.turnAround = e
                this.setState({})
              }}
            />

          </Item>
          <Item stackedLabel last>
            <Text>Relenquished By</Text>
            <Label>Name</Label>
            <Input value={content.relenquishedBy} onChangeText={(text) => { content.relenquishedBy = text; this.setState({}) }} />
            <Label>Date</Label>
            <DatePicker
              defaultDate={content.relenquisheddate}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              format="MM/DD/YYYY"
              formatChosenDate={date => { return moment(date).format('L'); }}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(newdate) => { content.relenquisheddate = newdate }}
            />
          </Item>
          <Item stackedLabel last>
            <Text>Recieved By</Text>
            <Label>Name</Label>
            <Input value={content.recievedBy} onChangeText={(text) => { content.recievedBy = text; this.setState({}) }} />
            <Label>Date</Label>
            <DatePicker
              defaultDate={content.recievedDate}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              format="MM/DD/YYYY"
              formatChosenDate={date => { return moment(date).format('L'); }}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(newdate) => { content.recievedDate = newdate }}
            />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </ScrollView>
      )
    }
    if (content.type == 'sample') {
      return (
        <View>
          <Item stackedLabel last>
            <Label>Area</Label>
            <Input value={content.area} onChangeText={(text) => { content.area = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel last>
            <Label>Number of Subsamples</Label>
            <Input keyboardType="numeric" value={content.samples} onChangeText={(text) => { content.samples = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel last>
            <Button
              onPress={() => {
                ActionSheet.show(
                  {
                    options: SOILSURFACES,
                    cancelButtonIndex: SOILSURFACES.length - 1,
                    title: "Surface Type"
                  },
                  buttonIndex => {
                    if (buttonIndex == SOILSURFACES.length - 1) {
                      content.surface = '';
                    } else {
                      content.surface = SOILSURFACES[buttonIndex]
                    }

                    this.setState({})
                  }
                )
              }}
            >
              <Text>{content.surface || 'Surface Type'}</Text>
            </Button>
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
  }

  renderDustSheet(content, sheetId) {
    if (content.type == 'detail') {
      return (
        <Form>
          <Item stackedLabel>
            <Label>No. of Samples Collected</Label>
            <Input keyboardType="numeric" value={content.numCollected} onChangeText={(text) => { content.numCollected = text }} />
          </Item>
          <Item stackedLabel last>
            <Label>Turn Around</Label>
            <Input value={content.turnAround} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['6hr', '24hr', '48hr', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Turn Around"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.turnAround = '6hr'
                  }
                  if (buttonIndex == 1) {
                    content.turnAround = '24hr'
                  }
                  if (buttonIndex == 2) {
                    content.turnAround = '48hr'
                  }
                  this.setState({})
                }
              )}
              onChangeText={(e) => {
                content.turnAround = e
                this.setState({})
              }}
            />
          </Item>
          <Item stackedLabel last>
            <Text>Relenquished By</Text>
            <Label>Name</Label>
            <Input value={content.relenquishedBy} onChangeText={(text) => { content.relenquishedBy = text; this.setState({}) }} />
            <Label>Date</Label>
            <DatePicker
              defaultDate={content.relenquisheddate}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              format="MM/DD/YYYY"
              formatChosenDate={date => { return moment(date).format('L'); }}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(newdate) => { content.relenquisheddate = newdate }}
            />
          </Item>
          <Item stackedLabel last>
            <Text>Recieved By</Text>
            <Label>Name</Label>
            <Input value={content.recievedBy} onChangeText={(text) => { content.recievedBy = text; this.setState({}) }} />
            <Label>Date</Label>
            <DatePicker
              defaultDate={content.recievedDate}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              format="MM/DD/YYYY"
              formatChosenDate={date => { return moment(date).format('L'); }}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(newdate) => { content.recievedDate = newdate }}
            />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </Form>
      )
    }
    if (content.type == 'sample') {
      return (
        <View>
          <Item stackedLabel last>
            <Label>Room</Label>
            <Input value={content.room} onChangeText={(text) => { content.room = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel last>
            <Text>Size of Sample</Text>
            <Label>Length</Label>
            <Input keyboardType="numeric" value={content.length} onChangeText={(text) => { content.length = text; this.setState({}) }} />
            <Label>Width</Label>
            <Input keyboardType="numeric" value={content.width} onChangeText={(text) => { content.width = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel last>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: DUSTSURFACES,
                    cancelButtonIndex: DUSTSURFACES.length - 1,
                    title: "Surface Type"
                  },
                  buttonIndex => {
                    if (buttonIndex == DUSTSURFACES.length - 1) {
                      content.surface = '';
                    } else {
                      content.surface = DUSTSURFACES[buttonIndex]
                    }

                    this.setState({})
                  }
                )}
            >
              <Text>{content.surface || 'Surface Type'}</Text>
            </Button>
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
  }

  _renderContent(content) {
    console.log(content);
    let idd = content.id;
    if (content.type == 'property details') {
      return (
        <View>

          <Item stackedLabel>
          <View style={{flexDirection:'column',width:'100%'}}>
              <Label style={{width:'100%',fontSize:15}}>Type of dwelling</Label>
              <TouchableOpacity style={{width:'100%',padding: 13}} onPress={() =>
                ActionSheet.show(
                  {
                    options: DWELLING,
                    cancelButtonIndex: 8,
                    title: "Type of Dwelling"
                  },
                  buttonIndex => {
                    if (buttonIndex != 8) {
                      content.dwelling = DWELLING[buttonIndex]
                      this.setState({})
                    }
                  }
                )} >
                 <Text>{content.dwelling}</Text>
              </TouchableOpacity>
            </View>
          </Item>

          <Item stackedLabel>
            <Label>Year built</Label>
            <Input keyboardType="numeric" value={content.year} onChangeText={(text) => { content.year = text; this.setState({})}} />
          </Item>

          <Item stackedLabel>
          <View style={{flexDirection:'column',width:'100%'}}>
              <Label style={{width:'100%',fontSize:15}}>Built On/Over</Label>
              <TouchableOpacity style={{width:'100%',padding: 13}} onPress={() =>
                ActionSheet.show(
                  {
                    options: ['basement', 'slab', 'hillside', 'parking garage', 'raised foundation', 'Other', 'Cancel'],
                    cancelButtonIndex: 6,
                    title: "Built on/over"
                  },
                  buttonIndex => {
                    if (buttonIndex == 0) {
                      content.builtover = 'basement'
                      this.setState({})
                    }
                    if (buttonIndex == 1) {
                      content.builtover = 'slab'
                      this.setState({})
                    }
                    if (buttonIndex == 2) {
                      content.builtover = 'hillside'
                      this.setState({})
                    }
                    if (buttonIndex == 3) {
                      content.builtover = 'parking garage'
                      this.setState({})
                    }
                    if (buttonIndex == 4) {
                      content.builtover = 'raised foundation'
                      this.setState({})
                    }
                    if (buttonIndex == 5) {
                      content.builtover = this.value
                      this.setState({})
                    }
                  }
                )} >
                 <Text>{content.builtover}</Text>
              </TouchableOpacity>
            </View>
          </Item>

          <Text style={{ fontWeight: 'bold' }}>Exterior(Check all that apply)</Text>
          <ListItem>
            <Text>Brick</Text>
            <RkChoice rkType='posNeg' selected={content.brick} onChange={(e) => { content.brick = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Wood Siding</Text>
            <RkChoice rkType='posNeg' selected={content.wood} onChange={(e) => { content.wood = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Stucco</Text>
            <RkChoice rkType='posNeg' selected={content.stucco} onChange={(e) => { content.stucco = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Transite-Asbestos</Text>
            <RkChoice rkType='posNeg' selected={content.transas} onChange={(e) => { content.transas = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Wood Shingles</Text>
            <RkChoice rkType='posNeg' selected={content.woodshing} onChange={(e) => { content.woodshing = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Other</Text>
            <RkChoice rkType='posNeg' selected={content.other} onChange={(e) => { content.other = !e; this.setState({}) }} />
          </ListItem>

          <Item stackedLabel>
          <View style={{flexDirection:'column',width:'100%'}}>
              <Label style={{width:'100%',fontSize:15}}>COD Payment type</Label>
              <TouchableOpacity style={{width:'100%',padding: 13}} onPress={() =>
                ActionSheet.show(
                  {
                    options: ['Cash', 'CC', 'Check', 'Cancel'],
                    cancelButtonIndex: 3,
                    title: "Payment"
                  },
                  buttonIndex => {
                    if (buttonIndex == 0) {
                      content.payment = 'Cash'
                      this.setState({})
                    }
                    if (buttonIndex == 1) {
                      content.payment = 'CC'
                      this.setState({})
                    }
                    if (buttonIndex == 2) {
                      content.payment = 'Check'
                      this.setState({})
                    }
                  }
                )} >
                 <Text>{content.payment}</Text>
              </TouchableOpacity>
            </View>
          </Item>
          <Item stackedLabel>
            <Label>Number of units</Label>
            <Input keyboardType="numeric" value={content.units} onChangeText={(text) => { content.units = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of units tested</Label>
            <Input keyboardType="numeric" value={content.tested} onChangeText={(text) => { content.tested = text;  this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of buildings</Label>
            <Input keyboardType="numeric" value={content.buildings} onChangeText={(text) => { content.buildings = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of stories</Label>
            <Input keyboardType="numeric" value={content.stories} onChangeText={(text) => { content.stories = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of laundry facilities</Label>
            <Input keyboardType="numeric" value={content.laundry} onChangeText={(text) => { content.laundry = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of garages</Label>
            <Input keyboardType="numeric" value={content.garages} onChangeText={(text) => { content.garages = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
          <View style={{flexDirection:'column',width:'100%'}}>
              <Label style={{width:'100%',fontSize:15}}>Units acessed via</Label>
              <TouchableOpacity style={{width:'100%',padding: 13}} onPress={() =>
                ActionSheet.show(
                {
                  options: ['Courtyard', 'Exterior', 'Hallways', 'Stairways', 'Other', 'Cancel'],
                  cancelButtonIndex: 10,
                  title: "Accessed"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.acess = 'Courtyard'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.acess = 'Exterior'
                    this.setState({})
                  }
                  if (buttonIndex == 2) {
                    content.acess = 'Hallways'
                    this.setState({})
                  }
                  if (buttonIndex == 3) {
                    content.acess = 'Stairways'
                    this.setState({})
                  }
                }
              )}>
                <Input value={content.acess}  onChangeText={(e) => {
                content.exterior = e
                this.setState({})
              }} />
              </TouchableOpacity>
            </View>
          </Item>
          <Item stackedLabel>
            <Label>XRF Serial</Label>
            <Input value={content.serial} onChangeText={(text) => { content.serial = text }} />
          </Item>
          <Item stackedLabel>
          <View style={{flexDirection:'column',width:'100%'}}>
              <Label style={{width:'100%',fontSize:15}}>Overall Paint Condition</Label>
              <TouchableOpacity style={{width:'100%',padding: 13}} onPress={() =>
                ActionSheet.show(
                {
                  options: ['Poor', 'Fair', 'Good', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Paint"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.paint = 'Poor'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.paint = 'Fair'
                    this.setState({})
                  }
                  if (buttonIndex == 2) {
                    content.paint = 'Good'
                    this.setState({})
                  }
                }
              )}>
               <Text>{content.paint}</Text>
              </TouchableOpacity>
            </View>
          </Item>
          <Text style={{ fontWeight: 'bold' }}>Types of windows (Check all that apply)</Text>
          <ListItem>
            <Text>Aluminum Framed</Text>
            <RkChoice rkType='posNeg' selected={content.framed} onChange={(e) => { content.framed = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Casement</Text>
            <RkChoice rkType='posNeg' selected={content.casement} onChange={(e) => { content.casement = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Double Hung Sash</Text>
            <RkChoice rkType='posNeg' selected={content.dblhung} onChange={(e) => { content.dblhung = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Fixed</Text>
            <RkChoice rkType='posNeg' selected={content.fixed} onChange={(e) => { content.fixed = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Horizontal Sliding</Text>
            <RkChoice rkType='posNeg' selected={content.horz} onChange={(e) => { content.horz = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Louvered</Text>
            <RkChoice rkType='posNeg' selected={content.louvered} onChange={(e) => { content.louvered = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Transom</Text>
            <RkChoice rkType='posNeg' selected={content.transom} onChange={(e) => { content.transom = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Vinyl</Text>
            <RkChoice rkType='posNeg' selected={content.vinyl} onChange={(e) => { content.vinyl = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Bay Window</Text>
            <RkChoice rkType='posNeg' selected={content.bay} onChange={(e) => { content.bay = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Garden Window</Text>
            <RkChoice rkType='posNeg' selected={content.garden} onChange={(e) => { content.garden = !e; this.setState({}) }} />
          </ListItem>
          <Item stackedLabel>
          <View style={{flexDirection:'column',width:'100%'}}>
              <Label style={{width:'100%',fontSize:15}}>Garage</Label>
              <TouchableOpacity style={{width:'100%',padding: 13}} onPress={() =>
                ActionSheet.show(
                {
                  options: ['None', 'Attached', 'Detached', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Garage"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.garage = 'None'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.garage = 'Attached'
                    this.setState({})
                  }
                  if (buttonIndex == 2) {
                    content.garage = 'Detached'
                    this.setState({})
                  }
                }
              )}>
               <Text>{content.garage}</Text>
              </TouchableOpacity>
            </View>
          </Item>
          <Item stackedLabel>
            <Label>List areas not accessable</Label>
            <Input value={content.noaccess} onChangeText={(text) => { content.noaccess = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of Stories in building</Label>
            <Input keyboardType="numeric" value={content.buildingstories} onChangeText={(text) => { content.buildingstories = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of Stories in unit</Label>
            <Input keyboardType="numeric" value={content.unitstories} onChangeText={(text) => { content.unitstories = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of Beds</Label>
            <Input keyboardType="numeric" value={content.bednums} onChangeText={(text) => { content.bednums = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of Baths</Label>
            <Input keyboardType="numeric" value={content.bathnums} onChangeText={(text) => { content.bathnums = text; this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of dust</Label>
            <Input keyboardType="numeric" value={content.dustnums} onChangeText={(text) => { content.dustnums = text;  this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of soil</Label>
            <Input keyboardType="numeric" value={content.soilnums} onChangeText={(text) => { content.soilnums = text;  this.setState({}) }} />
          </Item>
          <Item stackedLabel>
            <View style={{flexDirection:'column',width:'100%'}}>
              <Label style={{width:'100%',fontSize:15}}>Do children live in the home?</Label>
              <TouchableOpacity style={{width:'100%',padding: 13}} onPress={() =>
                ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Don\'t know', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Children?"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.children = 'Yes'
                  }
                  if (buttonIndex == 1) {
                    content.children = 'No'

                  }
                  if (buttonIndex == 2) {
                    content.children = 'Don\'t know'
                  }
                  this.setState({})
                }
              )}>
               <Text>{content.children}</Text>
              </TouchableOpacity>
            </View>
          </Item>
          {this.renderHtmlFooterChecklist(content)}
        </View>
      );
    }

    if (content.type == 'details') {
      return (
        <Form>
          <Item stackedLabel>
            <Label>Inspector Id</Label>
            <Input keyboardType="numeric" value={content.insId} onChangeText={(text) => { content.insId = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Date</Label>
            <DatePicker
              defaultDate={content.insDate}
              locale={"en"}
              dateFormat="MM/DD/YYYY"
              formatChosenDate={date => { return moment(date).format('L'); }}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(newdate) => { content.insDate = newdate }}
            />
          </Item>
          {this.renderHtmlFooterChecklist(content)}
        </Form>
      )
    }
    if (content.type == 'calibration') {
      return (
        <Form>
          <Item stackedLabel>
            <Label>Serial Number</Label>
            <Input keyboardType="numeric" value={content.serial} onChangeText={(text) => { content.serial = text; this.setState({}) }} />
          </Item>
          <Grid>
            <Col>
              <Item stackedLabel last>
                <Text style={{ paddingTop: 10 }}>Start of Day</Text>

                <TouchableOpacity onPress={this._showStartDateTimePicker}>
                  {this.state.startCalibrate ? <Text style={{ paddingTop: 20, paddingBottom: 10 }}>{Moment(this.state.startCalibrate).format('MMMM Do YYYY, h:mm:ss a')}</Text> : <Text style={{ paddingTop: 20, paddingBottom: 10 }}>Select Date & Time</Text>}
                </TouchableOpacity>
                <DateTimePicker is24Hour={false} mode='datetime'
                  isVisible={this.state.isStartDateTimePickerVisible}
                  onConfirm={this._handleStartDatePicked}
                  onCancel={this._hideStartDateTimePicker}
                />
              </Item>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <Item stackedLabel>
                <Label>one</Label>
                <Input keyboardType="numeric" value={content.startone} onChangeText={(text) => { content.startone = text; this.setState({}) }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>two</Label>
                <Input keyboardType="numeric" value={content.starttwo} onChangeText={(text) => { content.starttwo = text; this.setState({}) }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>three</Label>
                <Input keyboardType="numeric" value={content.startthree} onChangeText={(text) => { content.startthree = text; this.setState({}) }} />
              </Item>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <Item stackedLabel last>
                <Text style={{ paddingTop: 10 }}>End of Day</Text>
                <TouchableOpacity onPress={this._showEndDateTimePicker}>
                  {this.state.endCalibrate ? <Text style={{ paddingTop: 20, paddingBottom: 10 }}>{Moment(this.state.endCalibrate).format('MMMM Do YYYY, h:mm:ss a')}</Text> : <Text style={{ paddingTop: 20, paddingBottom: 10 }}>Select Date & Time</Text>}
                </TouchableOpacity>
                <DateTimePicker is24Hour={false} mode='datetime'
                  isVisible={this.state.isEndDateTimePickerVisible}
                  onConfirm={this._handleEndDatePicked}
                  onCancel={this._hideEndDateTimePicker}
                />
              </Item>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <Item stackedLabel>
                <Label>one</Label>
                <Input keyboardType="numeric" value={content.endone} onChangeText={(text) => { content.endone = text; this.setState({}) }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>two</Label>
                <Input keyboardType="numeric" value={content.endtwo} onChangeText={(text) => { content.endtwo = text; this.setState({}) }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>three</Label>
                <Input keyboardType="numeric" value={content.endthree} onChangeText={(text) => { content.endthree = text; this.setState({}) }} />
              </Item>
            </Col>
          </Grid>
          {this.renderHtmlFooterChecklist(content)}
        </Form>
      )
    }
    if (content.type == 'layout') {
      if (this.state.image) {
        return (
          <Content>
            <Thumbnail square large source={{ uri: this.state.image }} />
            {this.renderHtmlFooterChecklist(content)}
          </Content>
        )
      }
      else {
        return (<Text style={{ padding: 15 }}>No Image Attached </Text>)
      }
    }
    if (content.type == 'layout2') {
      if (this.state.propimage) {
        return (
          <Content>
            <Thumbnail square large source={{ uri: this.state.propimage }} />
            {this.renderHtmlFooterChecklist(content)}
          </Content>
        )
      }
      else {
        return (<Text style={{ padding: 15 }}>No Image Attached </Text>)
      }
    }
    if (content.type == 'Interior Window') {
      return (
        <View>
          <Grid>
            <Col style={{ height: 200 }}>
              <Text>Window Sill</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: BUTTONS.length - 1,
                      title: "Select Material"
                    },
                    buttonIndex => {
                      newData = this.state.data.map(w => {
                        if (w == content) {
                          console.log('window found')
                          if (buttonIndex != BUTTONS.length - 1) {
                            w.sill.M = BUTTONS[buttonIndex]
                          }

                        }
                        return w
                      })
                      this.setState({ data: newData });
                    }
                  )}
              >
                <Text>Material</Text>
              </Button>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.sill.I} onChange={(e) => {
                  newData = this.state.data.map(w => {
                    if (w == content) {
                      console.log('window found')
                      console.log(!e)
                      w.sill.I = !e
                    }
                    return w
                  })
                  this.setState({ data: newData });
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.sill.R = text; this.setState({}) }} />
              </Item>
            </Col>
            <Col style={{ height: 200 }}>
              <Text> Window Sash</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: BUTTONS.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      newData = this.state.data.map(w => {
                        if (w == content) {
                          console.log('window found')
                          if (buttonIndex != BUTTONS.length - 1) {
                            w.sash.M = BUTTONS[buttonIndex]
                          }
                        }
                        return w
                      })
                      this.setState({ data: newData });
                    }
                  )}
              >
                <Text>Material</Text>
              </Button>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.sash.I} onChange={(e) => {
                  newData = this.state.data.map(w => {
                    if (w == content) {
                      console.log('window found')
                      console.log(!e)
                      w.sash.I = !e
                    }
                    return w
                  })
                  this.setState({ data: newData });
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.sash.R = text; this.setState({}) }} />
              </Item>
            </Col>
            <Col style={{ height: 200 }}>
              <Text>Window Frame</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: BUTTONS.length - 1,
                      title: "Material"
                    },
                    buttonIndex => {
                      newData = this.state.data.map(w => {
                        if (w == content) {
                          console.log('window found')
                          if (buttonIndex != BUTTONS.length - 1) {
                            w.frame.M = BUTTONS[buttonIndex]
                          }
                        }
                        return w
                      })
                      this.setState({ data: newData });
                    }
                  )}
              >
                <Text>Material</Text>
              </Button>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                  newData = this.state.data.map(w => {
                    if (w == content) {
                      console.log(!e)
                      w.frame.I = !e
                    }
                    return w
                  })
                  this.setState({ data: newData });
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.frame.R = text; this.setState({}) }} />
              </Item>
            </Col>
          </Grid>
        </View>
      );
    }
  }

  static navigationOptions = {
    title: 'Inspection',
    onTabPress: ({ }) => alert("it's a tap!")
  };

  constructor(props) {
    super(props);
    this.inp1 = React.createRef();
    this.inp2 = React.createRef();
    this.state = {
      jobId: null,
      insSheets: [
        {
          id: 1, name: 'Living Room', type: 'InsSheet', data: [
            {
              id: 1,
              title: "Sheet Details",
              "unit": '',
              "building": ''
            },
            {
              id: 2,
              side: false,
              expanded: 1,
              type: false,
              title: "Exterior Doorway",
              leadsTo: null,
              door: { M: null, I: true, R: null, name: 'Door' },
              frame: { M: null, I: true, R: null, name: 'Door Frame' },
              thresh: { M: null, I: true, R: null, name: 'Threshold' },
              securityDoor: { M: null, I: true, R: null, name: 'Security Door' },
              screenDoor: { M: null, I: true, R: null, name: 'Screen Door' },
            },
            {
              id: 3,
              side: false,
              expanded: 1,
              type: false,
              title: "Interior Doorway",
              leadsTo: null,
              door: { M: null, I: true, R: null, name: 'Door' },
              frame: { M: null, I: true, R: null, name: 'Door Frame' },
              thresh: { M: null, I: true, R: null, name: 'Threshold' },
            },
            {
              id: 4,
              side: false,
              expanded: 1,
              type: false,
              title: "Interior Window",
              leadsTo: null,
              sill: { M: null, I: true, R: null, name: 'Window Sill' },
              sash: { M: null, I: true, R: null, name: 'Window Sash' },
              frame: { M: null, I: true, R: null, name: 'Window Frame' },
              windowScreen: { M: null, I: true, R: null, name: 'Window Screen' },
              valence: { M: null, I: true, R: null, name: 'Valence' },
            },
            {
              id: 5,
              side: false,
              type: false,
              title: "Closet",
              expanded: 1,
              loc: 1,
              door: { M: null, I: true, R: null, name: 'Closet Door' },
              frame: { M: null, I: true, R: null, name: 'Closet Frame' },
              shelf: { M: null, I: true, R: null, name: 'Closet Shelf' },
              support: { M: null, I: true, R: null, name: 'Closet Shelf Support' },
            },
            {
              id: 6,
              side: false,
              type: false,
              title: "Cabinet",
              expanded: 1,
              loc: 2,
              frame: { M: null, I: true, R: null, name: 'Cabinet Frame' },
              door: { M: null, I: true, R: null, name: 'Cabinet Door' },
              shelf: { M: null, I: true, R: null, name: 'Cabinet Shelf' },
              countertop: { M: null, I: true, R: null, name: 'Countertop' },
              backsplash: { M: null, I: true, R: null, name: 'Backsplash' },
              medicine: { M: null, I: true, R: null, name: 'Medicine Cabinet' }
            },
            {
              id: 7,
              type: false,
              expanded: 1,
              loc: 1,
              title: "Interior Walls",
              wallA: { S: 'A', M: null, I: true, R: null, name: 'Wall A', item:'Wall' },
              wallB: { S: 'B', M: null, I: true, R: null, name: 'Wall B', item:'Wall' },
              wallC: { S: 'C', M: null, I: true, R: null, name: 'Wall C', item:'Wall' },
              wallD: { S: 'D', M: null, I: true, R: null, name: 'Wall D', item:'Wall' },
              ceiling: { S: false, M: null, I: true, R: null, name: 'Ceiling' },
              baseboard: { S: false, M: null, I: true, R: null, name: 'Baseboard' },
              vent: { S: false, M: null, I: true, R: null, name: 'Heater Vent' },
              floor: { M: null, I: true, R: null, name: 'Floor' }
            }
          ], total: 0
        }
      ],
      sheets: [{ id: 1 }, { id: 2 }, { id: 3 }],
      data: [
        { id: 0, type: 'details', title: "Job Details" },
        { id: 1, title: "Property Description Checklist", type: "property details" },
        { id: 4, type: 'calibration', title: "Calibration" },
        { id: 5, type: 'layout', title: "Layout Photo" },
        { id: 6, type: 'layout2', title: "Property Photo" }
      ],
      selected: 0,
      isDateTimePickerVisible: false,
      colStatus: false,
      color: 'black',
      au1: false,
      au2: false,
      inputs: {}
    }
    // this.inputRef = this.inputRef.bind(this);

    this._handleRef = this._handleRef.bind(this)
    this.addSheet = this.addSheet.bind(this)
    this.getPhoto = this.getPhoto.bind(this)
    this.getPropertyPhoto = this.getPropertyPhoto.bind(this)
    this.addItemExterior = this.addItemExterior.bind(this)
    this.addItemInterior = this.addItemInterior.bind(this)
    this.addOther = this.addOther.bind(this)
    this.removeWindow = this.removeWindow.bind(this)
    this.removeSheet = this.removeSheet.bind(this)
    this.expandWindow = this.expandWindow.bind(this)
    this.addinsSheet = this.addInsSheet.bind(this)
    this.addextSheet = this.addExtSheet.bind(this)
    this.addSoilSheet = this.addSoilSheet.bind(this)
    this.addDustSheet = this.addDustSheet.bind(this)
    this.addSoilSample = this.addSoilSample.bind(this)
    this.addDustSample = this.addDustSample.bind(this)
    this.addJobCompletionSheet = this.addJobCompletionSheet.bind(this)
    this.addPropertyDetailsSheet = this.addPropertyDetailsSheet.bind(this)
    this.addFormFive = this.addFormFive.bind(this)
    this._renderContent = this._renderContent.bind(this)
    this._renderExtSheet = this._renderExtSheet.bind(this)
    this._renderIntSheet = this._renderIntSheet.bind(this)
    this.renderSoilSheet = this.renderSoilSheet.bind(this)
    this.renderDustSheet = this.renderDustSheet.bind(this)
    this._renderHeader = this._renderHeader.bind(this)
    this._renderWindowHeader = this._renderWindowHeader.bind(this)
    this.jobId = this.jobId.bind(this)
    this._storeData = this._storeData.bind(this)
    this.setName = this.setName.bind(this)
    this.setDate = this.setDate.bind(this)
    this._showStartDateTimePicker = this._showStartDateTimePicker.bind(this)
    this._showEndDateTimePicker = this._showEndDateTimePicker.bind(this)
    this._hideStartDateTimePicker = this._hideStartDateTimePicker.bind(this)
    this._hideEndDateTimePicker = this._hideEndDateTimePicker.bind(this)
    this._handleStartDatePicked = this._handleStartDatePicked.bind(this)
    this._handleEndDatePicked = this._handleEndDatePicked.bind(this)
    this.tempSave = this.tempSave.bind(this)
    this.renderDustSheet = this.renderDustSheet.bind(this)
    this.renderSoilSheet = this.renderSoilSheet.bind(this)
    this.focusTheField = this.focusTheField.bind(this)
    this.focusTheField1 = this.focusTheField1.bind(this)
  }
  componentDidMount() {
    this.setState({ total: this.state.insSheets[0].data.length - 1 });
    this.interval = setInterval(() => this.tempSave(), 25000)
  }
  focusTheField = () => {
    this._passwordInput.focus();
  }
  focusTheField1 = () => {
    this._passwordInput1.focus();
  }

  willBlurSubscription = this.props.navigation.addListener(
  'willBlur',
  payload => {
    if(this.state.jobId){
    this._storeData()
    }
  }
);
  willFocusSubscription = this.props.navigation.addListener(
    'willFocus',
    payload => {
      if (this.props.navigation.state.params && this.props.navigation.state.params.edit[0]) {
        console.log('edit!', this.props.navigation.state.params)
        AsyncStorage.getItem(this.props.navigation.state.params.edit[0]).then(x => {
          let data = JSON.parse(x)
          this.setState(data)
          //AsyncStorage.removeItem(this.props.navigation.state.params.edit[0]);
          this.props.navigation.state.params = null
          // const navigateAction = NavigationActions.setParams({edit:null})
          // this.props.navigation.dispatch(navigateAction);
          console.log('params', this.props.navigation.state.params)
        })
      }else if(this.state.jobId){
        //this.tempSave()
      } else{
        Alert.alert(
          'Message',
          'Please add a Jobid',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
            { text: 'OK', onPress: () => { console.log('Ok Pressed!') } },
          ],
          { cancelable: false }
        )
      }


    }
  );



  _showStartDateTimePicker() { this.setState({ isStartDateTimePickerVisible: true }) };
  _showEndDateTimePicker() { this.setState({ isEndDateTimePickerVisible: true }) };
  _hideStartDateTimePicker() { this.setState({ isStartDateTimePickerVisible: false }) };
  _hideEndDateTimePicker() { this.setState({ isEndDateTimePickerVisible: false }) };

  _handleStartDatePicked(date) {
    console.log('A date has been picked: ', date);
    this.setState({ startCalibrate: date })
    this._hideStartDateTimePicker();
  };

  _handleEndDatePicked(date) {
    console.log('A date has been picked: ', date);
    this.setState({ endCalibrate: date })
    this._hideEndDateTimePicker();
  };

  async tempSave() {
    if(this.state.jobId) {
      console.log('Auto SAVE')
      await AsyncStorage.setItem(this.state.jobId, JSON.stringify(this.state))
    }else{
        Alert.alert(
          'Message',
          'Please add a Jobid',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
            { text: 'OK', onPress: () => { console.log('Ok Pressed!') } },
          ],
          { cancelable: false }
        )
        // alert('');
        //this.setState({ color: 'red' });
    }
  }

  jobId(e) {
    console.log('jobId', e)
  }
  setDate(newDate) {
    this.setState({ date: newDate });
  }
  setName(text, id) {
    console.log('setting name')
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.name = text
      }
    })
    this.setState({})
  }

  addInsSheet() {
    console.log("addsheet!")
    this.setState(prevState => ({
      insSheets: [...prevState.insSheets,
      {
        id: (prevState.insSheets.length + 1),
        type: 'InsSheet',
        data: [
          {
            id: 1,
            title: "Sheet Details",
            "unit": '',
            "building": ''
          },
          {
            id: 2,
            side: false,
            expanded: 1,
            type: false,
            title: "Exterior Doorway",
            leadsTo: null,
            door: { M: null, I: true, R: null, name: 'Door' },
            frame: { M: null, I: true, R: null, name: 'Door Frame' },
            thresh: { M: null, I: true, R: null, name: 'Threshold' },
            securityDoor: { M: null, I: true, R: null, name: 'Security Door' },
            screenDoor: { M: null, I: true, R: null, name: 'Screen Door' },
          },
          {
            id: 3,
            side: false,
            expanded: 1,
            type: false,
            title: "Interior Doorway",
            leadsTo: null,
            door: { M: null, I: true, R: null, name: 'Door' },
            frame: { M: null, I: true, R: null, name: 'Door Frame' },
            thresh: { M: null, I: true, R: null, name: 'Threshold' },
          },
          {
            id: 4,
            side: false,
            type: false,
            title: "Interior Window",
            expanded: true,
            loc: 1,
            sill: { M: null, I: true, R: null, name: 'Window Sill' },
            sash: { M: null, I: true, R: null, name: 'Window Sash' },
            frame: { M: null, I: true, R: null, name: 'Window Frame' },
            windowScreen: { M: null, I: true, R: null, name: 'Window Screen' },
            valence: { M: null, I: true, R: null, name: 'Valence' },
          },
          {
            id: 5,
            side: false,
            type: false,
            title: "Closet",
            loc: 1,
            door: { M: null, I: true, R: null, name: 'Closet Door' },
            frame: { M: null, I: true, R: null, name: 'Closet Frame' },
            shelf: { M: null, I: true, R: null, name: 'Closet Shelf' },
            support: { M: null, I: true, R: null, name: 'Closet Shelf Support' },
          },
          {
            id: 6,
            side: false,
            type: false,
            title: "Cabinet",
            loc: 2,
            frame: { M: null, I: true, R: null, name: 'Cabinet Frame' },
            door: { M: null, I: true, R: null, name: 'Cabinet Door' },
            shelf: { M: null, I: true, R: null, name: 'Cabinet Shelf' },
            countertop: { M: null, I: true, R: null, name: 'Countertop' },
            backsplash: { M: null, I: true, R: null, name: 'Backsplash' },
            medicine: { M: null, I: true, R: null, name: 'Medicine Cabinet' }
          },
          {
            id: 7,
            type: false,
            loc: 1,
            title: "Interior Walls",
            wallA: { S: 'A', M: null, I: true, R: null, name: 'Wall A', item:'Wall' },
            wallB: { S: 'B', M: null, I: true, R: null, name: 'Wall B', item:'Wall' },
            wallC: { S: 'C', M: null, I: true, R: null, name: 'Wall C', item:'Wall' },
            wallD: { S: 'D', M: null, I: true, R: null, name: 'Wall D', item:'Wall' },
            ceiling: { S: false, M: null, I: true, R: null, name: 'Ceiling' },
            baseboard: { S: false, M: null, I: true, R: null, name: 'Baseboard' },
            vent: { S: false, M: null, I: true, R: null, name: 'Heater Vent' },
            floor: { M: null, I: true, R: null, name: 'Floor' }
          }],
        index: 1
      }]
    }))
    //  this.setState({au1:true});
    //this.inp1.current.focus();
  }

  addExtSheet() {
    this.setState(prevState => ({
      insSheets: [...prevState.insSheets,
      {
        id: (prevState.insSheets.length + 1),
        type: 'ExtSheet',
        name: 'Perimeter',
        data: [
          {
            id: 1,
            title: "Exterior Sheet Details",
            unit: '',
            building: '',
            side: false,
            direction: false
          },
          {
            id: 2,
            side: false,
            expanded: 0,
            type: false,
            title: "Exterior Doorway",
            leadsTo: null,
            door: { M: null, I: true, R: null, name: 'Door' },
            frame: { M: null, I: true, R: null, name: 'Frame' },
            thresh: { M: null, I: true, R: null, name: 'Threshold' },
            securitydoor: { M: null, I: true, R: null, name: 'Security Door' },
            screendoor: { M: null, I: true, R: null, name: 'Screen Door' },
          },
          {
            id: 3,
            side: false,
            expanded: 1,
            type: false,
            title: "Exterior Windows",
            leadsTo: null,
            well: { M: null, I: true, R: null, name: 'Window Well' },
            sash: { M: null, I: true, R: null, name: 'Window Sash' },
            frame: { M: null, I: true, R: null, name: 'Window Frame' },
            shutters: { M: null, I: true, R: null, name: 'Shutters' },
            securitybars: { M: null, I: true, R: null, name: 'Security Bars' },
            awning: { M: null, I: true, R: null, name: 'Awning' },
            windowScreen: { M: null, I: true, R: null, name: 'Window Screen' }
          },
          {
            id: 4,
            side: false,
            expanded: 1,
            type: false,
            title: "Exterior Walls",
            leadsTo: null,
            wallA: { S: false, M: null, I: true, R: null, name: 'Wall' },
            wallB: { S: false, M: null, I: true, R: null, name: 'Wall' },
            wallC: { S: false, M: null, I: true, R: null, name: 'Wall' },
            wallD: { S: false, M: null, I: true, R: null, name: 'Wall' },
          }, {
            id: 5,
            side: false,
            expanded: 1,
            type: false,
            title: "Roof Trim",
            leadsTo: null,
            eaves: { M: null, I: true, R: null, name: 'Eaves' },
            rafters: { M: null, I: true, R: null, name: 'Rafters' },
            fascia: { M: null, I: true, R: null, name: 'Fascia' },
            soffit: { M: null, I: true, R: null, name: 'Soffit' },
            gutter: { M: null, I: true, R: null, name: 'Gutter' },
            downspout: { M: null, I: true, R: null, name: 'Downspout' },
            corbel: { M: null, I: true, R: null, name: 'Corbel' },
            roofSup: { M: null, I: true, R: null, name: 'Roof Support' },
          },
          {
            id: 6,
            side: false,
            expanded: 1,
            type: false,
            title: "Garage Doors",
            leadsTo: null,
            door: { M: null, I: true, R: null, name: 'Door' },
            doorframe: { M: null, I: true, R: null, name: 'Door Frame' },
          }],
        total: null
      }]
    }))
    //this.inp2.current.focus();
  }

  getPhoto() {
    console.log('add photo')
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    })
      .then(result => {
        if (!result.cancelled) {
          console.log(result)
          this.setState({
            image: result.uri,
          });
        };
      });
  }
  getPropertyPhoto() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    })
      .then(result => {
        if (!result.cancelled) {
          console.log(result)
          this.setState({
            propimage: result.uri,
          });
        };
      });
  }
  addSoilSheet() {
    console.log("add SoilSheet!")
    this.setState(prevState => ({
      insSheets: [...prevState.insSheets,
      {
        id: (prevState.insSheets.length + 1),
        type: 'SoilSheet',
        data: [{
          id: 1,
          type: 'detail',
          title: 'Soil Sample Details',
          numCollected: null,
          numSubmitted: null,
          turnAround: null,
          submittedBy: null,
          relenquishedBy: null,
          relenquisheddate: null,
          recievedBy: null,
          recieveddate: null,

        },
        {
          id: 2,
          type: 'sample',
          title: "SS 1",
          area: null,
          subSamples: null,
          surface: null
        }],
        total: null
      }]
    }))
    //console.log(this.state)
  }
  addDustSheet() {
    console.log("add DustSheet!")
    this.setState(prevState => ({
      insSheets: [...prevState.insSheets,
      {
        id: (prevState.insSheets.length + 1),
        type: 'DustSheet',
        data: [{
          id: 1,
          type: 'detail',
          title: 'Dust Sample Details',
          numCollected: null,
          numSubmitted: null,
          turnAround: null,
          submittedBy: null,
          relenquishedBy: null,
          relenquisheddate: null,
          recievedBy: null,
          recieveddate: null,

        },
        {
          id: 2,
          type: 'sample',
          title: "DS 1",
          room: null,
          subSamples: null,
          surface: null
        }],
        total: null
      }]
    }))
    //console.log(this.state)
  }

  addSoilSample(id) {
    console.log("addSoilSample", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          type: 'sample',
          title: "SS " + x.data.length,
          area: null,
          length: null,
          width: null,
          subSamples: null,
          surface: null
        }],
          x.total = x.data.length - 1
      }
    })
    this.setState({})
  }

  addDustSample(id) {
    console.log("addDustSample", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          type: 'sample',
          legnth: null,
          width: null,
          title: "DS " + x.data.length,
          room: null,
          subSamples: null,
          surface: null
        }],
          x.total = x.data.length - 1
      }
    })
    this.setState({})
  }

  /**
   * extfunction
   * Code start for exterior sheet at 6-2-2019
   */
  addItemExterior(id, name) {
    console.log(id, name)
    if (name == 'Exterior Doorway') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Exterior Doorway",
            leadsTo: null,
            door: { M: null, I: true, R: null, name: 'Door' },
            frame: { M: null, I: true, R: null, name: 'Frame' },
            thresh: { M: null, I: true, R: null, name: 'Threshold' },
            securitydoor: { M: null, I: true, R: null, name: 'Security Door' },
            screendoor: { M: null, I: true, R: null, name: 'Screen Door' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Exterior Windows') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Exterior Windows",
            leadsTo: null,
            well: { M: null, I: true, R: null, name: 'Window Well' },
            sash: { M: null, I: true, R: null, name: 'Window Sash' },
            frame: { M: null, I: true, R: null, name: 'Window Frame' },
            shutters: { M: null, I: true, R: null, name: 'Shutters' },
            securitybars: { M: null, I: true, R: null, name: 'Security Bars' },
            awning: { M: null, I: true, R: null, name: 'Awning' },
            windowScreen: { M: null, I: true, R: null, name: 'Window Screen' }
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Parking Lot') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Parking Lot",
            leadsTo: null,
            bollard: { M: null, I: true, R: null, name: 'Bollard' },
            parkingStripe: { M: null, I: true, R: null, name: 'Parking Stripe' },
            parkingStop: { M: null, I: true, R: null, name: 'Parking Stop' },
            curb: { M: null, I: true, R: null, name: 'Curb' },
            lightPost: { M: null, I: true, R: null, name: 'Light Post' },
            speedBump: { M: null, I: true, R: null, name: 'Speed Bump' },
            fireHydrant: { M: null, I: true, R: null, name: 'Fire Hydrant' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Exterior Walls') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Exterior Walls",
            leadsTo: null,
            wallA: { S: false, M: null, I: true, R: null, name: 'Wall', item:'Wall'  },
            wallB: { S: false, M: null, I: true, R: null, name: 'Wall', item:'Wall'  },
            wallC: { S: false, M: null, I: true, R: null, name: 'Wall', item:'Wall'  },
            wallD: { S: false, M: null, I: true, R: null, name: 'Wall', item:'Wall'  },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Garage Walls') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Garage Walls",
            leadsTo: null,
            wallA: { S: 'A', M: null, I: true, R: null, name: 'A - Wall', item:'Wall' },
            wallB: { S: 'B', M: null, I: true, R: null, name: 'B - Wall', item:'Wall' },
            wallC: { S: 'C', M: null, I: true, R: null, name: 'C - Wall', item:'Wall' },
            wallD: { S: 'D', M: null, I: true, R: null, name: 'D - Wall', item:'Wall' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Other Item') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Other Item",
            leadsTo: null,
            other: { M: null, I: true, R: null, name: 'other', item:'other' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Roof Trim') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Roof Trim",
            leadsTo: null,
            eaves: { M: null, I: true, R: null, name: 'Eaves' },
            rafters: { M: null, I: true, R: null, name: 'Rafters' },
            fascia: { M: null, I: true, R: null, name: 'Fascia' },
            soffit: { M: null, I: true, R: null, name: 'Soffit' },
            gutter: { M: null, I: true, R: null, name: 'Gutter' },
            downspout: { M: null, I: true, R: null, name: 'Downspout' },
            corbel: { M: null, I: true, R: null, name: 'Corbel' },
            roofSup: { M: null, I: true, R: null, name: 'Roof Support' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Porch') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Porch",
            leadsTo: null,
            column: { M: null, I: true, R: null, S: null, name: 'Column' },
            beam: { M: null, I: true, R: null, S: null, name: 'Beam' },
            ceiling: { M: null, I: true, R: null, S: null, name: 'Ceiling' },
            floor: { M: null, I: true, R: null, S: null, name: 'Floor' },
            handrail: { M: null, I: true, R: null, S: null, name: 'Handrail' },
            railing: { M: null, I: true, R: null, S: null, name: 'Railing' },
            railcap: { M: null, I: true, R: null, S: null, name: 'Railcap' },
            mailSlot: { M: null, I: true, R: null,S: null, name: 'Mailslot' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Exterior Trim') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Exterior Trim",
            leadsTo: null,
            cBoard: { M: null, I: true, R: null, name: 'Corner Boards' },
            trim: { M: null, I: true, R: null, name: 'Trim' },
            hTrim: { M: null, I: true, R: null, name: 'Horizontal Trim' },
            vTrim: { M: null, I: true, R: null, name: 'Vertical Trim' },
            mDoor: { M: null, I: true, R: null, name: 'Milk Door' },
            shelf: { M: null, I: true, R: null, name: 'Shelf' },
            shelfSupport: { M: null, I: true, R: null, name: 'Shelf Support' },
            support: { M: null, I: true, R: null, name: 'Support' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Stairs') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Stairs",
            leadsTo: null,
            tread: { M: null, I: true, R: null, name: 'Tread' },
            riser: { M: null, I: true, R: null, name: 'Riser' },
            deck: { M: null, I: true, R: null, name: 'Deck' },
            handrail: { M: null, I: true, R: null, name: 'Handrail' },
            railing: { M: null, I: true, R: null, name: 'Railing' },
            stringer: { M: null, I: true, R: null, name: 'Stringer' },
            newel: { M: null, I: true, R: null, name: 'Newel' },
            baluster: { M: null, I: true, R: null, name: 'Baluster' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Garage Doors') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Garage Doors",
            leadsTo: null,
            door: { M: null, I: true, R: null, name: 'Garage Door' },
            doorframe: { M: null, I: true, R: null, name: 'Garage Door Frame' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Misc Exterior') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Misc Exterior",
            leadsTo: null,
            frame: { M: null, I: true, R: null, name: 'Electric Panel/Frame' },
            vent: { M: null, I: true, R: null, name: 'Heater Vent' },
            accessPanel: { M: null, I: true, R: null, name: 'Access Panel/Frame' },
            gate: { M: null, I: true, R: null, name: 'Gate' },
            fence: { M: null, I: true, R: null, name: 'Fence' },
            playEquip: { M: null, I: true, R: null, name: 'Playground Equipment' },
            planterBox: { M: null, I: true, R: null, name: 'Planter Box' },
            equipment: { M: null, I: true, R: null, name: 'Equipment' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }

    if (name == 'Closet') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            type: false,
            title: "Closet",
            door: { M: null, I: true, R: null, name: 'Closet Door' },
            frame: { M: null, I: true, R: null, name: 'Closet Frame' },
            shelf: { M: null, I: true, R: null, name: 'Closet Shelf' },
            support: { M: null, I: true, R: null, name: 'Closet Shelf Support' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Cabinet') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            type: false,
            title: "Cabinet",
            frame: { M: null, I: true, R: null, name: 'Cabinet Frame' },
            door: { M: null, I: true, R: null, name: 'Cabinet Door' },
            shelf: { M: null, I: true, R: null, name: 'Cabinet Shelf' },
            countertop: { M: null, I: true, R: null, name: 'Countertop' },
            backsplash: { M: null, I: true, R: null, name: 'Backsplash' },
            medicine: { M: null, I: true, R: null, name: 'Medicine Cabinet' }
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Interior Trim') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: 'no global side',
            expanded: 1,
            type: false,
            title: "Interior Trim",
            loc: '2',
            cModling: { S: null, M: null, I: true, R: null, name: 'Crown Modling' },
            horizontal: { S: null, M: null, I: true, R: null, name: 'Horizontal' },
            vertical: { S: null, M: null, I: true, R: null, name: 'Vertical' },
            picture: { S: null, M: null, I: true, R: null, name: 'Picture Rail' },
            plate: { S: null, M: null, I: true, R: null, name: 'Plate Rail' },
            corner: { S: null, M: null, I: true, R: null, name: 'Corner' }
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Tile') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            type: false,
            title: "Tile",
            shower: { S: null, M: null, I: true, R: null, name: 'Shower' },
            wall: { S: null, M: null, I: true, R: null, name: 'Wall' },
            curb: { S: null, M: null, I: true, R: null, name: 'Curb' },
            ceiling: { S: null, M: null, I: true, R: null, name: 'Ceiling' },
            floor: { S: null, M: null, I: true, R: null, name: 'Floor' },
            backsplash: { S: null, M: null, I: true, R: null, name: 'Backsplash' },
            trim: { S: null, M: null, I: true, R: null, name: 'Trim' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Fireplace') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Fireplace",
            leadsTo: null,
            mantle: { M: null, I: true, R: null, name: 'Mantle' },
            hearth: { M: null, I: true, R: null, name: 'Hearth' },
            fireplace: { M: null, I: true, R: null, name: 'Fireplace' },
            chimney: { M: null, I: true, R: null, name: 'Chimney' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
  }

  //intfunction
  //////////////Interior
  addItemInterior(id, name) {
    if (name == 'Porch') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Porch",
            leadsTo: null,
            column: { M: null, I: true, R: null, S: null, name: 'Column' },
            beam: { M: null, I: true, R: null, S: null, name: 'Beam' },
            ceiling: { M: null, I: true, R: null, S: null, name: 'Ceiling' },
            floor: { M: null, I: true, R: null, S: null, name: 'Floor' },
            handrail: { M: null, I: true, R: null, S: null, name: 'Handrail' },
            railing: { M: null, I: true, R: null, S: null, name: 'Railing' },
            railcap: { M: null, I: true, R: null, S: null, name: 'Railcap' },
            mailSlot: { M: null, I: true, R: null, S: null, name: 'Mailslot' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Exterior Windows') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Exterior Windows",
            leadsTo: null,
            well: { M: null, I: true, R: null, name: 'Window Well' },
            sash: { M: null, I: true, R: null, name: 'Window Sash' },
            frame: { M: null, I: true, R: null, name: 'Window Frame' },
            shutters: { M: null, I: true, R: null, name: 'Shutters' },
            securitybars: { M: null, I: true, R: null, name: 'Security Bars' },
            awning: { M: null, I: true, R: null, name: 'Awning' },
            windowScreen: { M: null, I: true, R: null, name: 'Window Screen' }
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Exterior Trim') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Exterior Trim",
            leadsTo: null,
            cBoard: { M: null, I: true, R: null, name: 'Corner Boards' },
            trim: { M: null, I: true, R: null, name: 'Trim' },
            hTrim: { M: null, I: true, R: null, name: 'Horizontal Trim' },
            vTrim: { M: null, I: true, R: null, name: 'Vertical Trim' },
            mDoor: { M: null, I: true, R: null, name: 'Milk Door' },
            shelf: { M: null, I: true, R: null, name: 'Shelf' },
            shelfSupport: { M: null, I: true, R: null, name: 'Shelf Support' },
            support: { M: null, I: true, R: null, name: 'Support' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Parking Lot') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Parking Lot",
            leadsTo: null,
            bollard: { M: null, I: true, R: null, S: null, name: 'Bollard' },
            parkingStripe: { M: null, I: true, R: null, S: null, name: 'Parking Stripe' },
            parkingStop: { M: null, I: true, R: null, S: null, name: 'Parking Stop' },
            curb: { M: null, I: true, R: null, S: null, name: 'Curb' },
            lightPost: { M: null, I: true, R: null, S: null, name: 'Light Post' },
            speedBump: { M: null, I: true, R: null, S: null, name: 'Speed Bump' },
            fireHydrant: { M: null, I: true, R: null, S: null, name: 'Fire Hydrant' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Garage Doors') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Garage Doors",
            leadsTo: null,
            door: { M: null, I: true, R: null, name: 'Garage Door' },
            doorframe: { M: null, I: true, R: null, name: 'Garage Door Frame' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Interior Roof Trim') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Interior Roof Trim",
            leadsTo: null,
            eaves: { M: null, I: true, R: null, name: 'Eaves' },
            rafters: { M: null, I: true, R: null, name: 'Rafters' },
            fascia: { M: null, I: true, R: null, name: 'Fascia' },
            soffit: { M: null, I: true, R: null, name: 'Soffit' },
            gutter: { M: null, I: true, R: null, name: 'Gutter' },
            downspout: { M: null, I: true, R: null, name: 'Downspout' },
            corbel: { M: null, I: true, R: null, name: 'Corbel' },
            roofSup: { M: null, I: true, R: null, name: 'Roof Support' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    // if (name == 'Stairs') {
    //   let newData = this.state.insSheets.map(x => {
    //     if (x.id == id) {
    //       x.data = [...x.data, {
    //         id: x.data.length + 1,
    //         side: false,
    //         expanded: 1,
    //         type: false,
    //         title: "Stairs",
    //         loc: 1,
    //         leadsTo: null,
    //         tread: { M: null, I: true, R: null },
    //         riser: { M: null, I: true, R: null },
    //         deck: { M: null, I: true, R: null },
    //         handrail: { M: null, I: true, R: null },
    //         railing: { M: null, I: true, R: null },
    //         stringer: { M: null, I: true, R: null },
    //         newel: { M: null, I: true, R: null },
    //         baluster: { M: null, I: true, R: null },
    //
    //       }],
    //         x.total = x.data.length - 1
    //     }
    //   })
    //   this.setState({})
    //
    if (name == 'Roof Trim') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            loc: 1,
            type: false,
            title: "Roof Trim",
            leadsTo: null,
            eaves: { M: null, I: true, R: null, name: 'Eaves' },
            rafters: { M: null, I: true, R: null, name: 'Rafters' },
            fascia: { M: null, I: true, R: null, name: 'Fascia' },
            soffit: { M: null, I: true, R: null, name: 'Soffit' },
            gutter: { M: null, I: true, R: null, name: 'Gutter' },
            downspout: { M: null, I: true, R: null, name: 'Downspout' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Misc Exterior') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Misc Exterior",
            leadsTo: null,
            frame: { M: null, I: true, R: null, S: null, name: 'Electric Panel/Frame' },
            vent: { M: null, I: true, R: null, S: null, name: 'Heater Vent' },
            accessPanel: { M: null, I: true, R: null, S: null, name: 'Access Panel/Frame' },
            gate: { M: null, I: true, R: null, S: null, name: 'Gate' },
            fence: { M: null, I: true, R: null, S: null, name: 'Fence' },
            playEquip: { M: null, I: true, R: null, S: null, name: 'Playground Equipment' },
            planterBox: { M: null, I: true, R: null, S: null, name: 'Planter Box' },
            equipment: { M: null, I: true, R: null, S: null, name: 'Equipment' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Interior Window') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            type: false,
            title: "Interior Window",
            expanded: true,
            loc: 1,
            sill: { M: null, I: true, R: null, name: 'Window Sill' },
            sash: { M: null, I: true, R: null, name: 'Window Sash' },
            frame: { M: null, I: true, R: null, name: 'Window Frame' },
            windowScreen: { M: null, I: true, R: null, name: 'Window Screen' },
            valence: { M: null, I: true, R: null, name: 'Valence' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({ insSheets: this.state.insSheets });
    }
    if (name == 'Interior Doorway') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Interior Doorway",
            leadsTo: null,
            door: { M: null, I: true, R: null, name: 'Door' },
            frame: { M: null, I: true, R: null, name: 'Door Frame' },
            thresh: { M: null, I: true, R: null, name: 'Threshold' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Exterior Doorway') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: 'ExtDoor',
            title: "Exterior Doorway",
            leadsTo: null,
            door: { M: null, I: true, R: null, name: 'Door' },
            frame: { M: null, I: true, R: null, name: 'Frame' },
            thresh: { M: null, I: true, R: null, name: 'Threshold' },
            securityDoor: { M: null, I: true, R: null, name: 'Security Door' },
            screenDoor: { M: null, I: true, R: null, name: 'Screen Door' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Interior Walls') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            type: false,
            title: "Interior Walls",
            wallA: { S: 'A', M: null, I: true, R: null, name: 'Wall A' , item:'Wall'},
            wallB: { S: 'B', M: null, I: true, R: null, name: 'Wall B' , item:'Wall'},
            wallC: { S: 'C', M: null, I: true, R: null, name: 'Wall C' , item:'Wall'},
            wallD: { S: 'D', M: null, I: true, R: null, name: 'Wall D' , item:'Wall'},
            ceiling: { S: false, M: null, I: true, R: null, name: 'Ceiling' },
            baseboard: { S: false, M: null, I: true, R: null, name: 'Baseboard' },
            floor: { S: false, M: null, I: true, R: null, name: 'Floor' },
            vent: { S: false, M: null, I: true, R: null, name: 'Heater Vent' }
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Closet') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            type: false,
            title: "Closet",
            door: { M: null, I: true, R: null, name: 'Closet Door' },
            frame: { M: null, I: true, R: null, name: 'Closet Frame' },
            shelf: { M: null, I: true, R: null, name: 'Closet Shelf' },
            support: { M: null, I: true, R: null, name: 'Closet Shelf Support' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Cabinet') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            type: false,
            title: "Cabinet",
            frame: { M: null, I: true, R: null, name: 'Cabinet Frame' },
            door: { M: null, I: true, R: null, name: 'Cabinet Door' },
            shelf: { M: null, I: true, R: null, name: 'Cabinet Shelf' },
            countertop: { M: null, I: true, R: null, name: 'Countertop' },
            backsplash: { M: null, I: true, R: null, name: 'Backsplash' },
            medicine: { M: null, I: true, R: null, name: 'Medicine Cabinet' }
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Interior Trim') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Interior Trim",
            cModling: { M: null, I: true, R: null, name: 'Crown Modling' },
            horizontal: { M: null, I: true, R: null, name: 'Horizontal Trim' },
            vertical: { M: null, I: true, R: null, name: 'Vertical Trim' },
            picture: { M: null, I: true, R: null, name: 'Picture Rail' },
            plate: { M: null, I: true, R: null, name: 'Plate Rail' },
            chain: { M: null, I: true, R: null, name: 'Chain Rail' },
            trim: { M: null, I: true, R: null, name: 'Trim' },
            frame: { M: null, I: true, R: null, name: 'Frame' }
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Other Item') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Other Item",
            leadsTo: null,
            other: { S: null, M: null, I: true, R: null, name: 'Other Item' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Misc Interior') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Misc Interior",
            leadsTo: null,
            baseboard: { S: null, M: null, I: true, R: null, name: 'Baseboard' },
            ceiling: { S: null, M: null, I: true, R: null, name: 'Ceiling' },
            vent: { S: null, M: null, I: true, R: null, name: 'Heater Vent' },
            floor: { S: null, M: null, I: true, R: null, name: 'Floor' },
            atticFrame: { S: null, M: null, I: true, R: null, name: 'Attic Access/Frame' },
            electricFrame: { S: null, M: null, I: true, R: null, name: 'Electric Panel/Frame' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Fireplace') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            expanded: 1,
            type: false,
            title: "Fireplace",
            leadsTo: null,
            mantle: { M: null, I: true, R: null, name: 'Mantle' },
            hearth: { M: null, I: true, R: null, name: 'Hearth' },
            fireplace: { M: null, I: true, R: null, name: 'Fireplace' },
            chimney: { M: null, I: true, R: null, name: 'Chimney' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Stairs') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            type: false,
            title: "Stairs",
            tread: { M: null, I: true, R: null, name: 'Tread' },
            riser: { M: null, I: true, R: null, name: 'Riser' },
            deck: { M: null, I: true, R: null, name: 'Deck' },
            stringer: { M: null, I: true, R: null, name: 'Stringer' },
            handrail: { M: null, I: true, R: null, name: 'Handrail' },
            railing: { M: null, I: true, R: null, name: 'Railing' },
            newel: { M: null, I: true, R: null, name: 'Newel Ppost' },
            baluster: { M: null, I: true, R: null, name: 'Baluster' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    if (name == 'Tile') {
      let newData = this.state.insSheets.map(x => {
        if (x.id == id) {
          x.data = [...x.data, {
            id: x.data.length + 1,
            side: false,
            type: false,
            title: "Tile",
            shower: { M: null, I: true, R: null, name: 'Shower' },
            wall: { M: null, I: true, R: null, name: 'Wall', item:'Wall'},
            curb: { M: null, I: true, R: null, name: 'Curb' },
            ceiling: { M: null, I: true, R: null, name: 'Ceiling' },
            floor: { M: null, I: true, R: null, name: 'Floor' },
            backsplash: { M: null, I: true, R: null, name: 'Backsplash' },
            trim: { M: null, I: true, R: null, name: 'Trim' },
          }],
            x.total = x.data.length - 1
        }
      })
      this.setState({})
    }
    // if (name == 'Other Item') {
    //   let newData = this.state.insSheets.map(x => {
    //     if (x.id == id) {
    //       x.data = [...x.data, {
    //         id: x.data.length + 1,
    //         side: false,
    //         title: "Other Item",
    //         M: null,
    //         I: true,
    //         R: null,
    //         comments: null
    //       }],
    //         x.total = x.data.length - 1
    //     }
    //   })
    //   this.setState({})
    // }
  }



  addOther(id) {
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          title: "Other",
          M: null,
          I: true,
          R: null,
        }],
          x.total = x.data.length - 1
      }
    })
    this.setState({})

  }




  addEaves(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: false,
          title: "Eaves",
          M: null,
          I: true,
          R: 0,
        }],
          x.total = x.data.length - 1
      }
    })
    this.setState({})
    //this._sheetInput._root.focus();
  }

  removeSheet(sheetId) {
    this.state.insSheets = this.state.insSheets.filter(x => {
      console.log("remove sheet", x.id, sheetId);
      console.log(x.id != sheetId)
      return x.id != sheetId
    })
    this.setState({})
  }

  removeWindow(sheetId, id) {
    console.log("remove", sheetId, id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == sheetId) {
        x.data = x.data.filter(i => {
          if (i.id != id) {
            console.log('return')
            return i
          }
        }),
          x.total = null
      }
    })
    this.setState({})

  }
  expandWindow() {
    let len = this.state.insSheets[0].data;
    console.log(parseInt(len) - 1);
    return parseInt(len) - 1;
  }
  addSheet() {
    this.setState(prevState => ({
      data: [...prevState.data,
      {
        id: (prevState.data.length + 1),
        type: 'Interior Window',
        side: false,
        type: false,
        title: "Interior Window ",
        sill: { M: null, I: false, R: null },
        sash: { M: null, I: false, R: null },
        frame: { M: null, I: false, R: null }
      }]
    }))
  }
  addJobCompletionSheet() {
    console.log('Job Completion')
    this.setState(prevState => ({
      data: [...prevState.data,
      {
        id: (prevState.data.length + 1),
        title: "Job Completion Checklist ",
        type: "job completion"
      }]
    }))
  }
  addPropertyDetailsSheet() {
    console.log('Property details')
    this.setState(prevState => ({
      data: [...prevState.data,
      {
        id: (prevState.data.length + 1),
        title: "Property Description Checklist",
        type: "property details"
      }]
    }))
  }
  addFormFive() {
    this.setState(prevState => ({
      data: [...prevState.data,
      {
        id: (prevState.data.length + 1),
        title: "Form 5.0",
        type: "5.0"
      }]
    }))
  }

  _storeData = async () => {
    if (this.state.jobId) {
      try {

            Alert.alert(
              'Saving.....',
              '',
              [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
                { text: 'OK', onPress: () => { console.log('ok Pressed!') } },
              ],
              { cancelable: true }
            )
        //console.log(this.state)
        //await AsyncStorage.removeItem('Temp Save')
        await AsyncStorage.setItem(this.state.jobId, JSON.stringify(this.state)).then(res => {
          Alert.alert(
            'Saved',
            'Job Saved Successfully',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
              { text: 'OK', onPress: () => { console.log('ok Pressed!') } },
            ],
            { cancelable: false }
          )
          this.setState({
            jobId: '0',
            insSheets: [
              {
                id: 1, name: 'Living Room', type: 'InsSheet', data: [
                  {
                    id: 1,
                    title: "Sheet Details",
                    "unit": '',
                    "building": ''
                  },
                  {
                    id: 2,
                    side: false,
                    expanded: 1,
                    type: false,
                    title: "Exterior Doorway",
                    leadsTo: null,
                    door: { M: null, I: true, R: null, name: 'Door' },
                    frame: { M: null, I: true, R: null, name: 'Door Frame' },
                    thresh: { M: null, I: true, R: null, name: 'Threshold' },
                    securityDoor: { M: null, I: true, R: null, name: 'Security Door' },
                    screenDoor: { M: null, I: true, R: null, name: 'Screen Door' },
                  },
                  {
                    id: 3,
                    side: false,
                    expanded: 1,
                    type: false,
                    title: "Interior Doorway",
                    leadsTo: null,
                    door: { M: null, I: true, R: null, name: 'Door' },
                    frame: { M: null, I: true, R: null, name: 'Door Frame' },
                    thresh: { M: null, I: true, R: null, name: 'Threshold' },
                  },
                  {
                    id: 4,
                    side: false,
                    type: false,
                    title: "Interior Window",
                    expanded: true,
                    loc: 1,
                    sill: { M: null, I: true, R: null, name: 'Window Sill' },
                    sash: { M: null, I: true, R: null, name: 'Window Sash' },
                    frame: { M: null, I: true, R: null, name: 'Window Frame' },
                    windowScreen: { M: null, I: true, R: null, name: 'Window Screen' },
                    valence: { M: null, I: true, R: null, name: 'Valence' },
                  },
                  {
                    id: 5,
                    side: false,
                    type: false,
                    title: "Closet",
                    loc: 1,
                    door: { M: null, I: true, R: null, name: 'Closet Door' },
                    frame: { M: null, I: true, R: null, name: 'Closet Frame' },
                    shelf: { M: null, I: true, R: null, name: 'Closet Shelf' },
                    support: { M: null, I: true, R: null, name: 'Closet Shelf Support' },
                  },
                  {
                    id: 6,
                    side: false,
                    type: false,
                    title: "Cabinet",
                    loc: 2,
                    frame: { M: null, I: true, R: null, name: 'Cabinet Frame' },
                    door: { M: null, I: true, R: null, name: 'Cabinet Door' },
                    shelf: { M: null, I: true, R: null, name: 'Cabinet Shelf' },
                    countertop: { M: null, I: true, R: null, name: 'Countertop' },
                    backsplash: { M: null, I: true, R: null, name: 'Backsplash' },
                    medicine: { M: null, I: true, R: null, name: 'Medicine Cabinet' }
                  },
                  {
                    id: 7,
                    type: false,
                    loc: 1,
                    title: "Interior Walls",
                    wallA: { S: 'A', M: null, I: true, R: null, name: 'Wall A', item:'Wall' },
                    wallB: { S: 'B', M: null, I: true, R: null, name: 'Wall B', item:'Wall' },
                    wallC: { S: 'C', M: null, I: true, R: null, name: 'Wall C', item:'Wall' },
                    wallD: { S: 'D', M: null, I: true, R: null, name: 'Wall D', item:'Wall' },
                    ceiling: { S: false, M: null, I: true, R: null, name: 'Ceiling' },
                    baseboard: { S: false, M: null, I: true, R: null, name: 'Baseboard' },
                    vent: { S: false, M: null, I: true, R: null, name: 'Heater Vent' },
                    floor: { M: null, I: true, R: null, name: 'Floor' }
                  }
                ], total: 0
              },
            ],
            sheets: [{ id: 1 }, { id: 2 }, { id: 3 }],
            data: [
              { id: 0, title: "Property Description Checklist", type: "property details" },
              { id: 1, type: 'calibration', title: "Calibration" },
              { id: 2, type: 'layout', title: "Layout Photo" },
              { id: 3, type: 'layout2', title: "Property Photo" }
            ],
            image: '',
            propimage: '',
            colStatus: false
          })
        });
      } catch (error) {
        Alert.alert(
          'Error saving',
          error,
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
            { text: 'OK', onPress: () => { console.log('Cancel Pressed!') } },
          ],
          { cancelable: false }
        )
      }
    }
    else {
      Alert.alert(
        'Message',
        'Please add a Jobid',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed!') },
          { text: 'OK', onPress: () => { this._usernameInput._root.focus() } },
        ],
        { cancelable: false }
      )
      // alert('');
      this.setState({ color: 'red' });
    }
  }
  _handleRef(c) {
    this._input = c;
  }

  handleScroll(event) {
    //this.setState({ scrollOffsetY: Math.round(event.nativeEvent.contentOffset.y) });
  }
  render() {
    //_.set(this.refs, 'Content._scrollview.resetCoords', { x: 0, y: this.state.scrollY });
    return (
      <InputScrollView>
        <View>
          <Item listBorderColor="red">
            <Input keyboardType="numeric" inputColorPlaceholder='red' placeholder='JobId' value={this.state.jobId} onChangeText={(text) => { this.setState({ jobId: text, color: 'black' }) }} ref={c => this._usernameInput = c} />
            <Icon name='close-circle' style={{ color: this.state.color }} />
          </Item>
        </View>
        <ScrollView
          ref={ref => this.listView = ref}
          keyboardShouldPersistTaps={'handled'}
          keyboardDismissMode="interactive"
        >
          <KeyboardAvoidingView enabled>
            {this.state.insSheets.map(x => {
              if (x.type == 'InsSheet') {
                return <View style={{ padding: 10, paddingBottom: 15 }} key={x.id + 'view'}>
                  <Item key={x.id + 'item'} >
                    <Input key={x.id + 'pp'} ref={this.inp1} value={x.name} onChangeText={(text) => this.setName(text, x.id)} placeholder="Interior Inspection Sheet" />
                  </Item><KeyboardAvoidingView enabled><InsSheet data={x.data}
                    removeWindow={this.removeWindow} total={x.total}
                    addItemInterior={this.addItemInterior}
                    focusNextField={this.focusNextField}
                    renderWindowHeader={this._renderWindowHeader} renderSheet={this._renderIntSheet} name={x.name}
                    setName={this.setName} inputRef={this._handleRef} id={x.id} key={x.id} sheet /></KeyboardAvoidingView>
                </View>
              }
              if (x.type == 'ExtSheet') {
                return <View style={{ padding: 10, paddingBottom: 15 }} key={x.id + 'view'}>
                  <Item key={x.id + 'item'} >
                    <Input key={x.id + 'pp'} ref={this.inp2} value={x.name} onChangeText={(text) => this.setName(text, x.id)} placeholder="Exterior Inspection Sheet" />
                  </Item><ExtSheet data={x.data} addItemExterior={this.addItemExterior} total={x.total}
                    focusNextField={this.focusNextField}
                    renderWindowHeader={this._renderWindowHeader}
                    renderSheet={this._renderExtSheet} name={x.name} setName={this.setName} inputRef={this._handleRef} id={x.id} key={x.id} sheet />
                </View>
              }
              if (x.type == 'SoilSheet') {
                return <SoilSheet data={x.data}
                  removeWindow={this.removeWindow} total={x.total}
                  id={x.id} addSoilSample={this.addSoilSample} renderWindowHeader={this._renderWindowHeader} renderSoilSheet={this.renderSoilSheet} key={x.id} />
              }
              if (x.type == 'DustSheet') {
                return <DustSheet data={x.data}
                  removeWindow={this.removeWindow} total={x.total}
                  id={x.id} addDustSample={this.addDustSample} renderWindowHeader={this._renderWindowHeader} renderDustSheet={this.renderDustSheet} key={x.id} />
              }
            })}
          </KeyboardAvoidingView>

          <View style={{ paddingTop: 10 }}>
            <Text>Checklists</Text>
          </View>
          <Accordion dataArray={this.state.data} expanded={this.state.colStatus} renderHeader={this._renderHeader} renderContent={this._renderContent} />
          <ScrollView enableAutoAutomaticScroll={false} keyboardShouldPersistTaps={'handled'}>
            <Button block style={{ marginTop: 30 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: sheetButons,
                    cancelButtonIndex: 6,
                    title: "Add Sheet/Photo"
                  },
                  buttonIndex => {
                    if (buttonIndex == 0) { this.addInsSheet() }
                    if (buttonIndex == 1) { this.addExtSheet() }
                    if (buttonIndex == 2) { this.addSoilSheet() }
                    if (buttonIndex == 3) { this.addDustSheet() }
                    if (buttonIndex == 4) { this.getPhoto() }
                    if (buttonIndex == 5) { this.getPropertyPhoto() }
                  }
                )}
            >
              <Text>Add Sheet/Photo</Text>
            </Button>
            <Button block success style={{ marginTop: 10 }} onPress={this._storeData}>
              <Text>Save</Text>
            </Button>
          </ScrollView>
        </ScrollView>
      </InputScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
