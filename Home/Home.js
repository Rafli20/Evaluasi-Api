import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native'

import { styles } from './style'
console.disableYellowBox = true

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            Data: [],
            Load: false
        }
    }
    componentDidMount() {
        this.fetch()
    }
    fetch = async () => {
        this.setState({
            Load: true
        })
        try {
            let response = await fetch('https://randomuser.me/api/?results=20')
            let responseJson = await response.json()
            await this.setState({
                Data: responseJson.results,
                Load: false
            })
        } catch (error) {
            alert(error)
            this.setState({
                Load: false
            })
        }
    }
    render() {
        if (this.state.Load === true) {
            return (
                <View style={styles.Load}>
                    <ActivityIndicator
                        size='small'
                        color='blue'
                    />
                </View>
            )
        }
        return (
            <View>
                <FlatList
                    data={this.state.Data}
                    keyExtractor={index => index.toString}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.Component}>
                                <Image source={{ uri: item.picture.medium }} style={styles.Image} />
                                <View>
                                    <Text style={styles.nameText}>
                                        Number  : {item.location.street.number}
                                    </Text>
                                    <Text style={styles.nameText}>
                                        Name  : {item.location.street.name}
                                    </Text>
                                    <Text style={styles.nameText}>
                                        City  : {item.location.city}
                                    </Text>
                                    <Text style={styles.nameText}>
                                        State  : {item.location.state}
                                    </Text>
                                    <Text style={styles.nameText}>
                                        Country  : {item.location.country}
                                    </Text>
                                    <Text style={styles.nameText}>
                                        Post Code  : {item.location.postcode}
                                    </Text>
                                </View>

                            </View>
                        )
                    }}
                />
                <Text>
                    Hallo..
                </Text>
            </View>
        )
    }
}