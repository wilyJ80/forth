## Definition Style Practice Problems:
- Convert the following infix expressions into Forth definitions and show the stack order required by your definitions.

1. (a - 4b) / 6 + c
*becomes*
: 2B2 4 * - 6 / + ;
*stack order:*
( c a b -- result )

2. a / (8b)
*becomes*
: 2B3 8 * / ;
*stack order:*
( a b -- result )

3. 0.5 ab / 1000
???????????

4. a(2a + 3)
*becomes*
: 2B5 2 * 3 + * ;
*stack order*
( a a -- result )

5. impossible?
