# mobconx
Mobx stores like Redux

## Motivation

Make no mistake, I like Mobx. But I do think the way stores are 'polluting' your UI is not so nice. I mean, your UI must be aware of the fact that you're using Mobx. It must have knowledge on how to use a Mobx-store, which props to access from the store and finally how to deal with...
I think React is more about passing/injecting props instead of making your UI too aware of and tightly coupled to other layers in your architecture.

This is why I prefer the Redux way of connecting UI to state: clean, decoupled and maintainable. Combining Redux with Mobx provides a means by which you can use a Mobx store as if you are using Redux:

```js
connect(mapStateToProps, mapDispatchToProps);
```

## How does it work?

`mobconx` uses ramda lenses to get references to the store properties you want to access.

```js
export const friendsLens = createLens("myStore.friends");
```

Then, pass this reusable _friends_ lens to your component:

```js
connect((store) => ({
  friends: friendsLens(store, array()),
}))(MyComponent);
```
