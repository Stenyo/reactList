import React from 'react';
import {View, TouchableOpacity, Text} from "react-native"
import styleCard from './styleCard'


const ProductCard =  ({ item, navigation }) => (
    <View style={styleCard.productContainer}>
            <Text style={styleCard.productTitle}>{item.title}</Text>
            <Text style={styleCard.productDescription}>{item.description}</Text>

            <TouchableOpacity 
            style={styleCard.productButton}
            onPress={() => {
                navigation.navigate("Product", { product : item});
            }}
            >
                <Text style={styleCard.productButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
)

export default ProductCard;