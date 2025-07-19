---
title: "Why I Created My Own Personal Site"
date: "2025-07-18"
tags: ["Vue.js", "Philosophy", "Web Dev", "Personal", "Digital Garden"]
cover: "/gallery/sunset-sky-blog.jpg"
coverAlt: "Abstract digital landscape representing the intersection of human consciousness and technology"
readTime: "4 min"
excerpt: "After years of scattered thoughts across platforms, I built this site to explore the intersection of human consciousness and digital architecture—a space where philosophy meets code."
author: "Moi"
authorBio: "Exploring the intersection of human consciousness and digital architecture. Building bridges between the physical and digital worlds."
description: "The story behind creating a personal blog focused on philosophy, technology, and the human experience in our digital age."
keywords: "personal blog, web development, Vue.js, philosophy, technology, digital garden, consciousness"

meta:
  - name: My Cool App
    description: cool things happen to people who use cool apps
gallery:
  id: "sunset-sky-blog"
  images:
    - "/gallery/sunset-sky-blog.jpg"
  showInGallery: true
---

For months, I found myself needing a "safe place" for me to write my ideas, thoughts, experiences, etc. But I needed something that felt personal yet professional. There were times when the notes app wasn't enough and my Twitter/X account reach was too low.

That's when I decided to build this site.

## Why Not Just Use an Existing Platform?

When you build on someone else's platform, you're always at the mercy of their decisions. Algorithms change, policies shift, platforms disappear. Remember Google+? Vine? The digital graveyard is littered with platforms that once hosted our thoughts.

More importantly, I wanted complete control over the experience. The way information is presented shapes how it's consumed and understood. I wanted to experiment with how ideas could be interconnected, how readers could navigate through concepts, and how the medium itself could enhance the message.

## The Technical Part

When I was about to just start another Next.JS project, I decided not this time. As much as I like Next.js, unfortunately, it didnt feel like it would work for this project. Next.js is great for scalabity and bigger projects, but its a bit too complicated if you want to build something quick.

I made my own research and after thinking it for a while, I decided going for vue and vite. Why? Well, Vite is fast and since its not a framework being able to know how everything will work, gives you that sentiment of ownership and personal place. Well, setting up everything was def a bit hard due the lack of tutorials or resources for what I needed. But it worked.

Vue.JS is also kwown for its perfomance and its syntax. While its much different from react, you can get used to it after a few tutorials. Its actually simpler and cleaner if you see it in this way. But you don't have to worry much about hydratation errors.

Also, funily enough, I always thought that a good app had to be server-side rendered, but I found out its not always like that. Vite and vue serves well its purpose for me. And, I used plain CSS instead of tailwind.css because it felt like I needed something personal, so being able to create my own theme was that gave me that joy.

## The blog implementation

Honestly the hardest part was setting up the blog. Not many tutorials out there, but you can ask AI to help you.
Although, after a few bugs and some fixing, you can get great results. I went for `vite-plugin-md` that is a vite plugin for markdown as its name suggests. It was tricky setting it up at firs but got it after some minutes later.

I needed syntax highlighting and managed to implement it with a `code` builder for the plugin. That was all. Also, I edited a prism theme so I was able to modify some colors like the background and text so the code block looked better.
