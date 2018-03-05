# react-animation-primitive [![Build Status](https://travis-ci.org/ajoslin/react-animation-primitive.svg?branch=master)](https://travis-ci.org/ajoslin/react-stepper-primitive)

## Why?

You want a simple declarative animation container for an open / close, enter / leave element. Like a sidenav.

And you want it to weigh <3 kb.

## Install

```
npm install --save react-animation-primitive
```

## Example

```js
<AnimationPrimitive
  phase={state.isOpen ? 'enter' : 'leave'}
  listenerProp={'onTransitionEnd'}
  render={({ getContainerProps, phase, phaseActive, phaseComplete }) =>
    <div
      {...getContainerProps({
        class: cx(style.drawer, {
          'hide': !phase || (phase === 'leave' && phaseComplete),
          'enter': phase === 'enter',
          'enter_active': phase === 'enter' && phaseActive,
          'leave': phase === 'leave',
          'leave_active': phase === 'leave' && phaseActive
        })
      })}
    >
      <div class='backdrop' onClick={() => this.setState({ isOpen: fase }) />
      <div class='sidenav'>
        Sidenav Contents
      </div>
    </div>
  } />
  ```

## API

## `<AnimationPrimitive>`

#### Props

#### phase

> `string` | *required*

Must be either `'enter'` or `'leave'`.

When a phase is set, it will change the phase, call render, and wait for `onTransitionEnd` or `onAnimationEnd` (depending on `listenerProp`), then call render again.


#### listenerProp

> `string` | default `'onTransitionEnd'` | optional, one of `'onTransitionEnd'` or `'onAnimationEnd'`

Set whether phases change on transition or animation end events. Defaults to transition events.

####  render

> `function` | *required*

`<AnimationPrimitive render={() => <div />} />`

The `render` prop function is called with the following object:

| property          | category    | type     | description                                                                                                                                                        |
|-------------------|-------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| phase             | state       | string   | The current phase. Either 'enter' or 'leave'.                                                                                                                      |
| phaseActive       | state       | boolean  | Whether this phase is currently running. For example, true if phase was just set to 'enter' and transition is in progress. False when 'enter' transition finishes. |
| phaseComplete     | state       | boolean  | Whether a transition just finished. True if this state was active and is no longer active.                                                                         |
| getContainerProps | prop getter | function | Get the props to put on your container element which will be transitioning. Contains a transitionend/animationend event listener.                                  |


## License

MIT © [Andrew Joslin](http://ajoslin.com)
