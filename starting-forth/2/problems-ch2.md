1. Difference between DUP DUP and 2DUP

DUP DUP duplicates the top item of the stack twice. 2DUP duplicates the top pair of the stack.

2. Write a phrase which will reverse the order of the top four items on the stack;

SWAP 2SWAP SWAP

3. Write a definition called 3DUP which will duplicate the top three numbers on the stack;

*Pair operations are very interesting!*

DUP 2OVER ROT

4. Write definitions for the following infix equations, given the stack effects shown:

a^2 + ab + c   ( c a b -- result )

a^2 + ab + c === a(a + b) + c

: EQ   OVER + * + ;

(a-b)/(a+b)  ( a b -- result)

: EQ   2DUP - -ROT + / ;

5. Write a set of words to compute prison sentences for hardened criminals such that the judge can enter:

CONVICTED-OF ARSON HOMICIDE TAX-EVASION↵ok WILL-SERVE↵35 years ok

or any series of crime beginning with the word CONVICTED-OF and ending with WILL-SERVE. Use these sentences:

HOMICIDE 20 years ARSON 10 yearsBOOKMAKING 2 yearsTAX-EVASION 5 years

Answer:

: HOMICIDE   20 + ;
: ARSON   10 + ;
: BOOKMAKING   2 + ;
: TAX-EVASION   5 + ;
: CONVICTED-OF   0 ;
: WILL-SERVE   . ."  years" ;

6. You’re the inventory programmer at Maria’s Egg Ranch. Define a word called

EGG.CARTONS

which expects on the stack the total number of eggs laid by the chickens today and prints out the number of cartons that can be filled with a dozen each, as well as the number of leftover eggs.

: EGG.CARTONS   12 /MOD . ." dozen(s), " . ." leftover(s)." ;
