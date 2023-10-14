# Pomos: Focus Timer with Stats

A simple, flexible pomodoro timer web app, with an optional feature to track and visualize the time you spend focusing. Built with React and Supabase.

## Features

- Customizable work/break lengths
- Interactive charts of your timer usage
- Light/dark mode toggle

## Screenshots

Main screen: light/dark modes
<p align="left">
<img src="https://github.com/mistyb01/pomos/assets/60805050/4db1ef90-61b9-471b-90e5-55e6cea5fe60" width="45%"/>
  &nbsp;
<img src="https://github.com/mistyb01/pomos/assets/60805050/225678da-7c59-43cd-bc4e-eba349026375" width="45%"/>
</p>

Settings tab
<p align="left">
<img src="https://github.com/mistyb01/pomos/assets/60805050/827a48dc-7299-4223-b81e-3dd20d60cdad" width="800"/>
</p>

Statistics
<p align="left">
<img src="https://github.com/mistyb01/pomos/assets/60805050/73e0cdf8-d5ef-475e-a5b4-8d09c3370578" width="800"/>
</p>

## Lessons Learned

Here are a few personal takeaways from making Pomos!

### Achieving an accurate timer update 

Firstly, I wanted the timer to work, even when it's ran in the background. I quickly found that relying purely on `setInterval` to calculate the remaining time wasn't quite enough, as it often went out of sync when you minimized the tab.

After finding some inspiration on [stackoverflow](https://stackoverflow.com/questions/48219925/reactjs-continue-timer-in-the-background), I wrote a tick function that frequently checks the difference between the present and when the timer was last started, so if the `setInterval` loses sync at any point, it still has what it needs to accurately calculate the time remaining.

Here's a gist of the steps:
- Save in a variable when the timer was last started (`timerStartTime`). 
- Find the difference between the  present moment `currentTime` and `timerStartTime`, so we know how many seconds have passed since then.
- Lastly, subtract this difference from the timer's original start time to calculate the final time to display.

### Understanding the useEffect hook 
I was able to get to know React's useEffect hook a little better when I tried it with a `setInterval` inside it.

When combined with a `setInterval`, the interval will repeatedly fire, regardless of the effect's dependencies. It can be tricky getting it in sync with state changes; but what helped me was this key idea from [Dan Abramov's blog](https://overreacted.io/a-complete-guide-to-useeffect/#what-happens-when-dependencies-lie): Effects only know about the state from their render--which is why the interval will keep using the same values that the effect originally rendered with.

So, if we want a state variable's update to be reflected inside the effect, the value must be set as a dependency.

In this case, `timerStartTime` is a particularly important dependency, since it's a piece of the calculation that is run in every interval. Whenever it changes (like when the user starts timer again after pausing, or clicks to the next timer), the effect needs to have that value up to date to keep things accurate.

### Lifting up state to preserve it between routes 

As I started adding more functionality, which required different routes (like a login and stats page), I ran into an issue of timer progress getting lost between route navigation.

I identified two crucial pieces that I wanted to have remembered, even if the user navigates elsewhere: the current timer's remaining time, and the current cycle index. 

An easy fix was lifting up this data to the `App.jsx` component, which houses the routes. This involved two levels of prop-drilling, which after reading [a page](https://react.dev/learn/passing-data-deeply-with-context#before-you-use-context) from the React docs, seems trivial compared to introducing a new context.

