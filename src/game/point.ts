export class Point {
    width?: number = 16;
    height?: number = 16;
    x?: number = 0;
    y?: number = 0;

    detectCollision (point: Point) {
        if (
            this.x < point.x + point.width
            && this.x + this.width >= point.x
            && this.y < point.y + point.height
            && this.y + this.height >= point.y
        ) {
            return true;
        }

        return false;
    }
}