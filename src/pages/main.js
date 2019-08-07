import React, { Component } from "react";
import api from '../services/api'

 
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import ProductCard from "../cards/ProducsCard";

export default class Main extends Component {
    static navigationOptions = {
        title : "Main"
    };

    state = {
        productInfo: {},
        docs: [],
        page: 1
    }

    componentDidMount(){
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;


        this.setState({ 
            docs : [... this.state.docs, ...docs],
            productInfo,
            page
        });
    };

    loadMore = () => {
        const { page, productInfo} = this.state;

        if(page === productInfo.pages) return;

        const pageNumber = page +1;

        this.loadProducts(pageNumber);

    };


    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={this.state.docs}
                    keyExtractor={item => item._id}
                    renderItem={ ({item})  =>  <ProductCard
                    item={item}
                    navigation = {this.props.navigation}
                    />}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa"
    },

    list: {
        padding:20
    },
})