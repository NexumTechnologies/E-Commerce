type Listener = (pending: number) => void;

let pendingRequests = 0;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener(pendingRequests);
}

export function incrementPendingRequests() {
  pendingRequests += 1;
  emit();
}

export function decrementPendingRequests() {
  pendingRequests = Math.max(0, pendingRequests - 1);
  emit();
}

export function getPendingRequests() {
  return pendingRequests;
}

export function subscribePendingRequests(listener: Listener) {
  listeners.add(listener);
  listener(pendingRequests);
  return () => {
    listeners.delete(listener);
  };
}
