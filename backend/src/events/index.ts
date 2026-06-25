import { EventEmitter } from 'events';

/**
 * APPLICATION-WIDE EVENT EMITTER
 *
 * Used for raising asynchronous, non-blocking internal events.
 * E.g., emitting a 'user.registered' event so that the notifications and mailing
 * systems can react independently without slowing down the registration HTTP response.
 */
export const appEventEmitter = new EventEmitter();

// Sample event subscription
appEventEmitter.on('sample.event', (data) => {
  // Handle event
  // eslint-disable-next-line no-console
  console.log('Sample event received', data);
});

export default appEventEmitter;
