# REFLECTION

## 1. The hardest bug I hit this week, and how I debugged it

One of the hardest bugs I faced was related to localStorage persistence and duplicate state updates in React. Initially, when I refreshed the page, my saved tools disappeared or duplicated unexpectedly. I first thought the issue was in the audit engine logic, but after checking the browser console and reviewing my useEffect hooks carefully, I realized I had accidentally added duplicate localStorage effects. One effect was overwriting the saved data with an empty array before the loading logic completed.

To debug this, I tested localStorage manually using the browser developer console and added tools repeatedly while refreshing the page. After simplifying the state management and keeping only one load effect and one save effect, the problem was fixed. This taught me how React lifecycle timing and state persistence work together.

---

## 2. A decision I reversed mid-week, and what made you reverse it

One decision I reversed was keeping the default Next.js folder structure. Initially, I placed all files inside the root app folder, but later I moved the application into the src/app structure. I realized this would make the project cleaner and easier to scale as more files were added, especially the audit engine, pricing configuration, and documentation files.

Another decision I reversed was trying to solve every issue immediately with complex solutions. Early on, I considered adding backend functionality too quickly, but later decided to focus on stabilizing the frontend and audit logic first. This made development much smoother and reduced confusion.

---


## 3 How you used AI tools

I used ChatGPT heavily throughout this assignment for learning unfamiliar technologies, debugging issues, improving architecture decisions, and understanding React and Next.js concepts. Since I was relatively new to Next.js and TypeScript, AI assistance helped me move faster and understand how professional frontend workflows operate.

However, I did not blindly trust generated code. I manually tested features, debugged runtime issues, and modified logic based on assignment requirements. One example where the AI was wrong was when duplicate useEffect hooks caused localStorage state conflicts. Initially, the generated approach created duplicated state updates, and I had to manually inspect the logic and simplify it to make persistence stable.

Overall, AI significantly accelerated my learning process, but I still handled testing, debugging, and iteration manually.

---

## 5. Self-rating

### Discipline — 8/10
I consistently worked on the project, maintained Git commits, documented progress, and kept improving features incrementally.

### Code Quality — 7/10
I focused on writing readable and reusable code, but there are still opportunities to improve structure and testing coverage.

### Design Sense — 7/10
I created a clean and modern interface with a focus on usability and clarity, though I would further polish responsiveness and visual hierarchy with more time.

### Problem Solving — 8/10
I encountered multiple debugging challenges related to Next.js setup, localStorage persistence, and React state management, and I resolved them through testing and iteration.

### Entrepreneurial Thinking — 7/10
I tried to think beyond just coding by focusing on product usefulness, user experience, and realistic audit recommendations tied to business value.