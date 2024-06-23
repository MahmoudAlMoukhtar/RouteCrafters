class Truck {
    constructor(capacity) {
      this.capacity = capacity;
      this.goodsLoaded = [];
    }
  
    loadGoods(good) {
      if (this.goodsLoaded.length < this.capacity) {
        this.goodsLoaded.push(good);
        return true;
      }
      return false; // Truck is full
    }
  }
  