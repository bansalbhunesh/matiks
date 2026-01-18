package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"matiks-leaderboard/leaderboard"
)

var lb *leaderboard.Leaderboard
var userList []string // Keep track of usernames for efficient specific-random updates

func main() {
	rand.Seed(time.Now().UnixNano())
	lb = leaderboard.NewLeaderboard()

	// Seed Data
	fmt.Println("Seeding 10,000 users...")
	
	// Add specific users from requirements
	specificUsers := map[string]int{
		"rahul":        4600,
		"rahul_burman": 3900,
		"rahul_mathur": 3900,
		"rahul_kumar":  1234,
	}
	
	for name, score := range specificUsers {
		lb.AddOrUpdateUser(name, score)
		userList = append(userList, name)
	}

	for i := 1; i <= 10000; i++ {
		username := fmt.Sprintf("user_%d", i)
		rating := 100 + rand.Intn(4901) // 100 to 5000
		lb.AddOrUpdateUser(username, rating)
		userList = append(userList, username)
	}
	fmt.Println("Seeding complete.")

	// Background Simulation: Update random users every 100ms
	go func() {
		ticker := time.NewTicker(200 * time.Millisecond) // 5 updates/sec
		for range ticker.C {
			idx := rand.Intn(len(userList))
			uname := userList[idx]
			newScore := 100 + rand.Intn(4901)
			lb.AddOrUpdateUser(uname, newScore)
			// fmt.Printf("Simulated update: %s -> %d\n", uname, newScore)
		}
	}()

	// HTTP Handlers
	http.HandleFunc("/leaderboard", handleLeaderboard)
	http.HandleFunc("/search", handleSearch)
	
	// CORS Middleware wrap
	handler := corsMiddleware(http.DefaultServeMux)

	fmt.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == "OPTIONS" {
			return
		}
		next.ServeHTTP(w, r)
	})
}

func handleLeaderboard(w http.ResponseWriter, r *http.Request) {
	// Parse Limit (default 50)
	limit := 50
	if l := r.URL.Query().Get("limit"); l != "" {
		if val, err := strconv.Atoi(l); err == nil && val > 0 {
			limit = val
		}
	}

	topInfo := lb.GetTopUsers(limit)
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(topInfo)
}

func handleSearch(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	if query == "" {
		http.Error(w, "Query parameter 'q' is required", http.StatusBadRequest)
		return
	}

	results := lb.SearchUsers(query)
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(results)
}
