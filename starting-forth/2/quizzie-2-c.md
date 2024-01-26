1. Write a phrase that flips three items on the stack, leaving the middle number in the middle.

SWAP ROT

2. Write a phrase that does what OVER does, without using OVER.

SWAP DUP ROT ROT
(or SWAP DUP ROT SWAP)

3. Write a definition called -ROT, which rotates the top three stack items in the opposite direction from ROT;

: -ROT ROT ROT ;


Write definitions for the following equations, given the stack effects shown:

4. (n+1) / n ( n -- result)

: Q4 DUP 1 + SWAP / ;

5. x(7x + 5) ( x -- result )

: Q5 DUP 7 * 5 + * ;

6. 9a^2 - ba ( a b -- result )
= a (9a - b)

: Q6   OVER 9 * SWAP - * ;

