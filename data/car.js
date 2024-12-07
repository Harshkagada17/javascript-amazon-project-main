class Car{
    brand;
    model;

    speed = 0;

    constructor(carDetails){
        this.brand = carDetails.brand;
        this.model = carDetails.model;
    }
    displayInfo(){
        console.log(`${this.brand} ${this.model} ${this.speed} Km/h`);
    }
    istruckopen = true;
    checkopen(){
        if(this.speed === 0){
            this.istruckopen = true
        }    
    }
    clocktruch(){
        if(this.speed < 0){
            this.istruckopen = false;
        }
    }
    go(){
        if(!this.istruckopen){
            this.speed += 5
        }
        if(this.speed > 200){
            this.speed = 200
        }

    }
    break(){
        this.speed -= 5
        if(this.speed < 0){
            this.speed = 0;
        }        
    }
}
const car1 = new Car({
    brand: 'Toyota',
    model: 'Corolloa',
});
const car2 = new Car({
    brand : 'Maruti',
    model : 'waganor',
});

console.log(car1);
console.log(car2);
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car2.go();
car1.break();
car1.break();
car1.break();
car1.break();
car2.break();
car2.break();
car2.break();
car2.break();
car2.break();
car1.displayInfo();
car2.displayInfo();

