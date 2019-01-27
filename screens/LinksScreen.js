import React, { Component } from 'react';
import { NavigationEvents, NavigationActions } from 'react-navigation';
import { WebBrowser, Permissions } from 'expo';
import { DocumentPicker, ImagePicker } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';


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
import { Input, Label, Icon, Container, Header, Content, Accordion, ListItem, CheckBox, Body, Text, Button, ActionSheet, Item, Form, Thumbnail, DatePicker, RefreshControl } from "native-base";
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
const SURFACES = ['Non Play Area', 'Play Area', 'Cancel'];
const TYPES = ["Aluminum", "Double Hung", "Casement", "Louvered", "Fixed", "Horiz Slider", "Transom", "Vinyl", "Bay", "Garden", "Cancel"];
const SIDES = ["A", "B", "C", "D", "Cancel"];
const sheetButons = ["Inspection Sheet", "Soil Sample", "Dust Sample", "Job Completion Checklist", "Property Description Checklist", "Form 5.0", "Layout Photo", "Property Photo", 'Cancel'];
const itemButons = ['Window', 'Common Window', 'Doorway', 'Closet', 'Cabinet', 'Wall', 'Baseboard', 'Heater Vent', 'Ceiling', 'Floor', 'Eaves', 'Rafters', 'Fascia', 'Soffit', 'Garage Door', 'Garage Door Frame', 'Column',
  'Beam', 'Ceiling', 'Gutter', 'Downspout', 'Utility Box', 'Vent', 'Access Panel', 'Other', 'Cancel'];
const CANCEL_INDEX = 14;
const CANCEL_INDEX2 = 8;


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
              cancelButtonIndex: 25,
              title: "Add Item"
            },
            buttonIndex => {
              if (buttonIndex == 0) {
                props.addWindow(props.id)
              }
              if (buttonIndex == 1) {
                props.addCommonWindow(props.id)
              }
              if (buttonIndex == 2) {
                props.addDoorway(props.id)
              }
              if (buttonIndex == 3) {
                props.addCloset(props.id)
              }
              if (buttonIndex == 4) {
                props.addCabinet(props.id)
              }
              if (buttonIndex == 5) {
                props.addWall(props.id)
              }
              if (buttonIndex == 6) {
                props.addBaseboard(props.id)
              }
              if (buttonIndex == 7) {
                props.addHeaterVent(props.id)
              }
              if (buttonIndex == 8) {
                props.addCeiling(props.id)
              }
              if (buttonIndex == 9) {
                props.addFloor(props.id)
              }
              if (buttonIndex == 10) {
                props.addEaves(props.id)
              }
              if (buttonIndex == 11) {
                props.addRafters(props.id)
              }
              if (buttonIndex == 12) {
                props.addFascia(props.id)
              }
              if (buttonIndex == 13) {
                props.addSoffit(props.id)
              }
              if (buttonIndex == 14) {
                props.addgd(props.id)
              }
              if (buttonIndex == 15) {
                props.addgdf(props.id)
              }
              if (buttonIndex == 16) {
                props.addColumn(props.id)
              }
              if (buttonIndex == 17) {
                props.addBeam(props.id)
              }
              if (buttonIndex == 18) {
                props.addCeiling(props.id)
              }
              if (buttonIndex == 19) {
                props.addGutter(props.id)
              }
              if (buttonIndex == 20) {
                props.addDownspout(props.id)
              }
              if (buttonIndex == 21) {
                props.addeub(props.id)
              }
              if (buttonIndex == 22) {
                props.addVent(props.id)
              }
              if (buttonIndex == 23) {
                props.addAccessPanel(props.id)
              }
            }
          )}
      >
        <Text>Add Item</Text>
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
      <Accordion dataArray={props.data} expanded={false} renderHeader={props.renderWindowHeader} renderContent={props.renderSoilSheet} />
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
      <Accordion dataArray={props.data} expanded={false} renderHeader={props.renderWindowHeader} renderContent={props.renderDustSheet} />
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
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }
  renderHtmlFooter(sheetId, content) {
    return (
      <Grid>
        <Col>
          <Button block success style={{ marginTop: 10, marginBottom: 10, marginRight: 10 }} onPress={() => {
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
              'Remove Window',
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
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }

  _renderSheet(content, sheetId) {
    // console.log('rendersheet', content)
    // console.log(this.state.insSheets)
    if (content.title == 'Window') {
      return (
        <View>
          <Grid style={{ marginTop: 0 }}>
            <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>Side</Text>
              </Button>
            </Col>
            <Col>
              <Button block error style={{ marginTop: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: TYPES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.windowType = TYPES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>{content.windowType || 'Type'}</Text>
              </Button>
            </Col>
          </Grid>
          <Grid style={{ marginTop: 10 }}>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Sill</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: content.sill.M || "Select Material"
                    },
                    buttonIndex => {
                      content.sill.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.sill.M || "Material"}</Text>
              </Button>
              <Text >{content.sill.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.sill.I} onChange={(e) => {
                  content.sill.I = !content.sill.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.sill.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#FFFFFF', height: 180 }}>
              <Text>Sash</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.sash.M = BUTTONS[buttonIndex]
                      this.setState({})
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
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.sash.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Frame</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.frame.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.frame.M || "Material"}</Text>
              </Button>
              <Text >{content.frame.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                  content.frame.I = !content.frame.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.frame.R = text }} />
              </Item>
            </Col>
          </Grid>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text }} />
          </Item>
          <Grid>
            <Col>
              <Button block success style={{ marginTop: 10, marginBottom: 10, marginRight: 10 }} onPress={() => {
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
                    x.total = false
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
                  'Remove Window',
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
        </View>
      );
    }
    if (content.title == 'Doorway') {
      return (
        <View>
          <Grid style={{ marginTop: 0 }}>
            <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>Side</Text>
              </Button>
            </Col>
            <Col>
              <Button block error style={{ marginTop: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: TYPES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.doorType = TYPES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>{content.doorType || 'Type'}</Text>
              </Button>
            </Col>
          </Grid>

          <Grid style={{ marginTop: 10 }}>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Door</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: content.door.M || "Select Material"
                    },
                    buttonIndex => {
                      content.door.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.door.M || "Material"}</Text>
              </Button>
              <Text >{content.door.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                  content.door.I = !content.door.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.door.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#FFFFFF', height: 180 }}>
              <Text>Door Frame</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.frame.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.frame.M || "Material"}</Text>
              </Button>
              <Text >{content.frame.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                  content.frame.I = !content.frame.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.frame.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Threshold</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.thresh.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.thresh.M || "Material"}</Text>
              </Button>
              <Text >{content.thresh.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.thresh.I} onChange={(e) => {
                  content.thresh.I = !content.thresh.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.thresh.R = text }} />
              </Item>
            </Col>
          </Grid>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text }} />
          </Item>

          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
    if (content.title == 'Closet') {
      return (
        <View>
          <Button block error style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: TYPES,
                  cancelButtonIndex: 10,
                  title: "Select Side"
                },
                buttonIndex => {
                  content.type = TYPES[buttonIndex]
                  this.setState({})
                }
              )}>
            <Text>Type</Text>
          </Button>
          <Grid style={{ marginTop: 10 }}>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Door</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: content.door.M || "Select Material"
                    },
                    buttonIndex => {
                      content.door.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.door.M || "Material"}</Text>
              </Button>
              <Text >{content.door.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                  content.door.I = !content.door.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.door.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Frame</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.frame.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.frame.M || "Material"}</Text>
              </Button>
              <Text >{content.frame.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                  content.frame.I = !content.frame.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.frame.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Shelf</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.shelf.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.shelf.M || "Material"}</Text>
              </Button>
              <Text >{content.shelf.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.shelf.I} onChange={(e) => {
                  content.shelf.I = !content.shelf.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.shelf.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Support</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.support.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.support.M || "Material"}</Text>
              </Button>
              <Text >{content.support.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.support.I} onChange={(e) => {
                  content.support.I = !content.support.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.support.R = text }} />
              </Item>
            </Col>
          </Grid>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
    if (content.title == 'Common Window') {
      return (
        <View>
          <Button block error style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: TYPES,
                  cancelButtonIndex: 10,
                  title: "Select Side"
                },
                buttonIndex => {
                  content.type = TYPES[buttonIndex]
                  this.setState({})
                }
              )}>
            <Text>Type</Text>
          </Button>
          <Grid style={{ marginTop: 10 }}>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Well</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: content.well.M || "Select Material"
                    },
                    buttonIndex => {
                      content.well.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.well.M || "Material"}</Text>
              </Button>
              <Text >{content.well.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.well.I} onChange={(e) => {
                  content.well.I = !content.well.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.well.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Sash</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.sash.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.sash.M || "Material"}</Text>
              </Button>
              <Text >{content.sash.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.sash.I} onChange={(e) => {
                  content.sash.I = !content.sash.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.sash.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Frame</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.frame.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.frame.M || "Material"}</Text>
              </Button>
              <Text >{content.frame.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                  content.frame.I = !content.frame.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.frame.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Shutters</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.shutters.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.shutters.M || "Material"}</Text>
              </Button>
              <Text >{content.shutters.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.shutters.I} onChange={(e) => {
                  content.shutters.I = !content.shutters.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.shutters.R = text }} />
              </Item>
            </Col>
          </Grid>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
    if (content.title == 'Wall') {
      return (
        <View>
          <Button block error style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: SIDES,
                  cancelButtonIndex: 10,
                  title: "Select Side"
                },
                buttonIndex => {
                  content.side = SIDES[buttonIndex]
                  this.setState({})
                }
              )}>
            <Text>Side</Text>
          </Button>
          <Button
            style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: content.M || "Select Material"
                },
                buttonIndex => {
                  content.M = BUTTONS[buttonIndex]
                  this.setState({})
                }
              )}
          >
            <Text>{content.M || "Material"}</Text>
          </Button>
          <Text >{content.I==true?'Intact':'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
              content.I = !content.I
              this.setState({})
            }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Reading</Label>
            <Input keyboardType="numeric" onChangeText={(text) => { content.R = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }

    if (content.title == 'Baseboard') {
      return (
        <View>
          <Grid style={{ marginTop: 0 }}>
            <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>Side</Text>
              </Button>
            </Col>
            <Col>
              <Button block error style={{ marginTop: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: TYPES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.type = TYPES[buttonIndex]
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
                  cancelButtonIndex: CANCEL_INDEX,
                  title: content.M || "Select Material"
                },
                buttonIndex => {
                  content.M = BUTTONS[buttonIndex]
                  this.setState({})
                }
              )}
          >
            <Text>{content.M || "Material"}</Text>
          </Button>
          <Text >{content.I==true?'Intact':'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
              content.I = !content.I
              this.setState({})
            }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Reading</Label>
            <Input keyboardType="numeric" onChangeText={(text) => { content.R = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
    if (content.title == 'Heater Vent') {
      return (
        <View>
          <Grid style={{ marginTop: 0 }}>
            <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>Side</Text>
              </Button>
            </Col>
            <Col>
              <Button block error style={{ marginTop: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: TYPES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.type = TYPES[buttonIndex]
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
                  cancelButtonIndex: CANCEL_INDEX,
                  title: content.M || "Select Material"
                },
                buttonIndex => {
                  content.M = BUTTONS[buttonIndex]
                  this.setState({})
                }
              )}
          >
            <Text>{content.M || "Material"}</Text>
          </Button>
          <Text >{content.I==true?'Intact':'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
              content.I = !content.I
              this.setState({})
            }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Reading</Label>
            <Input keyboardType="numeric" onChangeText={(text) => { content.R = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
    if (content.title == 'Ceiling') {
      return (
        <View>
          <Button block error style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: TYPES,
                  cancelButtonIndex: 10,
                  title: "Select Side"
                },
                buttonIndex => {
                  content.type = TYPES[buttonIndex]
                  this.setState({})
                }
              )}>
            <Text>Type</Text>
          </Button>
          <Button
            style={{ marginTop: 10 }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: content.M || "Select Material"
                },
                buttonIndex => {
                  content.M = BUTTONS[buttonIndex]
                  this.setState({})
                }
              )}
          >
            <Text>{content.M || "Material"}</Text>
          </Button>
          <Text >{content.I==true?'Intact':'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
              content.I = !content.I
              this.setState({})
            }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Reading</Label>
            <Input keyboardType="numeric" onChangeText={(text) => { content.R = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
    if (content.title == 'Floor') {
      return (
        <View>
          <Grid style={{ marginTop: 0 }}>
            <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>Side</Text>
              </Button>
            </Col>
            <Col>
              <Button block error style={{ marginTop: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: TYPES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.type = TYPES[buttonIndex]
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
                  cancelButtonIndex: CANCEL_INDEX,
                  title: content.M || "Select Material"
                },
                buttonIndex => {
                  content.M = BUTTONS[buttonIndex]
                  this.setState({})
                }
              )}
          >
            <Text>{content.M || "Material"}</Text>
          </Button>
          <Text >{content.I==true?'Intact':'Deteriorated'}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
              content.I = !content.I
              this.setState({})
            }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Reading</Label>
            <Input keyboardType="numeric" onChangeText={(text) => { content.R = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
    if (content.title == 'Eaves' || 'Rafters' || 'Fascia' || 'Soffit' || 'Garage Door' || 'Garage Door Frame') {
      return (
        <View>
          <Grid style={{ marginTop: 0 }}>
            <Col>
              <Button block error style={{ marginTop: 10, marginRight: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: SIDES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.side = SIDES[buttonIndex]
                      this.setState({})
                    }
                  )}>
                <Text>Side</Text>
              </Button>
            </Col>
            <Col>
              <Button block error style={{ marginTop: 10 }}
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: TYPES,
                      cancelButtonIndex: 10,
                      title: "Select Side"
                    },
                    buttonIndex => {
                      content.type = TYPES[buttonIndex]
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
                  cancelButtonIndex: CANCEL_INDEX,
                  title: content.M || "Select Material"
                },
                buttonIndex => {
                  content.M = BUTTONS[buttonIndex]
                  this.setState({})
                }
              )}
          >
            <Text>{content.M || "Material"}</Text>
          </Button>
          <Text >{content.I==true?'Intact':'Deteriorated'}{content.I}</Text>
          <ListItem>
            <RkChoice rkType='posNeg' selected={content.I} onChange={(e) => {
              content.I = !content.I
              this.setState({})
            }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Reading</Label>
            <Input keyboardType="numeric" onChangeText={(text) => { content.R = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Comments</Label>
            <Input value={content.comments} onChangeText={(text) => { content.comments = text }} />
          </Item>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }

    if (content.title == 'Cabinet') {
      return (
        <View>

          <Grid style={{ marginTop: 10 }}>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Frame</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: content.frame.M || "Select Material"
                    },
                    buttonIndex => {
                      content.frame.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.frame.M || "Material"}</Text>
              </Button>
              <Text >{content.frame.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.frame.I} onChange={(e) => {
                  content.frame.I = !content.frame.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.frame.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Door</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.door.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.door.M || "Material"}</Text>
              </Button>
              <Text >{content.door.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.door.I} onChange={(e) => {
                  content.door.I = !content.door.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.door.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Shelf</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.shelf.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.shelf.M || "Material"}</Text>
              </Button>
              <Text >{content.shelf.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.shelf.I} onChange={(e) => {
                  content.shelf.I = !content.shelf.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.shelf.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Counter</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      content.countertop.M = BUTTONS[buttonIndex]
                      this.setState({})
                    }
                  )}
              >
                <Text>{content.countertop.M || "Material"}</Text>
              </Button>
              <Text >{content.countertop.I==true?'Intact':'Deteriorated'}</Text>
              <ListItem>
                <RkChoice rkType='posNeg' selected={content.countertop.I} onChange={(e) => {
                  content.countertop.I = !content.countertop.I
                  this.setState({})
                }} />
              </ListItem>
              <Item>
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.countertop.R = text }} />
              </Item>
            </Col>
          </Grid>
          {this.renderHtmlFooter(sheetId, content)}
        </View>
      )
    }
  }

  renderSoilSheet(content) {
    if (content.type == 'detail') {
      return (
        <ScrollView>
          <Item stackedLabel>
            <Label>No. of Samples Collected</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>No. of Samples Submitted</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Submitted By</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Turn Around</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Text>Relenquished By</Text>
            <Label>Name</Label>
            <Input />
            <Label>Date</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Text>Recieved By</Text>
            <Label>Name</Label>
            <Input />
            <Label>Date</Label>
            <Input />
          </Item>
        </ScrollView>
      )
    }
    if (content.type == 'sample') {
      return (
        <View>
          <Item stackedLabel last>
            <Label>Area</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Number of Subsamples</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SURFACES,
                    cancelButtonIndex: 2,
                    title: "Surface Type"
                  },
                  buttonIndex => {
                    console.log(buttonIndex)
                  }
                )}
            >
              <Text>Surface Type</Text>
            </Button>
          </Item>

        </View>
      )
    }
  }

  renderDustSheet(content) {
    if (content.type == 'detail') {
      return (
        <Form>
          <Item stackedLabel>
            <Label>No. of Samples Collected</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>No. of Samples Submitted</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Submitted By</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Turn Around</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Text>Relenquished By</Text>
            <Label>Name</Label>
            <Input />
            <Label>Date</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Text>Recieved By</Text>
            <Label>Name</Label>
            <Input />
            <Label>Date</Label>
            <Input />
          </Item>
        </Form>
      )
    }
    if (content.type == 'sample') {
      return (
        <View>
          <Item stackedLabel last>
            <Label>Room</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Label>Number of Subsamples</Label>
            <Input />
          </Item>
          <Item stackedLabel last>
            <Button
              onPress={() =>
                ActionSheet.show(
                  {
                    options: SURFACES,
                    cancelButtonIndex: 2,
                    title: "Surface Type"
                  },
                  buttonIndex => {
                    console.log(buttonIndex)
                  }
                )}
            >
              <Text>Surface Type</Text>
            </Button>
          </Item>

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
            <Label>Type of dwelling</Label>
            <Input value={content.dwelling} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Retail Center', 'Commercial Structure', 'Apartment Complex', 'Condo', 'Duplex', 'Mobile home', 'Single Family Home', 'Other', 'Cancel'],
                  cancelButtonIndex: 8,
                  title: "Type of Dwelling"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.dwelling = 'Retail Center'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.dwelling = 'Commercial Structure'
                    this.setState({})
                  }
                  if (buttonIndex == 2) {
                    content.dwelling = 'Apartment Complex'
                    this.setState({})
                  }
                  if (buttonIndex == 3) {
                    content.dwelling = 'Condo'
                    this.setState({})
                  }
                  if (buttonIndex == 4) {
                    content.dwelling = 'Duplex'
                    this.setState({})
                  }
                  if (buttonIndex == 5) {
                    content.dwelling = 'Mobile home'
                    this.setState({})
                  }
                  if (buttonIndex == 6) {
                    content.dwelling = 'Single Family Home'
                    this.setState({})
                  }
                  if (buttonIndex == 7) {
                    content.dwelling = this.value
                    this.setState({})

                  }
                }
              )}
              onChangeText={(e) => {
                content.dwelling = e
                this.setState({})
              }}
            />
          </Item>
          <Item stackedLabel>
            <Label>Year built</Label>
            <Input keyboardType="numeric" value={content.year} onChangeText={(text) => { content.year = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Build On/Over</Label>
            <Input value={content.builtover} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['basement', 'hillside', 'parking garage', 'raised foundation', 'Other', 'Cacel'],
                  cancelButtonIndex: 10,
                  title: "Build on/over"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.builtover = 'basement'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.builtover = 'hillside'
                    this.setState({})
                  }
                  if (buttonIndex == 2) {
                    content.builtover = 'parking garage'
                    this.setState({})
                  }
                  if (buttonIndex == 3) {
                    content.builtover = 'raised foundation'
                    this.setState({})
                  }
                  if (buttonIndex == 4) {
                    content.builtover = this.value
                    this.setState({})
                  }
                }
              )}
              onChangeText={(e) => {
                content.builtover = e
                this.setState({})
              }}
            />
          </Item>
          <Item stackedLabel>
            <Label>Exterior</Label>
            <Input value={content.exterior} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Brick', 'Stucco', 'Transite-Asbestos', 'Wood Shingles', 'Wood Siding', 'Other', 'Cancel'],
                  cancelButtonIndex: 6,
                  title: "Exterior"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.exterior = 'Brick'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.exterior = 'Stucco'
                    this.setState({})
                  }
                  if (buttonIndex == 2) {
                    content.exterior = 'Transite-Asbestos'
                    this.setState({})
                  }
                  if (buttonIndex == 3) {
                    content.exterior = 'Wood Shingles'
                    this.setState({})
                  }
                  if (buttonIndex == 4) {
                    content.exterior = this.value
                    this.setState({})
                  }
                }
              )}
              onChangeText={(e) => {
                content.exterior = e
                this.setState({})
              }}
            />
          </Item>
          <Item stackedLabel>
            <Label>COD Payment type</Label>
            <Input value={content.payment} onFocus={() =>
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
              )}
            />
          </Item>
          <Item stackedLabel>
            <Label>Number of units</Label>
            <Input value={content.units} onChangeText={(text) => { content.units = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of units tested</Label>
            <Input value={content.tested} onChangeText={(text) => { content.tested = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of buildings</Label>
            <Input value={content.buildings} onChangeText={(text) => { content.buildings = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of stories</Label>
            <Input value={content.stories} onChangeText={(text) => { content.stories = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of laundry facilities</Label>
            <Input value={content.laundry} onChangeText={(text) => { content.laundry = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of garages</Label>
            <Input value={content.garages} onChangeText={(text) => { content.garages = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Units acessed via</Label>
            <Input value={content.acess} onFocus={() =>
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
              )}
              onChangeText={(e) => {
                content.exterior = e
                this.setState({})
              }}
            />
          </Item>
          <Item stackedLabel>
            <Label>XRF Serial</Label>
            <Input value={content.serial} onChangeText={(text) => { content.serial = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Overall Paint Condition</Label>
            <Input value={content.paint} onFocus={() =>
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
              )}
            />
          </Item>
          <Text style={{ fontWeight: 'bold' }}>Types of windows</Text>
          <ListItem>
            <Text>Aluminum Framed</Text>
            <RkChoice rkType='posNeg' onChange={(e) => { content.framed = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Casement</Text>
            <RkChoice rkType='posNeg' onChange={(e) => { content.casement = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Double Hung Sash</Text>
            <RkChoice rkType='posNeg' onChange={(e) => { content.dblhung = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Fixed</Text>
            <RkChoice rkType='posNeg' onChange={(e) => { content.fixed = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Horizontal Sliding</Text>
            <RkChoice rkType='posNeg' onChange={(e) => { content.horz = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Louvered</Text>
            <RkChoice rkType='posNeg' onChange={(e) => { content.louvered = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Transom</Text>
            <RkChoice rkType='posNeg' onChange={(e) => { content.transom = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Vinyl</Text>
            <RkChoice rkType='posNeg' onChange={(e) => { content.vinyl = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Bay Window</Text>
            <RkChoice rkType='posNeg' onChange={(e) => { content.bay = !e; this.setState({}) }} />
          </ListItem>
          <ListItem>
            <Text>Garden Window</Text>
            <RkChoice rkType='posNeg' onChange={(e) => { content.garden = !e; this.setState({}) }} />
          </ListItem>
          <Item stackedLabel>
            <Label>Garage</Label>
            <Input value={content.garage} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['None', 'Attached', 'Detached', 'Cancel'],
                  cancelButtonIndex: 4,
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
              )}
            />
          </Item>
          <Item stackedLabel>
            <Label>List areas not accessable</Label>
            <Input value={content.noaccess} onChangeText={(text) => { content.noaccess = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of Stories in building</Label>
            <Input keyboardType="numeric" value={content.buildingstories} onChangeText={(text) => { content.buildingstories = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of Stories in unit</Label>
            <Input keyboardType="numeric" value={content.unitstories} onChangeText={(text) => { content.unitstories = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of Beds</Label>
            <Input keyboardType="numeric" value={content.bednums} onChangeText={(text) => { content.bednums = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of Baths</Label>
            <Input keyboardType="numeric" value={content.bathnums} onChangeText={(text) => { content.bathnums = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of dust</Label>
            <Input keyboardType="numeric" value={content.dustnums} onChangeText={(text) => { content.dustnums = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Number of soil</Label>
            <Input keyboardType="numeric" value={content.soilnums} onChangeText={(text) => { content.soilnums = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Do children live in the home?</Label>
            <Input value={content.garage} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yed', 'No', 'Don\'t know', 'Cancel'],
                  cancelButtonIndex: 4,
                  title: "Garage"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.garage = 'Yed'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.garage = 'No'
                    this.setState({})
                  }
                  if (buttonIndex == 2) {
                    content.garage = 'Don\'t know'
                    this.setState({})
                  }
                }
              )}
            />
          </Item>
          {this.renderHtmlFooterChecklist(content)}
        </View>
      );
    }

    if (content.type == 'job completion') {
      return (
        <View>
          <Grid>
            <Col style={{ backgroundColor: '#FFF' }}>
              <Text>Calibrated XRF</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>Tested reqired interiors</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>Tested reqired exteriors</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>Tested reqired commons</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>paint chip/soil sample if neccessary</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>Drew site map</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>Photographed cover shot and appropriate components</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
            </Col>
            <Col>
              <Text>Photographed cover shot and appropriate components</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>Labled disk with job number and address</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>Complete property description</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>reviewed all data pages</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>Return all paperwork to office</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>Pick up additional paperwork</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
              <Text>Have a nice day</Text>
              <ListItem>
                <RkChoice rkType='posNeg' onChange={(e) => { }} />
              </ListItem>
            </Col>
          </Grid>
        </View>
      );
    }
    if (content.type == '5.0') {
      return (
        <Form>
          <Item stackedLabel>
            <Label>Apt Number</Label>
            <Input keyboardType="numeric" value={content.aptnum} onChangeText={(text) => { content.aptnum = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Unit is</Label>
            <Input value={content.occupied} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Owner occupied', 'Renter Occupied', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Unit is"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.occupied = 'Owner occupied'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.occupied = 'Renter Occupied'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>Year of constructon</Label>
            <Input keyboardType="numeric" value={content.year} onChangeText={(text) => { content.year = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Prior LBP Testing?</Label>
            <Input value={content.priortesting} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.priortesting = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.priortesting = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>Name of owner interviewed</Label>
            <Input value={content.ownername} onChangeText={(text) => { content.ownername = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Owner Interview Date</Label>
            <DatePicker
              defaultDate={content.ownInterviewDate}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              format="MM/DD/YYYY"
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(newdate) => { content.ownInterviewDate = newdate }}
            />
          </Item>
          <Item stackedLabel>
            <Label>Name of resident interviewed</Label>
            <Input value={content.residentname} onChangeText={(text) => { content.residentname = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Interview date</Label>
            <DatePicker
              defaultDate={content.resInterviewDate}
              locale={"en"}
              dateFormat="MM/DD/YYYY"
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(newdate) => { content.resInterviewDate = newdate }}
            />
          </Item>
          <Item stackedLabel>
            <Label>Name of risk Assessor</Label>
            <Input value={content.assessor} onChangeText={(text) => { content.assessor = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Do any children live in the home or visit frequently?</Label>
            <Input value={content.childrenVisit} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.childrenVisit = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.childrenVisit = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If so how many?</Label>
            <Input keyboardType="numeric" value={content.childnum} onChangeText={(text) => { content.childnum = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Do and children tend to chew on any painted surfaces such as interior window sills</Label>
            <Input value={content.chew} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.chew = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.chew = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If yes where? </Label>
            <Input value={content.whereChew} onChangeText={(text) => { content.whereChew = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Do women of child bearing age live in the home</Label>
            <Input value={content.womenAge} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.womenAge = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.womenAge = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If this home is in a building with the other dwelling units, what comon areas are used by children</Label>
            <Input value={content.commmon} onChangeText={(text) => { content.common = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Which entrance is used most frequently</Label>
            <Input value={content.entrance} onChangeText={(text) => { content.entrance = text }} />
          </Item>
          <Item stackedLabel>
            <Label>What other entrances are used frequently</Label>
            <Input value={content.otherentrance} onChangeText={(text) => { content.otherentrance = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Which windows are opened most frequently</Label>
            <Input value={content.windows} onChangeText={(text) => { content.windows = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Do you use window air-conditioners</Label>
            <Input value={content.airCondition} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.airCondition = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.airCondition = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If so where?</Label>
            <Input value={content.whereCondition} onChangeText={(text) => { content.whereCondition = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Do you or any household members garden</Label>
            <Input value={content.doYouGarden} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.doYouGarden = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.doYouGarden = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If yes, Where is the garden</Label>
            <Input value={content.garden} onChangeText={(text) => { content.garden = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Are you planning any landscaping that will remove grass or ground covering</Label>
            <Input value={content.landscapingq} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.landscapingq = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.landscapingq = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If yes, where</Label>
            <Input value={content.whereLandscaping} onChangeText={(text) => { content.whereLandscaping = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Which areas of the home get cleaned regularly</Label>
            <Input value={content.cleaned} onChangeText={(text) => { content.cleaned = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Which areas of the home  are not cleaned regularly</Label>
            <Input value={content.notcleaned} onChangeText={(text) => { content.notcleaned = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Are there any household members exposed to lead at work</Label>
            <Input value={content.exposure} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.exposure = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.exposure = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If yes, are dirty work clothes brought home</Label>
            <Input value={content.dirtyClothes} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.dirtyClothes = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.dirtyClothes = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If they are brought home, who handles dirty cloths and where are they placed and cleaned</Label>
            <Input value={content.handle} onChangeText={(text) => { content.handle = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Do you have pets </Label>
            <Input value={content.pets} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.pets = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.pets = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If yes, Do the pets go outdoors</Label>
            <Input value={content.petsOutdoors} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.petsOutdoors = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.petsOutdoors = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>Any Building renovations or repainting done here during the past year</Label>
            <Input value={content.renovations} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.renovations = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.renovations = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If yes, what work was done, and when</Label>
            <Input value={content.whatWhenWork} onChangeText={(text) => { content.whatWhenWork = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Were Carpets, furniture and/or family belongings present in the work area</Label>
            <Input value={content.itemsPresent} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.itemsPresent = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.itemsPresent = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If yes, which items and where were they</Label>
            <Input value={content.whereItems} onChangeText={(text) => { content.whereItems = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Was Construction debris stored in the yard</Label>
            <Input value={content.stored} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.stored = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.stored = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If yes, please describe what where and how it was stored</Label>
            <Input value={content.howStored} onChangeText={(text) => { content.howStored = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Are you conducting or planning any building renovations</Label>
            <Input value={content.ownerRenovations} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.ownerRenovations = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.ownerRenovations = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>If yes, what work will be done and when</Label>
            <Input value={content.whenwork} onChangeText={(text) => { content.whenwork = text }} />
          </Item>
          {this.renderHtmlFooterChecklist(content)}
        </Form>
      )
    }
    if (content.type == '5.1') {
      return (
        <Form>
          <Item stackedLabel>
            <Label>Apt Number</Label>
            <Input keyboardType="numeric" value={content.aptnum} onChangeText={(text) => { content.aptnum = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Name of property owner</Label>
            <Input value={content.ownername} onChangeText={(text) => { content.ownername = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Name of Risk Assessor</Label>
            <Input value={content.assessorname} onChangeText={(text) => { content.assessorname = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Date of assessment</Label>
            <DatePicker
              defaultDate={content.assInterviewDate}
              locale={"en"}
              dateFormat="MM/DD/YYYY"
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={(newdate) => { content.assInterviewDate = newdate }}
            />
          </Item>
          <Text>Condition</Text>
          <Item stackedLabel>
            <Label>Roof missing parts or surfaces (tiles, boards, shakes etc)</Label>
            <Input value={content.roof} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.roof = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.roof = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.roofcomments} onChangeText={(text) => { content.roofcomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Roof has holes or cracks</Label>
            <Input value={content.cracks} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.cracks = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.cracks = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.crackcomments} onChangeText={(text) => { content.crackcomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Gutters or downspouts broken</Label>
            <Input value={content.gutters} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.gutters = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.gutters = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.gutterscomments} onChangeText={(text) => { content.gutterscomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Chimney masonry cracked, bricks loose or missing, obviously out of plumb</Label>
            <Input value={content.masony} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.masony = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.masony = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.masonrycomments} onChangeText={(text) => { content.masonrycomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Extirior or interior walls have obvious large cracks or holes, requiring more than routine painting</Label>
            <Input value={content.walls} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.walls = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.walls = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.wallscomments} onChangeText={(text) => { content.wallscomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>extirior sides have missing boards or shingles</Label>
            <Input value={content.sides} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.sides = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.sides = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.sidescomments} onChangeText={(text) => { content.sidescomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Water stains on interior walls or ceilings</Label>
            <Input value={content.water} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.water = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.water = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.watercomments} onChangeText={(text) => { content.watercomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Walls or ceilings deteriorated</Label>
            <Input value={content.deteriorated} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.deteriorated = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.deteriorated = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.deterioratedcomments} onChangeText={(text) => { content.deterioratedcomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>More than very small amount of paint deteriorated on a room</Label>
            <Input value={content.paint} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.paint = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.paint = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.paintcomments} onChangeText={(text) => { content.paintcomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Two or windows or doors broken, missing or boarded up</Label>
            <Input value={content.broken} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.broken = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.broken = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.brokencomments} onChangeText={(text) => { content.brokencomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Porch or steps have major elements broken, missing, or boarded up</Label>
            <Input value={content.porch} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.porch = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.porch = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.porchcomments} onChangeText={(text) => { content.porchcomments = text }} />
          </Item>
          <Item stackedLabel>
            <Label>Foundation has major cracks, missing material, structure leans or visibly unsound</Label>
            <Input value={content.foundation} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Yes', 'No', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Yes or no"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.foundation = 'Yes'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.foundation = 'No'
                    this.setState({})
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>comments</Label>
            <Input value={content.foundationcomments} onChangeText={(text) => { content.foundationcomments = text }} />
          </Item>
          {this.renderHtmlFooterChecklist(content)}
        </Form>
      )
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
              defaultDate={new Date()}
              locale={"en"}
              dateFormat="MM/DD/YYYY"
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "black" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
            />
          </Item>
          <Item stackedLabel>
            <Label>Limited or Comprehensive</Label>
            <Input value={content.lorc} onFocus={() =>
              ActionSheet.show(
                {
                  options: ['Limited', 'Comprehensive', 'Cancel'],
                  cancelButtonIndex: 3,
                  title: "Select Level"
                },
                buttonIndex => {
                  if (buttonIndex == 0) {
                    content.lorc = 'Limited'
                    this.setState({})
                  }
                  if (buttonIndex == 1) {
                    content.lorc = 'Comprehensive'
                  }
                }
              )} />
          </Item>
          <Item stackedLabel>
            <Label>Action Level</Label>
            <Input keyboardType="numeric" value={content.actionlevel} onChangeText={(text) => { content.actionlevel = text }} />
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
            <Input keyboardType="numeric" />
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
                <Input keyboardType="numeric" onChangeText={(text) => { content.startone = text }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>two</Label>
                <Input keyboardType="numeric" onChangeText={(text) => { content.starttwo = text }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>three</Label>
                <Input keyboardType="numeric" onChangeText={(text) => { content.startthree = text }} />
              </Item>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <Item stackedLabel>
                <Label>four</Label>
                <Input keyboardType="numeric" onChangeText={(text) => { content.startthree = text }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>five</Label>
                <Input keyboardType="numeric" onChangeText={(text) => { content.startfive = text }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>six</Label>
                <Input keyboardType="numeric" onChangeText={(text) => { content.startsix = text }} />
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
                <Input keyboardType="numeric" onChangeText={(text) => { content.endone = text }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>two</Label>
                <Input keyboardType="numeric" onChangeText={(text) => { content.endtwo = text }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>three</Label>
                <Input keyboardType="numeric" onChangeText={(text) => { content.endThree = text }} />
              </Item>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <Item stackedLabel>
                <Label>four</Label>
                <Input keyboardType="numeric" onChangeText={(text) => { content.endfour = text }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>five</Label>
                <Input keyboardType="numeric" onChangeText={(text) => { content.endfive = text }} />
              </Item>
            </Col>
            <Col>
              <Item stackedLabel>
                <Label>six</Label>
                <Input keyboardType="numeric" onChangeText={(text) => { content.endsix = text }} />
              </Item>
            </Col>
          </Grid>
          {this.renderHtmlFooterChecklist()}
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
    if (content.type == 'window') {
      return (
        <View>
          <Grid>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Sill</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Select Material"
                    },
                    buttonIndex => {
                      newData = this.state.data.map(w => {
                        if (w == content) {
                          console.log('window found')
                          w.sill.M = BUTTONS[buttonIndex]
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
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.sill.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#FFFFFF', height: 180 }}>
              <Text>Sash</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      newData = this.state.data.map(w => {
                        if (w == content) {
                          console.log('window found')
                          w.sash.M = BUTTONS[buttonIndex]
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
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.sash.R = text }} />
              </Item>
            </Col>
            <Col style={{ backgroundColor: '#E1E5F2', height: 180 }}>
              <Text>Frame</Text>
              <Button
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: BUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: "Testing ActionSheet"
                    },
                    buttonIndex => {
                      newData = this.state.data.map(w => {
                        if (w == content) {
                          console.log('window found')
                          w.frame.M = BUTTONS[buttonIndex]
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
                <Input keyboardType="numeric" placeholder="Reading" onChangeText={(text) => { content.frame.R = text }} />
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
    this.state = {
      jobId: null,
      insSheets: [
        {
          id: 1, name: 'Living Room', type: 'InsSheet', data: [
            {
              id: 1,
              side: false,
              expanded: 1,
              type: 'Doorway',
              title: "Doorway",
              leadsTo: null,
              door: { M: null, I: true, R: 0 },
              frame: { M: null, I: true, R: 0 },
              thresh: { M: null, I: true, R: 0 },
            }
          ], total: 0
        }
      ],
      sheets: [{ id: 1 }, { id: 2 }, { id: 3 }],
      data: [
        { id: 0, type: 'details', title: "Job Details" },
        { id: 1, title: "Property Description Checklist", type: "property details" },
        { id: 2, type: '5.0', title: "Form 5.0" },
        { id: 3, type: '5.1', title: "Form 5.1" },
        { id: 4, type: 'calibration', title: "Calibration" },
        { id: 5, type: 'layout', title: "Layout Photo" },
        { id: 6, type: 'layout2', title: "Property Photo" }
      ],
      selected: 0,
      isDateTimePickerVisible: false,
      colStatus: false,
      color: 'black'
    }

    // this.inputRef = this.inputRef.bind(this);
    this._handleRef = this._handleRef.bind(this)
    this.addSheet = this.addSheet.bind(this)
    this.getPhoto = this.getPhoto.bind(this)
    this.getPropertyPhoto = this.getPropertyPhoto.bind(this)
    this.addWindow = this.addWindow.bind(this)
    this.addCommonWindow = this.addCommonWindow.bind(this)
    this.addDoorway = this.addDoorway.bind(this)
    this.addCloset = this.addCloset.bind(this)
    this.addCabinet = this.addCabinet.bind(this)
    this.addWall = this.addWall.bind(this)
    this.addBaseboard = this.addBaseboard.bind(this)
    this.addHeaterVent = this.addHeaterVent.bind(this)
    this.addCeiling = this.addCeiling.bind(this)
    this.addFloor = this.addFloor.bind(this)
    this.addBaseboard = this.addBaseboard.bind(this)
    this.addEaves = this.addEaves.bind(this)
    this.addRafters = this.addRafters.bind(this)
    this.addFascia = this.addFascia.bind(this)
    this.addSoffit = this.addSoffit.bind(this)
    this.addgd = this.addgd.bind(this)
    this.addgdf = this.addgdf.bind(this)
    this.addBeam = this.addBeam.bind(this)
    this.addColumn = this.addColumn.bind(this)
    this.addGutter = this.addGutter.bind(this)
    this.addDownspout = this.addDownspout.bind(this)
    this.addeub = this.addeub.bind(this)
    this.addVent = this.addVent.bind(this)
    this.addAccessPanel = this.addAccessPanel.bind(this)
    this.removeWindow = this.removeWindow.bind(this)
    this.expandWindow = this.expandWindow.bind(this)
    this.addinsSheet = this.addInsSheet.bind(this)
    this.addSoilSheet = this.addSoilSheet.bind(this)
    this.addDustSheet = this.addDustSheet.bind(this)
    this.addSoilSample = this.addSoilSample.bind(this)
    this.addDustSample = this.addDustSample.bind(this)
    this.addJobCompletionSheet = this.addJobCompletionSheet.bind(this)
    this.addPropertyDetailsSheet = this.addPropertyDetailsSheet.bind(this)
    this.addFormFive = this.addFormFive.bind(this)
    this._renderContent = this._renderContent.bind(this)
    this._renderSheet = this._renderSheet.bind(this)
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
  }
  componentDidMount() {
    this.setState({ total: this.state.insSheets[0].data.length - 1 });
  }


  willFocusSubscription = this.props.navigation.addListener(
    'willFocus',
    payload => {
      // alert('jhsjhdjd');
      if (this.props.navigation.state.params && this.props.navigation.state.params.edit[0]) {
        console.log('edit!', this.props.navigation.state.params)
        AsyncStorage.getItem(this.props.navigation.state.params.edit[0]).then(x => {
          let data = JSON.parse(x)
          this.setState(data)
          AsyncStorage.removeItem(this.props.navigation.state.params.edit[0]);
          this.props.navigation.state.params = null
          // const navigateAction = NavigationActions.setParams({edit:null})
          // this.props.navigation.dispatch(navigateAction);
          console.log('params', this.props.navigation.state.params)
        })
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
    this._hideEndStartDateTimePicker();
  };

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
        data: [{
          id: 1,
          side: false,
          expanded: 1,
          type: 'Doorway',
          title: "Doorway",
          leadsTo: null,
          door: { M: null, I: true, R: 0 },
          frame: { M: null, I: true, R: 0 },
          thresh: { M: null, I: true, R: 0 },
        }],
        index: 1
      }]
    }))
    //console.log(this.state)
    this._sheetInput._root.focus();
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
        }]
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
        }]
      }]
    }))
    //console.log(this.state)
  }

  addWindow(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Window",
          expanded: true,
          sill: { M: null, I: true, R: 0 },
          sash: { M: null, I: true, R: 0 },
          frame: { M: null, I: true, R: 0 }
        }],
          x.total = x.data.length - 1
      }
    })
    this.setState({ insSheets: this.state.insSheets });
    //this._sheetInput._root.focus();

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
  addDoorway(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          expanded: 1,
          type: 'not set',
          title: "Doorway",
          leadsTo: null,
          door: { M: null, I: true, R: 0 },
          frame: { M: null, I: true, R: 0 },
          thresh: { M: null, I: true, R: 0 },
        }],
          x.total = x.data.length - 1
      }
    })
    this.setState({})
    //this._sheetInput._root.focus();
  }
  addCloset(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Closet",
          door: { M: null, I: true, R: 0 },
          frame: { M: null, I: true, R: 0 },
          shelf: { M: null, I: true, R: 0 },
          support: { M: null, I: true, R: 0 },
        }],
          x.total = x.data.length - 1
      }
    })
    this.setState({})
    //this._sheetInput._root.focus();
  }
  addCommonWindow(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Common Window",
          well: { M: null, I: true, R: 0 },
          sash: { M: null, I: true, R: 0 },
          frame: { M: null, I: true, R: 0 },
          shutters: { M: null, I: true, R: 0 },
        }],
          x.total = x.data.length - 1
      }
    })
    this.setState({})
    //this._sheetInput._root.focus();
  }
  addCabinet(id) {
    console.log("ADDING CABINET!");
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'Cabinet',
          title: "Cabinet",
          I: true,
          frame: { M: null, I: true, R: 0 },
          door: { M: null, I: true, R: 0 },
          shelf: { M: null, I: true, R: 0 },
          countertop: { M: null, I: true, R: 0 },
        }],
          x.total = x.data.length - 1
      }
    })
    this.setState({})
    //this._sheetInput._root.focus();
  }
  addWall(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Wall",
          M: null,
          I: true,
          R: 0
        }],
          x.total = x.data.length - 1
      }
    })
    this.setState({})
    //this._sheetInput._root.focus();
  }
  addBaseboard(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Baseboard",
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
  addHeaterVent(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Heater Vent",
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
  addCeiling(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Ceiling",
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
  addFloor(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Floor",
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
  addEaves(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
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
  addRafters(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Rafters",
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
  addFascia(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Fascia",
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
  addSoffit(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Soffit",
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
  addgd(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Garage Door",
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
  addgdf(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Garage Door Frame",
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
  addColumn(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Column",
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
  addBeam(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Beam",
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
  addGutter(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Gutter",
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
  addDownspout(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Downspout",
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
  addeub(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Utility Box",
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
  addVent(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Vent",
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
  addAccessPanel(id) {
    //console.log("addWindow", id);
    let newData = this.state.insSheets.map(x => {
      if (x.id == id) {
        x.data = [...x.data, {
          id: x.data.length + 1,
          side: false,
          type: 'not set',
          title: "Access Panel",
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
          x.total = x.data.length - 1
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
        type: 'window',
        side: false,
        type: 'not set',
        title: "Window ",
        sill: { M: null, I: false, R: 0 },
        sash: { M: null, I: false, R: 0 },
        frame: { M: null, I: false, R: 0 }
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
    console.log('add form five')
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
        console.log(this.state)
        await AsyncStorage.setItem(this.state.jobId, JSON.stringify(this.state)).then(
          this.setState({
            jobId: null,
            insSheets: [
              {
                id: 1, name: 'Living Room', type: 'InsSheet', data: [
                  {
                    id: 1,
                    side: false,
                    expanded: 1,
                    type: 'Doorway',
                    title: "Doorway",
                    leadsTo: null,
                    door: { M: null, I: true, R: 0 },
                    frame: { M: null, I: true, R: 0 },
                    thresh: { M: null, I: true, R: 0 },
                  }
                ], total: 0
              }
            ],
            sheets: [{ id: 1 }, { id: 2 }, { id: 3 }],
            data: [
              { id: 0, title: "Property Description Checklist", type: "property details" },
              { id: 1, type: '5.0', title: "Form 5.0" },
              { id: 2, type: '5.1', title: "Form 5.1" },
              { id: 3, type: 'calibration', title: "Calibration" },
              { id: 4, type: 'layout', title: "Layout Photo" },
              { id: 4, type: 'layout2', title: "Property Photo" }
            ],
            image: '',
            propimage: '',
            colStatus: false
          })
        );
      } catch (error) {
        console.log(error)
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
    this.setState({ scrollOffsetY: Math.round(event.nativeEvent.contentOffset.y) });
  }
  render() {

    //_.set(this.refs, 'Content._scrollview.resetCoords', { x: 0, y: this.state.scrollY });
    return (
      <Container>
        <View>
          <Item listBorderColor="red">
            <Input keyboardType="numeric" inputColorPlaceholder='red' placeholder='JobId' value={this.state.jobId} onChangeText={(text) => { this.setState({ jobId: text, color: 'black' }) }} ref={c => this._usernameInput = c} />
            <Icon name='close-circle' style={{ color: this.state.color }} />
          </Item>
        </View>
        <ScrollView
          ref="Content"
          onScroll={event => this.handleScroll(event)}
        >
          {this.state.insSheets.map(x => {
            if (x.type == 'InsSheet') {
              return <View style={{ padding: 10, paddingBottom: 15 }} key={x.id + 'view'}>
                <Item key={x.id + 'item'} >
                  <Input key={x.id + 'pp'} ref={c => this._sheetInput = c} value={x.name} onChangeText={(text) => this.setName(text, x.id)} placeholder="Inspection Sheet" />
                </Item><InsSheet data={x.data} addWindow={this.addWindow} removeWindow={this.removeWindow} total={x.total} addDoorway={this.addDoorway} addCloset={this.addCloset} addCommonWindow={this.addCommonWindow} addCabinet={this.addCabinet} addWall={this.addWall} addBaseboard={this.addBaseboard} addHeaterVent={this.addHeaterVent} addCeiling={this.addCeiling} addFloor={this.addFloor}
                  addEaves={this.addEaves} addRafters={this.addRafters} addFascia={this.addFascia} addSoffit={this.addSoffit} addgd={this.addgd} addgdf={this.addgdf} addColumn={this.addColumn} addBeam={this.addBeam} addGutter={this.addGutter} addDownspout={this.addDownspout} addeub={this.addeub} addVent={this.addVent}
                  addAccessPanel={this.addAccessPanel} focusNextField={this.focusNextField} renderWindowHeader={this._renderWindowHeader} renderSheet={this._renderSheet} name={x.name} setName={this.setName} inputRef={this._handleRef} id={x.id} key={x.id} sheet />
              </View>
            }
            if (x.type == 'SoilSheet') {
              return <SoilSheet data={x.data} id={x.id} addSoilSample={this.addSoilSample} renderWindowHeader={this._renderWindowHeader} renderSoilSheet={this.renderSoilSheet} key={x.id} />
            }
            if (x.type == 'DustSheet') {
              return <DustSheet data={x.data} id={x.id} addDustSample={this.addDustSample} renderWindowHeader={this._renderWindowHeader} renderDustSheet={this.renderDustSheet} key={x.id} />
            }
          })}
          <View style={{ paddingTop: 10 }}>
            <Text>Checklists</Text>
          </View>
          <Accordion dataArray={this.state.data} expanded={this.state.colStatus} renderHeader={this._renderHeader} renderContent={this._renderContent} />
          <ScrollView enableAutoAutomaticScroll={false}>
            <Button block style={{ marginTop: 30 }}
              onPress={() =>
                ActionSheet.show(
                  {
                    options: sheetButons,
                    cancelButtonIndex: CANCEL_INDEX2,
                    title: "Add Sheet/Photo"
                  },
                  buttonIndex => {
                    if (buttonIndex == 0) { this.addInsSheet() }
                    if (buttonIndex == 1) { this.addSoilSheet() }
                    if (buttonIndex == 2) { this.addDustSheet() }
                    if (buttonIndex == 3) { this.addJobCompletionSheet() }
                    if (buttonIndex == 4) { this.addPropertyDetailsSheet() }
                    if (buttonIndex == 5) { this.addFormFive() }
                    if (buttonIndex == 6) { this.getPhoto() }
                    if (buttonIndex == 7) { this.getPropertyPhoto() }
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
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
