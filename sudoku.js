/*
** Sudoku solver
**
** translation from python
** as shown in this video
** https://www.youtube.com/watch?v=G_UYXzGuqvM
**
*/

class Sudoku {
    /**
    * @constructor
    * @author: Swen Rühl
    * @param (array of array of number) The sudoku to solve
    */
    constructor(sudoku) {
        this.sudoku = sudoku
        this.solutions = []
    }
    /**
    * Solves the given Sudoku
    *
    */
    solve() {
        let x, y, n
        for (y = 0; y < 9; y++) {
            for (x = 0; x < 9; x++) {
                if (this.sudoku[y][x] === 0) {
                    for (n = 1; n <= 9; n++) {
                        if (this.testMove(x, y, n)) {
                            this.sudoku[y][x] = n
                            this.solve()
                            this.sudoku[y][x] = 0
                        }
                    }
                    return
                }
            }
        }
        this.solutions.push(JSON.parse(JSON.stringify(this.sudoku))) // There must be a better way
    }
    show() {
        if (this.solutions.length) {
            for (let s of this.solutions) {
                console.log(s)
                console.log()
            }
        }
    }
    /**
    * Is that move possible
    *
    * @param x (number) The x position to check (0-8)
    * @param y (number) The y position to check (0-8)
    * @param n (number) The number to check (1-9)
    */
    testMove(x, y, n) {
        let i, j, xs, ys
        for (i = 0; i < 9; i++) {
            if (this.sudoku[y][i] === n) {
                return false
            }
        }
        for (i = 0; i < 9; i++) {
            if (this.sudoku[i][x] === n) {
                return false
            }
        }
        xs = Math.floor(x / 3) * 3
        ys = Math.floor(y / 3) * 3
        for (j = 0; j < 3; j++) {
            for (i = 0; i < 3; i++) {
                if (this.sudoku[ys + j][xs + i] === n) {
                    return false
                }
            }
        }
        return true
    }
}

var grid = [
    [0,3,0,0,0,0,0,0,0],
    [0,0,0,1,9,5,0,0,0],
    [0,0,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,0],
    [4,0,0,8,0,0,0,0,1],
    [0,0,0,0,2,0,0,0,0],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,0,0,0,7,0]
]

grid = [
    [9,0,6,0,7,0,4,0,3],
    [0,0,0,4,0,0,2,0,0],
    [0,7,0,0,2,3,0,1,0],
    [5,0,0,0,6,0,1,0,0],
    [0,4,0,2,0,8,0,6,0],
    [0,0,3,0,0,0,0,0,5],
    [0,3,0,7,0,0,0,5,0],
    [0,0,7,0,0,5,0,0,0],
    [4,0,5,0,1,0,7,0,8]
]
const sudoku = new Sudoku(grid)
/*
// Tests for the first grid
console.assert(sudoku.testMove(0,0,3) === false, "0,0,3")
console.assert(sudoku.testMove(4,4,5) === true, "4,4,5")
console.assert(sudoku.testMove(8,8,8) === false, "8,8,8")
console.assert(sudoku.testMove(0,0,5) === true, "0,0,5")
*/
sudoku.solve()
sudoku.show()
