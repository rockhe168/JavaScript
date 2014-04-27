(function($){

	// 基本的Todo模型，属性为： content,order,done
	var Todo = Backbone.Model.extend({

		//设置默认值
		defaults:{
			title:"empty todo...",
			order:todoList.nextOrder,//集合实例对象
			done:false
		},

		//设置任务完成状态
		toggle:function(){
			this.save(done:!this.get("done"));
		}

	});

	//Todo 的一个集合，数据通过localStorage储存在本地
	var TodoList = Backbone.Collection.extend{

		//设置Collection的模型为Todo
		model:Todo,
		//存储到浏览器，以todos-backbone命名的空间中
		localStorage: new Backbone.localStorage("todos-backbone"),
		//获取所有已经完成的任务数组
		done:function(){
			return this.where({done:true});
		},
		//获取任务列表中未完成的任务数组
		remaining:function(){
			return this.where({done:false});
		},
	    //获得下一个任务的排序序号，通过数据库中的记录数加1实现。
	    nextOrder:function(){
	    	if(!this.length){
	    		return 1;
	    	}
	    	return this.last().get('order') +1;// last获取collection中最后一个元素
	    },
	    //Backbone内置属性，指明collection的排序规则。
	    comparator:'order'
	}

	

})(jQuery);