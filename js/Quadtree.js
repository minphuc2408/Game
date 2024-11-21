class Quadtree {
    constructor(boundary, capacity) {
        this.boundary = boundary; // A rectangle object {x, y, width, height}
        this.capacity = capacity; // Maximum objects a quadtree node can hold before splitting
        this.objects = [];
        this.divided = false;
    }

    subdivide() {
        const { x, y, width, height } = this.boundary;
        const halfWidth = width / 2;
        const halfHeight = height / 2;

        this.northeast = new Quadtree({ x: x + halfWidth, y: y, width: halfWidth, height: halfHeight }, this.capacity);
        this.northwest = new Quadtree({ x: x, y: y, width: halfWidth, height: halfHeight }, this.capacity);
        this.southeast = new Quadtree({ x: x + halfWidth, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity);
        this.southwest = new Quadtree({ x: x, y: y + halfHeight, width: halfWidth, height: halfHeight }, this.capacity);

        this.divided = true;
    }

    insert(object) {
        if (!this.contains(this.boundary, object)) {
            return false;
        }

        if (this.objects.length < this.capacity) {
            this.objects.push(object);
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        if (this.northeast.insert(object) || this.northwest.insert(object) ||
            this.southeast.insert(object) || this.southwest.insert(object)) {
            return true;
        }

        return false;
    }

    contains(boundary, object) {
        return (
            object.x >= boundary.x &&
            object.x < boundary.x + boundary.width &&
            object.y >= boundary.y &&
            object.y < boundary.y + boundary.height
        );
    }

    query(range, found) {
        if (!this.intersects(range, this.boundary)) {
            return found;
        }

        for (let obj of this.objects) {
            if (this.contains(range, obj)) {
                found.push(obj);
            }
        }

        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }

        return found;
    }

    intersects(range, boundary) {
        return !(
            range.x > boundary.x + boundary.width ||
            range.x + range.width < boundary.x ||
            range.y > boundary.y + boundary.height ||
            range.y + range.height < boundary.y
        );
    }
}

export default Quadtree;
