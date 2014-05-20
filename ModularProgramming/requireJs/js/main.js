console.info("main 加载成功");

require.config({
	paths:{
		"jquery":"lib/jquery",
		"backbone":"lib/backbone",
		"math":"math"
	}
});

require(['math'],function(math){
	console.info(math.add(3,2));
});
