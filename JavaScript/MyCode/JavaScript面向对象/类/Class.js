
console.info("模拟C#中的class.....init");

var Class = function(parent){
	this.name ="class.name";
	var kclass = function(){
		this.name ="kclass.name";
		console.info("kclass init....");

		if(parent){
			//继承parent构造函数内部属性
			parent.call(this, null)
	     }

		this.init.apply(this, arguments);

	}

    //继承
	if(parent){
		//1.
		var parentClass =  function(){};
		parentClass.prototype = parent.prototype;

		//重新kcalss的原型，只继承原型属性和方法（构造函数内部的，并没有继承）
		kclass.prototype = new parentClass;

		//2.原型继承（继承构造函数内部的属性（构造函数内部就能初始化的属性，构造函数内部没有初始化的属性这里就默认为undifind，））
		//kclass.prototype =  new parent();
	}

	//用于初始化klass构造函数属性
	kclass.prototype.init = function(){
		console.info("kclass.prototype.init.....");
	};

	

	//定义 prototype 的别名
	kclass.fn = kclass.prototype;

	//给类添加属性
	kclass.extend = function(obj){

		for (var property in obj) {
			console.info(property);
		 	kclass[property] = obj[property];
		};

		//支持对象回调
		var extended = obj.extended;
		if(extended)
		{
			extended(kclass);
		}
	};

	//给实例添加属性
	kclass.include = function(obj){
		for (var property in obj) {
			kclass.fn[property] = obj[property];
		};

		//支持对象回调
		var included = obj.included;
		if(included){
			included(kclass);
		}
	}

	return kclass;
}

//定义一个Person类
var Person =new Class;//此处的Person 是一个function,,,因为return 的是一个function
console.info(Person instanceof Class);//false
console.info(Person instanceof Object);//ture
console.info(Person instanceof Function);//ture
console.info(Person.name);//

//添加静态方法
Person.find =function(id){
	console.info("Person.find()");
};

//添加实例方法
Person.prototype.save=function(){
	console.info("Person.prototype.save()");
};

var person = new Person();
console.info(person instanceof Class);//false
console.info(person instanceof Object);//ture
console.info(person instanceof Person);//true
console.info(person instanceof Function);//false
//person.find(1);//报错
Person.find(1);
person.save();


// Person.find(1) 与 person.find(1) 与 person.save() 可以看出 原型方法 ！= 静态方法



//--------------------------原型方法可以访问实例属性，并且优先级高于原型属性
Person.prototype.common = function(){
	console.info(this.name);
}
Person.prototype.name ="Person.prototype.name";

var person1 = new Person();
person1.name="person1.Name";

var person2 = new Person();
person2.name = "person2.Name";

person1.common();
person2.common();



//--------------------------给Class添加属性
Person.extend({
	sayHello:function(){
		console.info("Person.SayHello()-->"+this.name);//静态方法不能访问this中的name
	},
	exists:function(){
		console.info("Person.exists()");
	},
	extended:function(kclass){
		console.log(kclass,"was extended!");
	}
});

Person.sayHello();

//--------------------------给Class添加实例属性(原型)
Person.prototype.prototypeName = "Person.prototype.prototypeName";
Person.include({
	name:"kclass.prototype.name",
	kclassPrototypeName:"kclass.Prototype.name",
	update : function(){
		console.info("person.prototype.update()-->"+this.name);//访问实例属性name
	},
	destory:function(){
		console.info("person.prototype.destory()-->"+this.kclassPrototypeName);
	},
	showPersonPrototypeName:function(){
		console.info("Person.prototype.prototypeName-->"+this.prototypeName);
	},
	included:function(kclass){
		console.log(kclass,"was included!");
	}
});

var person3 = new Person();
person3.update();
person3.destory();
person3.showPersonPrototypeName();
console.info(person3.name);//在实例对象中name属性访问的优先级，，， this.name---->kclass.prototype.name---->Person.prototype.name


//--------------------------------继承

function Animal(){
	this.colors =["red","blue","green"];
}

Animal.prototype.prototypeColors = ["1","2","3"];


var Dog = new Class(Animal);

var dog1 = new Dog();
console.info(dog1.colors);
console.info(dog1.prototypeColors);
console.info(dog1.hasOwnProperty('colors'));
console.info(dog1.hasOwnProperty('prototypeColors'));//只找实例属性
console.info("prototypeColors" in dog1);//先找实例属性，再找原型属性
dog1.colors.push("block");
console.info(dog1.colors);

var dog2 =new Dog();
console.info(dog2.colors);



var SuperClass = new Class;
SuperClass.prototype.init = function(){
	this.name = "rock";
	this.age = 30;
	this.sayHello=function(){
		console.info("Hello-->"+this.name);
	};
};
SuperClass.colors = ["red","blue"];
SuperClass.extend({
	address:"上海携程网络科技大楼",
	sayAddress:function(){
		console.info("My Address-->"+this.address);
	}
});

SuperClass.include({
	mobile:"18017642268",
	sayMobile:function(){
		console.info("My Address-->"+this.mobile);	
	}
});

var superClass1= new SuperClass;
console.info(superClass1.name);
superClass1.sayHello();
console.info(superClass1.colors);//静态属性不能通过实例进行访问
console.info(SuperClass.colors);


var SubClass = new Class(SuperClass);


var subclass1=new SubClass;
console.info(subclass1.name); //实例属性值不能继承
console.info(subclass1.age);
console.info(subclass1.colors);//Class超类的静态属性不能继承
//subclass1.sayHello()
console.info(subclass1.address);//Class超类的属性不能继承
console.info(subclass1.mobile);//Class的实例属性（原型上的）能继承