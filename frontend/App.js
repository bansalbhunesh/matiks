import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, SafeAreaView, Platform } from 'react-native';
import { fetchLeaderboard, searchUsers } from './src/api/client';
import { LeaderboardItem } from './src/components/LeaderboardItem';
import { SearchBar } from './src/components/SearchBar';

export default function App() {
    const [data, setData] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState('');

    // Fetch leaderboard periodically
    useEffect(() => {
        let interval;
        if (!query) {
            loadLeaderboard();
            // Auto-refresh every 2 seconds to show live updates
            interval = setInterval(loadLeaderboard, 2000);
        }
        return () => clearInterval(interval);
    }, [query]);

    const loadLeaderboard = async () => {
        const result = await fetchLeaderboard(50); // Top 50
        // Simple diff check could be here, but React handles diffing well enough for 50 items
        setData(result);
    };

    const handleSearch = async (text) => {
        setQuery(text);
        if (!text) {
            setSearchResults([]);
            loadLeaderboard();
            return;
        }

        setIsSearching(true);
        const results = await searchUsers(text);
        setSearchResults(results);
        setIsSearching(false);
    };

    const displayData = query ? searchResults : data;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#121212" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Leaderboard</Text>
            </View>

            <SearchBar onSearch={handleSearch} isSearching={isSearching} />

            <View style={styles.listHeader}>
                <Text style={[styles.columnHeader, { width: 60 }]}>Rank</Text>
                <Text style={[styles.columnHeader, { flex: 1 }]}>User</Text>
                <Text style={[styles.columnHeader, { width: 80, textAlign: 'right' }]}>Rating</Text>
            </View>

            <FlatList
                data={displayData}
                keyExtractor={(item, index) => item.username + index} // Fallback index if username dupes (shouldn't happen)
                renderItem={({ item, index }) => (
                    <LeaderboardItem item={item} index={index} />
                )}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            {query ? "No users found" : "Loading..."}
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    header: {
        padding: 20,
        backgroundColor: '#121212',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#222',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    listHeader: {
        flexDirection: 'row',
        paddingHorizontal: 30, // matches item padding + margin approx
        paddingVertical: 10,
        backgroundColor: '#1a1a1a',
    },
    columnHeader: {
        color: '#888',
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#666',
        fontSize: 16,
    },
});
