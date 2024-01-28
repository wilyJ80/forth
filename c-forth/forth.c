#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Node {
  int data;
  struct Node *next;
};

struct Node *stack = NULL;

void push(int value) {
  struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));
  newNode->data = value;
  newNode->next = stack;
  stack = newNode;
}

int pop() {
  if (stack == NULL) {
    fprintf(stderr, "Error: Stack underflow\n");
    exit(EXIT_FAILURE);
  }

  int value = stack->data;
  struct Node *temp = stack;
  stack = stack->next;
  free(temp);
  return value;
}

void swap() {
  int x = pop();
  int y = pop();
  push(x);
  push(y);
}

void dup() {
  int x = pop();
  push(x);
  push(x);
}

void drop() { pop(); }

void rot() {
  int x = pop();
  int y = pop();
  int z = pop();
  push(y);
  push(x);
  push(z);
}

void over() {
  int x = pop();
  int y = pop();
  push(y);
  push(x);
  push(y);
}

// Function to enqueue a value
void enqueue(int value) { push(value); }

// Function to dequeue a value
int dequeue() {
  if (stack == NULL) {
    fprintf(stderr, "Error: Queue underflow\n");
    exit(EXIT_FAILURE);
  }

  struct Node *temp = stack;
  struct Node *prev = NULL;

  // Traverse the stack to find the last node
  while (temp->next != NULL) {
    prev = temp;
    temp = temp->next;
  }

  int value = temp->data;

  // If the last node is not the only node in the stack, update the previous
  // node's next pointer
  if (prev != NULL) {
    prev->next = NULL;
  } else {
    // If the last node is the only node in the stack, set stack to NULL
    stack = NULL;
  }

  free(temp);
  return value;
}

int main() {
  char input[100];

  // Example usage
  fgets(input, sizeof(input), stdin);

  char *token = strtok(input, " ");
  while (token != NULL) {
    if (strcmp(token, "swap") == 0 || strcmp(token, "swap\n") == 0) {
      swap();
    } else if (strcmp(token, "dup") == 0 || strcmp(token, "dup\n") == 0) {
      dup();
    } else if (strcmp(token, "drop") == 0 || strcmp(token, "drop\n") == 0) {
      drop();
    } else if (strcmp(token, "rot") == 0 || strcmp(token, "rot\n") == 0) {
      rot();
    } else if (strcmp(token, "over") == 0 || strcmp(token, "over\n") == 0) {
      over();
    } else {
      // Assume it's a number and enqueue it
      enqueue(atoi(token));
    }

    token = strtok(NULL, " ");
  }

  // Display the final stack by dequeuing values
  printf("Final Stack:");
  while (stack != NULL) {
    int value = dequeue();
    printf(" %d", value);
  }
  printf("\n");

  return 0;
}
