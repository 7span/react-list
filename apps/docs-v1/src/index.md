---
layout: home

hero:
  name: ReactList
  text: Simplified API-based list rendering
  tagline: Build listing layouts faster by abstracting away the boilerplate of API calls, pagination, and state management.
  # image:
  #   src: /hero.svg
  #   alt: ReactList
  actions:
    - theme: brand
      text: Get Started
      link: /introduction/why-react-list
    - theme: alt
      text: View on GitHub
      link: https://github.com/7span/react-list
features:
  - icon: 🧠
    title: Headless
    details: Completely UI-agnostic. It gives you full control over the markup via render props.
  - icon: 🔁
    title: Centralized Request Handling
    details: Configure your API logic once using the global requestHandler option.
  - icon: ⚡
    title: Reactive
    details: Automatically reacts to changes in props like page, filters, or params, and fetches updated data.
  - icon: 💾
    title: State Manager
    details: Persist user preferences like page, perPage, and filters in localStorage, or push them to an API.
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://github.com/7span.png',
    name: '7Span',
    title: 'Sponsor',
    links: [
      { icon: 'github', link: 'https://github.com/7span' },
      { icon: 'x', link: 'https://x.com/7SpanHQ' }
    ]
  },

  {
    avatar: 'https://github.com/MaulikSavaliya1998.png',
    name: 'Maulik Savaliya',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/MaulikSavaliya1998' },
      { icon: 'x', link: 'https://x.com/theharshin' }
    ]
  }, 
  {
    avatar: 'https://github.com/theharshin.png',
    name: 'Harsh Kansagara',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/theharshin' },
      { icon: 'x', link: 'https://x.com/theharshin' }
    ]
  },{
    avatar: 'https://github.com/sanjay10985.png',
    name: 'Sanjay Tomar',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/sanjay10985' },
      { icon: 'x', link: 'https://x.com/sanjay10985' }
    ]
  }
]
</script>

## Our Team

Meet the team behind ReactList.

<VPTeamMembers size="small" :members="members" />
