

function f1(){

	var b = 99;

    add = function (){
		b = b +1;
	};

  
    function f2 (){
       console.info(b);
    }

    return f2;
}

var result = f1();

//add();

result();

add();

result();