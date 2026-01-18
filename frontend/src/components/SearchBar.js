import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

export const SearchBar = ({ onSearch, isSearching }) => {
    const [query, setQuery] = useState('');

    // Debounce the search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search User..."
                placeholderTextColor="#888"
                value={query}
                onChangeText={setQuery}
                autoCapitalize="none"
            />
            {isSearching && (
                <View style={styles.loader}>
                    <ActivityIndicator size="small" color="#00ff88" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#1a1a1a',
    },
    input: {
        backgroundColor: '#333',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        color: '#fff',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#444',
    },
    loader: {
        position: 'absolute',
        right: 35,
        top: 22,
    },
});
