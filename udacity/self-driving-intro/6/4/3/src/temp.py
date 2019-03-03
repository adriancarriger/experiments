# Custom Priority Queue
   class PriorityQueue():
        def __init__(self):
            self.items = []

        def size(self):
            return len(self.items)

        def enqueue(self, priority, input):
            contain = False
            for i in range(len(self.items)):
                if self.items[i].priority > priority:
                    self.items.insert(i, input)
                    contain = True
                    break

            if not contain:
                self.items.append(input)

        def dequeue(self):
            return self.items.pop(0)

        def peek(self):
            return self.items[0]

    # Wraps PriorityQueue with "set-like" methods
    class PrioritySet():
        def __init__(self):
            self.queue = PriorityQueue()

        def __len__(self):
            return self.queue.size()

        def add(self, priority, value):
            self.queue.enqueue(priority, value)

        def remove(self, node):
            if self.queue.peek() == node:
                return self.queue.dequeue()

            self.queue.items.remove(node)

        def peek(self):
            return self.queue.peek()

    # Creates PrioritySet with default values
    priority_set = PrioritySet()
