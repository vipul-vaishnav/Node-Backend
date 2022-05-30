# Event Loop

- Top Level code is executed first.

- **Event Loop callback execution order-**

  - Expired Timer Callbacks
  - I/O polling Callbacks
  - SetImmediate callbacks
  - close callbacks

- Next Tick and microtasks run after each phase.
