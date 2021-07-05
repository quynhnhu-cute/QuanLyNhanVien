function WorkerList() {
  this.arr = [];
}

WorkerList.prototype.addNewWorker = function (worker) {
  this.arr.push(worker);
};


WorkerList.prototype.findIndex = function(account){
    var index = this.arr.findIndex(
        function(item){
            return account === item.account;
        }
    );
    return index;
}

WorkerList.prototype.deleteWorker = function(account){
    var index = this.findIndex(account);
    this.arr.splice(index,1);
}

WorkerList.prototype.updateWorker = function(account, newWorker){
    var index = this.findIndex(account);
    this.arr[index] = newWorker;
}

