import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { DrawerItems } from 'react-navigation-drawer'
import MyHeader from '../components/MyHeaderComponent'
import db from '../config'
import { ListItem } from 'react-native-elements'
export default class Donations extends Component {

    constructor() {
        super();
        this.state = {
            allDonations: []
        }
    }

    getDonationDetails = () => {
        db.collection("allDonations").onSnapshot((snapshot) => {
            var allDonations = []
            snapshot.docs.map((document) => { allDonations = document.data() });
            this.setState({
                allDonations: allDonations
            })
        });
    }

    componentDidMount() {
        this.getDonationDetails();
    }

    render() {
        console.log(this.state.allDonations);
        return (
            <View>
                <MyHeader navigation={this.props.navigation} title="Donations" />
                <FlatList
                    keyExtractor={(item, index) => { index.toString(); }}
                    data={this.state.allDonations} renderItem={({ item }) => {
                        return (
                            <View>
                                <ListItem title={item.BookName}
                                    subtitle={item.requestedStatus}
                                    rightElement={
                                        <TouchableOpacity style={{ backgroundColor: 'red' }} >
                                            <Text> send book </Text>
                                        </TouchableOpacity>} >
                                </ListItem>
                            </View>);
                    }} >

                </FlatList>
            </View >
        )
    }
}