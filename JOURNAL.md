"After every <b>SPRINT</b>, we'd spend 10–15 minutes writing things like:

What new engineering concepts I learned.
What architectural patterns I encountered.
Mistakes I made and why.
Design decisions that surprised me.
Questions I still have.
Connections to previous knowledge.

Over time, it becomes a personalized engineering textbook written from my own experience." 


### 22/7/26
```
the day ive started my journey as a REAL software developer .
this journal is not designed to keep track of what code i write but its designed to keep track of what i think and how i think as a software engineer. its designed to keep track of the evolution of my thinking process .
```

### 26/7/26
```
just push the code for sprint 15 A  (this is the foundation layer or architectural layer for whats to come in the future).
in this sprint i learned most about the philosiphy of Single Responsibility. 
ive got not a alot to say but the most difficult thing here was building and designing a system that grows without haveing much dependency issues .
in this sprint ive built a knowledge layer or a context generator ,that will be fed to future ai agents as a snapshot of whats happend recently in the world , it is designed to be like a sort of a sytem prompt that gets fed to the ai agent before it makes any decision on this platform.
```

### 29/7/26
```
Sprint 17 was the first sprint where I genuinely felt like I was designing software instead of simply writing code.

The biggest thing I learned was that architecture is not about creating more classes or more abstractions. Architecture is about creating boundaries.

During this sprint I separated responsibilities between reading data (useFeed) and creating data (usePosts). Initially I wanted a single hook that controlled everything related to posts, but I slowly realized that "posts" is not actually one responsibility. Reading the feed and creating a post evolve independently, so they deserved independent abstractions.

On the backend I introduced FeedService and FeedRanker. At first I wanted to go even further and build a strategy-based ranking pipeline with multiple ranking classes. After thinking about it I realized I was designing for imaginary future problems instead of today's problems. FeedRanker currently does almost nothing, but it provides a single extension point for future recommendation algorithms without introducing unnecessary complexity today.

This sprint also introduced Cursor Pagination and Infinite Scrolling.

Before this sprint I thought infinite scrolling was simply "load more posts". I now understand that it is actually a collaboration between several layers:

- the database
- Django pagination
- the API contract
- React state
- IntersectionObserver
- incremental rendering

No single component owns infinite scrolling. The behaviour emerges because every layer has one small responsibility.

One mistake I almost made several times during this sprint was trying to solve architectural problems too early.

Examples:

- Feed Context
- Feed Strategy Pipeline
- Smart Sticky Widgets
- Scroll Position Preservation

Every one of these ideas sounded elegant, but none of them improved the MVP. I learned that there is a huge difference between building software that is extensible and building software for features that do not yet exist.

Another thing that surprised me was how valuable "boring" code is.

```
### 1/8/26
```
Sprint 18 was less about building new features and more about making the platform feel alive.

The biggest lesson from this sprint was realizing that not every feature deserves its own complex architecture. While building trending hashtags, popular posts and the discovery dashboard, I caught myself wanting to immediately integrate everything into the World Context. After thinking about it, I realized I was once again designing for a future that didn't exist yet.
```