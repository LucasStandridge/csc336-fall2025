class Person{
    constructor(data){
        this.data = data;
        this.x = random(0, width);
        this.y = random(0,height);
        this.hue = random(0,360);
        this.radius = 25;
    }

    update(){
        if(this.hover){
            fill(random(0,360));
        }else{
            fill(this.hue, 60, 100); 
        }
        
        ellipse(this.x, this.y, this.radius);
        textAlign(CENTER);
        fill(0,0,0);
        text(this.data.name, this.x, this.y);
    }
}