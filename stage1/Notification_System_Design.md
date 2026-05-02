# Stage 1

## Priority Inbox Algorithm Design

### Approach
The objective is to implement a Priority Inbox that accurately fetches the top 'n' most important unread notifications based on a composite metric of **Weight** and **Recency**. 

The prioritization rules defined:
- **Weight**: Placement > Result > Event
- **Recency**: Most recent timestamps within the same weight tier rank higher.

#### Implementation Steps
1. **Weight Assignment**: 
   - `Placement` is assigned a weight of `3`.
   - `Result` is assigned a weight of `2`.
   - `Event` is assigned a weight of `1`.

2. **Sorting Logic**:
   - The unread notifications are sorted. The primary sort key is the assigned weight (descending). 
   - The secondary sort key is the timestamp (descending, meaning newer times are larger/higher priority).

3. **Limiting**:
   - After sorting, we simply slice the array to return the top `n` elements (e.g., top 10).

### Efficiently Maintaining Top 10 for Streaming Data
As new notifications arrive continuously, sorting the entire array of unread notifications every time is inefficient (O(N log N)).

**Optimized Approach:**
To maintain the top 10 efficiently, we use a **Priority Queue (Min-Heap) of size K (where K = 10)**.
- The heap is ordered by our priority rules, but inverted (the element at the root of the Min-Heap is the *lowest* priority notification among the top 10).
- When a new notification arrives, we compare it to the root of the Min-Heap.
- If the new notification has a *higher* priority than the root, we extract the root and insert the new notification. 
- This ensures the heap always contains the top 10 highest priority items. Processing a new notification takes `O(log K)` time. Since `K = 10` is constant, this is effectively `O(1)` time per new notification, making it highly scalable for production systems with high notification volume.
