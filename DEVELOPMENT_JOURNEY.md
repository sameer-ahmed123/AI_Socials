# DEVELOPMENT JOURNEY --- SketchX

> _"I didn't want to build another tutorial clone. I wanted to build
> something that would teach me how real software is designed."_

## Why I Started SketchX

While Doom scrolling on istagram i stumbles upon this post https://www.instagram.com/p/DXzbUMGKD0g/ by Wesbos
talking about the new css border-shape api and I kinda liked the way the borders were rendered and it reminded me
of the old marvel comics I used to read when i was little . and it gave me an idea that like i just graduated
from my Bachelors in Computer Science and currently look for a job or internship so why not use my free time to just
make this myself and open source it

I needed to polish up on my coding skill as well and get back to the fundamentals as well so i just decided to start building
a X.com clone but with the Border-shape (filter "sketch filter") twist .

Instead of rushing toward a finished product, I chose to build it sprint
by sprint. Every feature would be planned, implemented, tested, and
improved before moving on.

one thing that i regret is ...just pushing all the code to master branch and not using feature or sprint branching but whatever f it.

---

# Project Goals

- Build a production-style social media platform.
- Practice full-stack engineering with Django + DRF and React +
  TypeScript.
- Learn component architecture and API design.
- Add something AI related ( employers love that now a days 😉)
- Produce a portfolio project that reflects real engineering
  practices.

---

# Technology Stack

## Backend

- Django
- Django REST Framework
- MySQL
- Firebase Authentication
- REST APIs

## Frontend

- React
- TypeScript
- React Router
- Vanilla CSS
- Vite

---

# Engineering Principles

Throughout development I tried to follow a few guiding principles:

- Build in small, testable sprints.
- Prefer reusable components over copy-paste.
- Keep business logic out of UI components.
- Document technical debt rather than ignoring it.
- Optimize for readability before cleverness.
- Accept duplication temporarily when it keeps momentum, then refactor
  later.
- The MOST IMPACTFUL Development of Design Principle ive come accross this year
  was the <b>YAGNI</b> principle (You Ain't Gonna Need It) it dictacts how we
  Should only work on features that we ABOSULUTELY MUST have if it isnt a Top
  priority most likely its not a required feature and this design principle
  has helped me avoid Scope Creep and cut Down my development Time almost half.

---

# Major Milestones

## Sprint 1--3

- Authentication
- Application shell
- Routing
- Timeline foundation

## Sprint 4--6

- Posts
- Rich text
- Likes
- Bookmarks
- Reposts
- Individual post pages

## Sprint 7--8

- Comments system
- Comment composer
- Comment deletion
- Backend APIs

## Sprint 9

- Public profile pages
- Profile timeline
- Clickable usernames

## Sprint 10

- Edit Profile
- Profile update flow
- Navigation improvements
- Profile polishing

---

# Current Features

- Google authentication
- Home timeline
- Post creation
- Rich text (mentions, hashtags, URLs)
- Like, bookmark and repost interactions
- Post detail page
- Comments
- Public user profiles
- Editable profiles
- Clickable usernames
- Modular hooks
- Shared UI component library
- Post , User Lookup (search ,hashtags comming next)
- Media Image Uploads (currently using Cloudinary)

---

# Technical Debt

Some items have intentionally been postponed:

- Unify interaction logic across hooks.
- Reduce duplicated state update logic.
- Route helpers.
- Additional loading and error polish.
- Performance optimization.

---

# Roadmap

## Sprint 13

- Follow / Unfollow
- Followers
- Following


## Sprint 14

- Notifications

## Sprint 15

- Media improvements
- UI polish

## Sprint END

- Production readiness
- Documentation
- Deployment
- Open-source preparation

---

# Lessons Learned

This project taught me that software engineering is less about writing
code and more about making good decisions repeatedly. Small
architectural choices compound over time, and a clean foundation makes
future features dramatically easier to build.

---

# Open Source Vision

One of my long-term goals is to make SketchX open source.

Before doing so I want to:

- Finish the planned roadmap.
- Improve documentation.
- Add architecture diagrams.
- Write contribution guidelines.

If someone can learn from this repository the same way I learned while
building it, then the project will have achieved something beyond being
just another portfolio piece.

---

# Closing Thoughts

SketchX represents my transition from building projects to engineering
software.

overall I want to take a look at the bigger picture rather then the small pieces of the puzzle

Every sprint has made me a better developer, and the project continues
to evolve alongside my own skills. My hope is that, by the time it
reaches version 1.0, it reflects not only what I can build, but how I
think as a software engineer.
