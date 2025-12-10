---
layout: home

hero:
  name: ReactList
  text: Simplified API-based list rendering
  tagline: Build listing layouts faster by abstracting away the boilerplate of API calls, pagination, and state management.
  image:
    src: /hero.svg
    alt: VitePress
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
    details: Completely UI-agnostic. It gives you full control over the markup via scoped slots.
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
    avatar: 'https://github.com/theharshin.png',
    name: 'Harsh Kansagara',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/theharshin' },
      { icon: 'x', link: 'https://x.com/theharshin' }
    ]
  },
  {
    avatar: 'https://github.com/maulik-7span.png',
    name: 'Maulik Savaliya',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/maulik-7span' },
    ]
  },
  {
    avatar: 'https://github.com/sanjay-t-7span.png',
    name: 'Sanjay Tomar',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/sanjay-t-7span' }
    ]
  },
  {
    avatar: 'https://github.com/darshak-7span.png',
    name: 'Darshak Ribadiya',
    title: 'Contributor',
    links: [
      { icon: 'github', link: 'https://github.com/darshak-7span' }
    ]
  },
]
</script>

### 🙌 Credits

> A huge shoutout to the brilliant folks behind `<ReactList>`\
> Thank you for turning "ugh, another listing page" into "oh hey, that was easy." 🚀

<VPTeamMembers size="small" :members />
