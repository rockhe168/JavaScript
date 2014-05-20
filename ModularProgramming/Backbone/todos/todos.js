(function($){

	// 基本的Todo模型，属性为： content,order,done
	var Todo = Backbone.Model.extend({

		//设置默认值
		defaults:{
			title:"empty todo...",
			//order:todoList.nextOrder(),//集合实例对象
			done:false
		},

		//设置任务完成状态
		toggle:function(){
			this.save({done:!this.get('done')});
		}

	});

	//Todo 的一个集合，数据通过localStorage储存在本地
	var TodoList = Backbone.Collection.extend({

		//设置Collection的模型为Todo
		model:Todo,
		//存储到浏览器，以todos-backbone命名的空间中
		localStorage: new Backbone.LocalStorage("todos-backbone"),
		//获取所有已经完成的任务数组
		doned:function(){
			return this.where({done:true});
		},
		//获取任务列表中未完成的任务数组
		remaining:function(){
			return this.where({done:false});
		}
	    //获得下一个任务的排序序号
	    //nextOrder: function() {
	    //  if (!this.length) return 1;
	    //  return this.last().get('order') + 1;
	    //},
	    //Backbone内置属性，指明collection的排序规则。
	    //comparator:'order'
	});


	//全局的Todo collection对象
	var todoList = new TodoList();

	var TodoView = Backbone.View.extend({

		tagName:"li",

		template:_.template($("#item-template").html()),

		initialize:function(){
			this.listenTo(this.model,'change',this.render);
			this.listenTo(this.model,'destroy',this.remove);//this.remove 是调用view对象的remove方法。
		},

		events:{
			"click a.destroy":"clear",//删除
			"dblclick .view" :"edit",//修改
			"blur .edit":"inputClose",//鼠标移除文本域
			"keypress .edit":"updateOnEnter",//编辑状态回车
			"click .toggle":"toggleDone" //复选框彀中
		},

		//渲染todo中的数据到 item-tempalte中，然后返回对自己的引用this
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done', this.model.get('done'));//选中加入中画线
			this.input = this.$('.edit');
			return this;
		},

		clear:function () {
			this.model.destroy();//从LocalStroage中清理此todo	
			//this.remove();//把此view对象remove掉，也可以用事件监听的方式remove掉

			//检查是否最后一项
			console.info(todoList.length);		
		},

		edit:function () {
			this.$el.addClass('editing');
			console.log(this.$el);
			console.log(this.el);
			this.input.focus();
		},
		inputClose:function(){
			var value = this.input.val();
			//console.info(!value);
			if(!value){
				this.clear();
			}else{
				this.model.save({title:value});
				this.$el.removeClass('editing');	
			}
		},
		updateOnEnter:function(e){
			if(e.keyCode==13){
				this.inputClose();
			}
		},
		toggleDone:function(){
			this.model.toggle();
		}

	});

	var AppView = Backbone.View.extend({
		el:$("#todoapp"),
		statsTemplate:_.template($("#stats-template").html()),
		initialize:function(){
			this.input = this.$("#new-todo");//获取文本框
			this.allCheckbox = this.$("#toggle-all")[0];
			this.listenTo(todoList,'add',this.addOne); //监听todoList，渲染每一个 todo item View
			//this.listenTo(todoList,'reset',this.refreshData);
			this.listenTo(todoList,'all',this.render);
			this.main = this.$("#main");
			this.footer=this.$('footer');
			todoList.fetch();
		},
		events:{
			"keypress #new-todo" : "createOnEnter",//回车进行新增todo  新增
			"click #toggle-all" : "toggleAllComplete", //全选功能
			"click #clear-completed":"clearCompleted"//删除选中项
		},
		render:function(){
			console.info("AppView render.....");
			var doned = todoList.doned().length;
			var remaining = todoList.remaining().length;
			if(todoList.length){
				this.main.show();
				this.footer.show();
				this.footer.html(this.statsTemplate({doned:doned,remaining:remaining}));
				//this.footer.show();
			}else {
				this.main.hide();
				this.footer.hide();
			}
		},
		createOnEnter:function(e){
			if(e.keyCode != 13){//如果不是回车
				return;
			}
			if(!this.input.val()){
				return;
			}
			todoList.create({title:this.input.val()});
			this.input.val('');
		},
		addOne:function(todo){
			console.log(todo);//这个todo是当前todoView上下文
			console.info("AppView addOne....");
			//console.log("add todo-->"+todo);
			var view =new TodoView({model:todo});
			this.$("#todo-list").append(view.render().el);//从当前视图中找对应元素
		},
		refreshData:function(){
			console.info("AppView refreshData...");
			todoList.each(function(todo) {
				this.addOne(todo);
			});
		},
		toggleAllComplete:function(){
			var done = this.allCheckbox.checked;
			//alert(done);
			todoList.each(function(todo) {
				todo.save({'done':done});
			});
		},
		clearCompleted:function(){
			console.info("AppView clearCompleted....");
			_.invoke(todoList.doned(),'destroy'); //此处 会触发Model对应的desctory事件
			//return false;
		}

	});

	var app = new AppView();
	//app.render();

})(jQuery);