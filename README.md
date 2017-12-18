# react-sub-dispatch
[![Build Status](https://travis-ci.org/fongandrew/react-sub-dispatch.svg?branch=master)](https://travis-ci.org/fongandrew/react-sub-dispatch)

A datastore-agnostic library for subscribing React components to a data source
and dispatching events. Inspired by `react-redux`, but comes with a more
generic interface for connecting stores.

```ts
connect(
  (context, ownProps) => ({
    prop1: [Sub1, { store: context.store, key1: props.key1 }],
    prop2: [Sub2, { store: context.store, key2: props.key2 }]
  }),

  (context, dispatch, ownProps) => ({

  }),

  (context, subProps, dispatchProps, ownProps) => ({

  })
);

connect(
  (ownProps, context) => ({
    prop1: [Sub1, { key1: props.key1 }, context],
    prop2: [Sub2, { key2: props.key2 }, context]
  }),

  (dispatch, ownProps, context) => ({

  }),

  (subProps, dispatchProps, ownProps, context) => ({
    ...subProps,
    ...dispatchProps
  })
)

```

Could just use React context above.
Or could use alt context set by provider ...

```tsx
<Provider dispatcher={} getContext={}>
  <MyApp />
</Provider>
```

```ts
connect((ownProps, services, dispatch) => ({
  ...subscribe({
    data1: subscribeToX(props),
    data2: subscribeToY(props)
  }),
  onClick: () => dispatch({ type: 'INCR', value: 123 }),
  otherProp: ownProps.value
}));
```