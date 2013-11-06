
//动物超类
function Animal() {
    this.species = "animal";
    this.sleep = function() {
        console.log("I'm sleep at night");
    };
}


/*是这样写、则无法利用Anima.apply(this)*/
//var Animal = {
//    species: "animal",
//    sleep: function() {
//        console.log("I'm sleep at night");
//    }
//};