/*
** Sudoku solver
**
** translation from python
** as shown in this video
** https://www.youtube.com/watch?v=G_UYXzGuqvM
**
*/

class Sudoku {
    constructor(sudoku) {
        this.sudoku = sudoku
    }
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
        console.log(this.sudoku)
    }
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
var sudoku = new Sudoku(grid)
console.assert(sudoku.testMove(0,0,3) === false, "0,0,3")
console.assert(sudoku.testMove(4,4,5) === true, "4,4,5")
console.assert(sudoku.testMove(8,8,8) === false, "8,8,8")
console.assert(sudoku.testMove(0,0,5) === true, "0,0,5")

sudoku.solve()
