import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const LeaderboardItem = ({ item, index, isHighlight }) => {
    // Use item.rank directly from backend
    const rankColor = item.rank === 1 ? '#FFD700' : // Gold
        item.rank === 2 ? '#C0C0C0' : // Silver
            item.rank === 3 ? '#CD7F32' : // Bronze
                '#fff';

    return (
        <View style={[styles.container, isHighlight && styles.highlight]}>
            <View style={styles.rankContainer}>
                <Text style={[styles.rank, { color: rankColor }]}>
                    #{item.rank}
                </Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.username}>{item.username}</Text>
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.score}>{item.rating}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#1e1e1e',
        marginVertical: 4,
        marginHorizontal: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    highlight: {
        borderColor: '#00ff88',
        backgroundColor: '#25332a',
    },
    rankContainer: {
        width: 60,
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    infoContainer: {
        flex: 1,
    },
    username: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    scoreContainer: {
        width: 80,
        alignItems: 'flex-end',
    },
    score: {
        color: '#00ff88',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
